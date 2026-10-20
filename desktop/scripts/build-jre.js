const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ext = process.platform === 'win32' ? '.exe' : '';
const jlink = process.env.JAVA_HOME
  ? path.join(process.env.JAVA_HOME, 'bin', `jlink${ext}`)
  : 'jlink';

const out = path.join(__dirname, '..', 'build', 'jre');
fs.rmSync(out, { recursive: true, force: true });

const modules = [
  'java.base', 'java.logging', 'java.sql', 'java.naming', 'java.desktop',
  'java.management', 'java.instrument', 'java.xml', 'java.net.http',
  'java.security.jgss', 'java.prefs', 'java.compiler', 'jdk.unsupported',
  'jdk.crypto.ec',
];

execFileSync(
  jlink,
  [
    '--add-modules', modules.join(','),
    '--strip-debug', '--no-header-files', '--no-man-pages',
    '--compress=zip-6',
    '--output', out,
  ],
  { stdio: 'inherit' }
);
console.log(`JRE minimal créé dans ${out}`);