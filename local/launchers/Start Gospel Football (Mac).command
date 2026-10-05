#!/bin/bash
# Starts Gospel Football for local play. Double-click this file.
cd "$(dirname "$0")"
if [ "$(uname -m)" = "arm64" ]; then BIN="bin/gospel-football-macos-arm64"; else BIN="bin/gospel-football-macos-x64"; fi
chmod +x "$BIN" 2>/dev/null
xattr -d com.apple.quarantine "$BIN" 2>/dev/null
exec "$BIN"
