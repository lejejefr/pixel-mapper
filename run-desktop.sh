#!/usr/bin/env bash
set -euo pipefail   # s'arrête à la première erreur

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STATIC_DIR="$ROOT/backend/src/main/resources/static"

SKIP_FRONT=0
SKIP_BACK=0
for arg in "$@"; do
  case "$arg" in
    --skip-front) SKIP_FRONT=1 ;;
    --skip-back)  SKIP_BACK=1 ;;
    -h|--help)
      echo "Usage: ./run-desktop.sh [--skip-front] [--skip-back]"
      exit 0 ;;
    *) echo "Option inconnue : $arg"; exit 1 ;;
  esac
done

if [ "$SKIP_FRONT" -eq 0 ]; then
  echo "==> Build du frontend"
  cd "$ROOT/frontend"
  [ -d node_modules ] || npm ci
  rm -rf dist                      # évite de copier un ancien build
  npx ng build --configuration production
  rm -rf "$STATIC_DIR"
  mkdir -p "$STATIC_DIR"
  cp -r dist/*/browser/. "$STATIC_DIR/"
fi

if [ "$SKIP_BACK" -eq 0 ]; then
  echo "==> Build du backend"
  cd "$ROOT/backend"
  ./mvnw -DskipTests package
fi

echo "==> Lancement d'Electron"
cd "$ROOT/desktop"
[ -d node_modules ] || npm ci
npm run start:wsl