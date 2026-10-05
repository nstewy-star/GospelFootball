# Voice clips

`lines.json` is the script: one referee voice plus one voice per avatar. Clips are MP3 files generated with ElevenLabs:

- `audio/ref/<key>.mp3` for the referee lines
- `audio/av/<NN>/<key>.mp3` for avatar `NN` (00 to 15, the picker order)
- `audio/voices.json` records which ElevenLabs voice each one used

The game plays a clip when it exists and falls back to the browser's speech voice when it does not.
