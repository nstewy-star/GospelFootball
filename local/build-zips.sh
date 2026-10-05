#!/bin/bash
# build-zips.sh <dist>: puts the packaged programs in <dist>/bin together with the launchers, the README and the site into
# GospelFootball-local-mac.zip and GospelFootball-local-windows.zip under <dist>. Run from the repo root after pkg.
set -euo pipefail
DIST=${1:-dist}; HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/.." && pwd)
rm -rf "$DIST/GospelFootball-local-mac" "$DIST/GospelFootball-local-windows" "$DIST"/*.zip
for kind in mac windows; do
  D="$DIST/GospelFootball-local-$kind"; mkdir -p "$D/bin" "$D/site"
  cp "$HERE/README.md" "$D/"
  for f in index.html play.html peerjs.min.js qrcode.js; do cp "$ROOT/$f" "$D/site/"; done
  cp -r "$ROOT/img" "$ROOT/audio" "$D/site/"
done
cp "$HERE/launchers/Start Gospel Football (Mac).command" "$DIST/GospelFootball-local-mac/"
cp "$DIST"/bin/gospel-football-macos-* "$DIST/GospelFootball-local-mac/bin/"
chmod +x "$DIST/GospelFootball-local-mac/bin/"* "$DIST/GospelFootball-local-mac/Start Gospel Football (Mac).command"
cp "$HERE/launchers/Start Gospel Football (Windows).bat" "$DIST/GospelFootball-local-windows/"
cp "$DIST"/bin/gospel-football-win-x64.exe "$DIST/GospelFootball-local-windows/bin/"
( cd "$DIST" && zip -qr GospelFootball-local-mac.zip GospelFootball-local-mac && zip -qr GospelFootball-local-windows.zip GospelFootball-local-windows )
ls -la "$DIST"/*.zip
