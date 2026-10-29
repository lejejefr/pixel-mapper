'use strict';

const { app, BrowserWindow, Menu, dialog, nativeTheme, session, shell } = require('electron');
const { spawn } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const net = require('net');
const path = require('path');

const APP_NAME = 'PixelMapper';
const TOKEN_HEADER = 'X-App-Token';
const IS_WIN = process.platform === 'win32';
const IS_MAC = process.platform === 'darwin';
const BG_PAGE = '#0d0d10'; // = $bg-page de styles.scss
const TITLEBAR_HEIGHT = 48;

// Thème sombre pour les éléments natifs (dialogues, barre de titre, scrollbars)
nativeTheme.themeSource = 'dark';

let javaProcess = null;
let backendExited = false;
let backendReady = false;
let backendError = null;
let quitting = false;
let splash = null;
let mainWindow = null;

// ---------- Instance unique ----------
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  app.whenReady().then(bootstrap);
}

// ---------- Utilitaires ----------
function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

function findJar(dir) {
  if (!fs.existsSync(dir)) return null;
  const jars = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.jar') && !f.endsWith('-plain.jar'));
  return jars.length ? path.join(dir, jars[0]) : null;
}

function resolveRuntime() {
  if (app.isPackaged) {
    return {
      javaBin: path.join(process.resourcesPath, 'jre', 'bin', IS_WIN ? 'java.exe' : 'java'),
      jar: path.join(process.resourcesPath, 'backend', 'app.jar'),
    };
  }
  // Dev : desktop/src -> racine du repo -> backend/target
  const javaHome = process.env.JAVA_HOME;
  return {
    javaBin: javaHome ? path.join(javaHome, 'bin', IS_WIN ? 'java.exe' : 'java') : 'java',
    jar: process.env.BACKEND_JAR || findJar(path.join(__dirname, '..', '..', 'backend', 'target')),
  };
}

// ---------- Menu ----------
function setupMenu() {
  if (IS_MAC) {
    // Sur macOS, la barre de menus appartient au système : on garde un menu minimal
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([{ role: 'appMenu' }, { role: 'editMenu' }, { role: 'windowMenu' }])
    );
  } else {
    // Windows / Linux : plus de barre « Fichier / Édition / Aide »
    Menu.setApplicationMenu(null);
  }
}

// ---------- Backend ----------
function startBackend({ port, token }) {
  const { javaBin, jar } = resolveRuntime();
  if (!jar || !fs.existsSync(jar)) {
    throw new Error(
      `JAR du backend introuvable (${jar}). Lance d'abord "./mvnw -DskipTests package" dans backend/.`
    );
  }

  const dataDir = app.getPath('userData');
  const logDir = app.getPath('logs');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(logDir, { recursive: true });
  const logStream = fs.createWriteStream(path.join(logDir, 'backend.log'), { flags: 'a' });

  javaProcess = spawn(javaBin, ['-Xmx512m', '-Dfile.encoding=UTF-8', '-jar', jar], {
    cwd: dataDir,
    windowsHide: true,
    env: {
      ...process.env,
      SERVER_PORT: String(port),
      SERVER_ADDRESS: '127.0.0.1',
      APP_TOKEN: token,
      APP_DATA_DIR: dataDir,
      APP_PARENT_PID: String(process.pid),
    },
  });

  javaProcess.stdout.pipe(logStream, { end: false });
  javaProcess.stderr.pipe(logStream, { end: false });

  javaProcess.on('error', (err) => {
    backendExited = true;
    backendError = err;
  });

  javaProcess.on('exit', (code) => {
    backendExited = true;
    logStream.end();
    if (backendReady && !quitting) {
      dialog.showErrorBox(APP_NAME, `Le backend s'est arrêté (code ${code}).`);
      app.quit();
    }
  });
}

function stopBackend() {
  if (javaProcess && !backendExited) {
    try {
      javaProcess.kill();
    } catch (_) {
      /* déjà arrêté */
    }
  }
}

function checkHealth(port, token) {
  return new Promise((resolve) => {
    const req = http.get(
      {
        host: '127.0.0.1',
        port,
        path: '/actuator/health',
        headers: { [TOKEN_HEADER]: token },
        timeout: 1500,
      },
      (res) => {
        res.resume();
        resolve(res.statusCode === 200);
      }
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForBackend(port, token, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (backendExited) {
      throw new Error(
        backendError
          ? `Impossible de lancer Java : ${backendError.message}`
          : "Le backend s'est arrêté pendant le démarrage. Consulte backend.log."
      );
    }
    if (await checkHealth(port, token)) return;
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Le backend ne répond pas (délai dépassé).');
}

// ---------- Fenêtres ----------
function injectToken(token, origins) {
  const urls = origins.map((o) => `${o}/*`);
  session.defaultSession.webRequest.onBeforeSendHeaders({ urls }, (details, callback) => {
    details.requestHeaders[TOKEN_HEADER] = token;
    callback({ requestHeaders: details.requestHeaders });
  });
}

function showSplash() {
  splash = new BrowserWindow({
    width: 420,
    height: 260,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    backgroundColor: BG_PAGE,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  splash.loadFile(path.join(__dirname, 'loading.html'));
}

function createMainWindow(uiUrl, allowedOrigins) {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    show: false,
    thickFrame: true,
    title: APP_NAME,
    backgroundColor: BG_PAGE,
    titleBarStyle: IS_MAC ? 'hiddenInset' : 'hidden',
    titleBarOverlay: {
      color: BG_PAGE,          // = $bg-page
      symbolColor: '#a8a8b3',  // = $text-secondary (icônes réduire / agrandir / fermer)
      height: TITLEBAR_HEIGHT,
    },
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });

  mainWindow.once('ready-to-show', () => {
    if (splash) {
      splash.close();
      splash = null;
    }
    mainWindow.show();
  });

  // Raccourcis de développement (le menu étant supprimé, ils n'existent plus par défaut)
  if (!app.isPackaged) {
    mainWindow.webContents.on('before-input-event', (_event, input) => {
      if (input.type !== 'keyDown' || !input.control) return;
      const key = input.key.toLowerCase();
      if (input.shift && key === 'i') mainWindow.webContents.toggleDevTools();
      else if (key === 'r') mainWindow.webContents.reload();
    });
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!allowedOrigins.includes(new URL(url).origin)) {
      event.preventDefault();
      if (/^https?:/.test(url)) shell.openExternal(url);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadURL(uiUrl);
}

// ---------- Démarrage ----------
async function bootstrap() {
  setupMenu();
  showSplash();
  try {
    // BACKEND_PORT : port fixe pour le dev (proxy Angular). Sinon port libre.
    const port = process.env.BACKEND_PORT
      ? Number(process.env.BACKEND_PORT)
      : await getFreePort();
    const token = crypto.randomBytes(32).toString('hex');

    startBackend({ port, token });
    await waitForBackend(port, token);
    backendReady = true;

    const backendOrigin = `http://127.0.0.1:${port}`;
    // DEV_UI_URL : ex. http://localhost:4200 pour le hot reload Angular
    const uiUrl = process.env.DEV_UI_URL || backendOrigin;
    const origins = [...new Set([backendOrigin, new URL(uiUrl).origin])];

    injectToken(token, origins);
    createMainWindow(uiUrl, origins);
  } catch (err) {
    dialog.showErrorBox(`${APP_NAME} - erreur au démarrage`, err.message);
    quitting = true;
    stopBackend();
    app.quit();
  }
}

app.on('before-quit', () => {
  quitting = true;
  stopBackend();
});
app.on('window-all-closed', () => app.quit());
process.on('exit', stopBackend);