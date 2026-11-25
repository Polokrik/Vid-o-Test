#!/usr/bin/env node
// One text-to-speech take per script line (edge-tts: Microsoft neural voices, free, no API key, needs internet).
//   usage: node tools/gen_voice.mjs pieces/<name> [voice] [rate] [pitch] [id1,id2]
//   defaults: fr-FR-VivienneMultilingualNeural -12% -3Hz ; a line's own "rate" in voice/script.json wins ; ids = regenerate only these lines
// Other voices: python -m edge_tts --list-voices   (e.g. fr-FR-RemyMultilingualNeural, en-US-AvaMultilingualNeural, es-ES-ElviraNeural)
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url)), argv = process.argv.slice(2);
if (!argv[0]) { console.error('usage: node tools/gen_voice.mjs pieces/<name> [voice] [rate] [pitch] [ids]'); process.exit(2); }
const pyFile = path.join(here, '..', 'python.txt');
const py = process.env.PYTHON || (fs.existsSync(pyFile) ? fs.readFileSync(pyFile, 'utf8').trim() : (process.platform === 'win32' ? 'python' : 'python3'));
const [piece, voice = 'fr-FR-VivienneMultilingualNeural', rate = '-12%', pitch = '-3Hz', ids] = argv;
const r = spawnSync(py, [path.join(here, 'gen_voice.py'), voice, rate, pitch, ...(ids ? [ids] : [])], { stdio: 'inherit', env: { ...process.env, PIECE: path.resolve(piece) } });
process.exit(r.status ?? 1);
