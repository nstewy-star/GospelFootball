#!/usr/bin/env node
// Gospel Football, local play: one program that serves the game from this laptop and connects the phones over the room's wifi,
// so a game needs no internet. It serves the site folder next to this program (or the repo when run from a checkout) and runs the
// PeerJS signalling at /peerjs; the pages use that automatically when they are loaded over plain http.
"use strict";
const path = require("path"), fs = require("fs"), os = require("os"), http = require("http");
const { execFile } = require("child_process");
const express = require("express");
const { ExpressPeerServer } = require("peer");

const here = process.pkg ? path.dirname(process.execPath) : __dirname;
const candidates = [path.join(here, "site"), path.join(here, "..", "site"), path.join(here, ".."), here];
const site = candidates.find(d => fs.existsSync(path.join(d, "index.html")) && fs.existsSync(path.join(d, "play.html")));
if (!site) { console.error("Could not find the game files (a 'site' folder with index.html and play.html) next to this program."); pause(1); }

const wantPort = +process.env.PORT || +process.argv[2] || 8080;

function lanIp() {
  const all = [];
  for (const [name, list] of Object.entries(os.networkInterfaces())) for (const a of list || []) {
    if (a.family !== "IPv4" && a.family !== 4) continue; if (a.internal) continue;
    const ip = a.address; let rank = 3;
    if (/^192\.168\./.test(ip)) rank = 0; else if (/^10\./.test(ip)) rank = 1; else if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) rank = 2;
    if (/^169\.254\./.test(ip)) rank = 9; // self-assigned: no router, usually useless
    if (/docker|vbox|vmnet|utun|tun|tap|bridge/i.test(name)) rank += 5;
    all.push({ ip, rank, name });
  }
  all.sort((a, b) => a.rank - b.rank);
  return all.length ? all[0].ip : null;
}

function openBrowser(url) {
  const cmd = process.platform === "darwin" ? ["open", [url]] : process.platform === "win32" ? ["cmd", ["/c", "start", "", url]] : ["xdg-open", [url]];
  try { execFile(cmd[0], cmd[1], () => {}); } catch (e) {}
}

function pause(code) {
  // keep a double-clicked window open long enough to read the message
  console.log("\nPress Ctrl+C to close this window.");
  setInterval(() => {}, 1 << 30);
  if (code) process.exitCode = code;
}

const app = express();
app.disable("x-powered-by");
app.use((req, res, next) => { res.set("Cache-Control", "no-cache"); next(); });
app.get("/", (req, res) => res.redirect("/index.html"));
app.get("/local.json", (req, res) => res.json({ local: true, version: 1, ip: lanIp() }));
app.use(express.static(site, { extensions: ["html"], index: false }));

function start(port, tries) {
  const server = http.createServer(app);
  const peerServer = ExpressPeerServer(server, { path: "/", allow_discovery: false, proxied: false });
  app.use("/peerjs", peerServer);
  server.on("error", e => {
    if (e.code === "EADDRINUSE" && tries < 10) { console.log(`Port ${port} is busy, trying ${port + 1}...`); start(port + 1, tries + 1); }
    else { console.error("Could not start the server:", e.message); pause(1); }
  });
  server.listen(port, "0.0.0.0", () => {
    const ip = lanIp(); const host = ip || "localhost";
    const url = `http://${host}:${port}/`;
    console.log("");
    console.log("  GOSPEL FOOTBALL - local play");
    console.log("  ============================");
    console.log(`  Big screen:  ${url}`);
    console.log(`  Phones:      http://${host}:${port}/play.html   (same wifi; scan the code on the big screen)`);
    if (!ip) console.log("  No wifi or network found: phones cannot join until this laptop is on a network.");
    console.log("");
    console.log("  Leave this window open while you play. Close it (or press Ctrl+C) to stop.");
    openBrowser(url);
  });
}
start(wantPort, 0);
