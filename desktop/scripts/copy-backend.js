const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', '..', 'backend', 'target');
const destDir = path.join(__dirname, '..', 'build', 'backend');

if (!fs.existsSync(targetDir)) {
  console.error(`Dossier introuvable : ${targetDir}. Lance "./mvnw -DskipTests package" dans backend/.`);
  process.exit(1);
}

const jar = fs
  .readdirSync(targetDir)
  .find((f) => f.endsWith('.jar') && !f.endsWith('-plain.jar'));

if (!jar) {
  console.error(`Aucun JAR trouvé dans ${targetDir}. Lance "./mvnw -DskipTests package" dans backend/.`);
  process.exit(1);
}

fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(path.join(targetDir, jar), path.join(destDir, 'app.jar'));
console.log(`Copié : ${jar} -> build/backend/app.jar`);