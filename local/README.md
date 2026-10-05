# Gospel Football, local play

One program that runs the game from a laptop for a room with no internet. It serves the big-screen page and the phone page
from the `site` folder next to it and connects the phones itself, over the room's wifi.

## Playing

1. Put the laptop and the phones on the same wifi (a phone's hotspot works too).
2. Start the program (see below). A window stays open and the game opens in the browser at an address like
   `http://192.168.1.23:8080/`.
3. The big screen shows a QR code and a four-letter code. Phones scan it, or type that address with `/play.html` and the code.
4. Keep the program's window open while you play; close it to stop.

- Mac: double-click `Start Gospel Football (Mac).command`. The first time, macOS may say the file is from an unidentified
  developer: right-click it, choose Open, then Open again. (Or in System Settings, Privacy & Security, choose Open Anyway.)
- Windows: double-click `Start Gospel Football (Windows).bat`. If SmartScreen appears, choose More info, then Run anyway.
  Allow the program through the firewall when Windows asks, on private networks, so phones can reach it.

If port 8080 is busy the program picks the next free port and prints it.

## Building the download

From the repo root, with Node installed:

    cd local && npm install
    npx @yao-pkg/pkg . --targets node22-macos-arm64,node22-macos-x64,node22-win-x64 --out-path dist/bin

Then put `dist/bin/*`, the two launcher files from `local/launchers/`, this README and a `site` folder (index.html, play.html,
peerjs.min.js, qrcode.js, img/, audio/ from the repo root) into one folder and zip it. Mac binaries built on another system
need an ad-hoc signature (`codesign -s - <file>`, or rcodesign) or Apple Silicon refuses to run them.

Run it from a checkout for development: `node local/server.js 8090` serves the repo root.
