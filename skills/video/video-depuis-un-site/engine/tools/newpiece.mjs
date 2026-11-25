#!/usr/bin/env node
// Scaffold a new piece from the reference piece (logo-free hero already wired, handwriting font, voice-clock helpers, review settings).
//   usage: node tools/newpiece.mjs <name> [--from reference/sophro] [--minimal]
//   --minimal keeps head/common/heroes/bridges/score and replaces the eight example scenes with empty ones to fill in.
// creates pieces/<name>/{piece.json, src/, voice/script.json, subs/, fonts/, assets/}; edit the script first, then the scenes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const name = argv[0];
if (!name || name.startsWith('--') || !/^[a-z0-9][a-z0-9-]*$/.test(name)) { console.error('usage: node tools/newpiece.mjs <name> [--from reference/sophro] [--minimal]   (name: lowercase letters, digits, dashes)'); process.exit(2); }
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const from = path.resolve(ROOT, opt('--from', 'reference/sophro')), dest = path.join(ROOT, 'pieces', name);
if (!fs.existsSync(from)) { console.error('reference not found:', from); process.exit(1); }
if (fs.existsSync(dest)) { console.error('already exists:', dest); process.exit(1); }
fs.mkdirSync(dest, { recursive: true });
for (const d of ['src', 'voice', 'subs']) if (fs.existsSync(path.join(from, d))) fs.cpSync(path.join(from, d), path.join(dest, d), { recursive: true });
fs.copyFileSync(path.join(from, 'piece.json'), path.join(dest, 'piece.json'));
for (const d of ['assets', 'renders']) fs.mkdirSync(path.join(dest, d), { recursive: true });
if (fs.existsSync(path.join(ROOT, 'fonts'))) fs.cpSync(path.join(ROOT, 'fonts'), path.join(dest, 'fonts'), { recursive: true });
const pj = JSON.parse(fs.readFileSync(path.join(dest, 'piece.json'), 'utf8')); pj.name = name; pj.title = name;
if (argv.includes('--minimal')) {
  for (const f of fs.readdirSync(path.join(dest, 'src')).filter((n) => /^era-[a-z]\.js$/.test(n))) {
    const L = f.slice(4, 5).toUpperCase();
    fs.writeFileSync(path.join(dest, 'src', f), `\n// ERA ${L}: replace with the scene for this part of the script. Cue everything on the voice: VW('line-id', 'word').\nfunction scene${L}() {\n  bgFull('#cfe7f2', { key: 'bg${L}' });\n  captions();\n}\n`);
  }
}
fs.writeFileSync(path.join(dest, 'piece.json'), JSON.stringify(pj, null, 2));
console.log(`created ${path.relative(process.cwd(), dest)}
next: 1) edit voice/script.json   2) node tools/gen_voice.mjs pieces/${name}   3) node tools/voice.mjs pieces/${name} --model small --lang fr
      4) edit src/head.html (durations, eras, captions) and the scenes   5) node tools/build.mjs pieces/${name}   6) tools/still.mjs, export.mjs, review.mjs`);
