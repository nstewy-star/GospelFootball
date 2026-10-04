# Gospel Football

A General Conference and gospel trivia football game for family night, Primary activities and youth groups.
Answer a question, take the field, and run the play on a 3D field. Pewee, College and Pro levels.

## Play on one screen

Open `index.html` (on GitHub Pages: the site's main page). Sign the players, pick a playbook and kick off.
Everyone answers on the big screen.

## Play with phones

1. On the big screen, open the main page and press **Turn on phones**. A QR code and a four-letter code appear.
2. Everyone scans the code with their phone camera (or opens `play.html` and types the code), then signs up with a name, a picture, a level and a team.
3. Kick off. Each player answers their own questions on their phone. Each huddle a rotating quarterback picks who gets the ball, and a rotating defensive captain guesses who it will be. Team players (fill-ins) answer by team vote.

Phones talk to the big screen directly (WebRTC through the free PeerJS signaling service), so there is no server to run and no accounts.
It works best when the big screen and the phones are on the same wifi. The big screen can always tap an answer or a play itself if a phone is slow.

## Playbooks

2026 Conference (April and October 2026 talks), Gospel Foundations, Preach My Gospel, Scripture Mastery, and Scramble (everything mixed).
Conference questions use talk titles, announcements and short phrases from Church Newsroom and Church News summaries.

## Files

- `index.html` – the big-screen game (also fine on a laptop or tablet)
- `play.html` – the phone controller
- `peerjs.min.js`, `qrcode.js` – vendored libraries (PeerJS 1.5.4, qrcode-generator 1.4.4)
