#!/usr/bin/env node
// Subtitle tracks from a voice-over: one SRT + one VTT per language, and (optionally) an MP4 with soft subtitle tracks.
//   usage: node tools/subtitles.mjs pieces/<name> [--langs fr,en,es] [--mux renders/share.mp4] [--out dir]
// source language = the voice-over (pieces/<name>/voice.json timing, voice/script.json text; a line's optional "sub"
//   field overrides the spoken text on screen, e.g. digits instead of a spelled-out phone number).
// other languages = pieces/<name>/subs/<lang>.json: { "<line id>": "translated text", ... }
// timing: each line's window [t0, t1]; a line with several sentences is split in proportion to their length.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
if (!argv[0] || argv[0].startsWith('--')) { console.error('usage: node tools/subtitles.mjs pieces/<name> [--langs fr,en,es] [--mux video.mp4] [--out dir]'); process.exit(2); }
const ROOT = path.resolve(argv[0]), OUT = path.resolve(opt('--out', path.join(ROOT, 'renders')));
const V = JSON.parse(fs.readFileSync(path.join(ROOT, 'voice.json'), 'utf8'));
const S = JSON.parse(fs.readFileSync(path.join(ROOT, 'voice', 'script.json'), 'utf8'));
const SRC = opt('--source', 'fr'), langs = opt('--langs', SRC).split(',');
const NAME = { fr: 'Français', en: 'English', es: 'Español', de: 'Deutsch', it: 'Italiano', pt: 'Português', nl: 'Nederlands' };
const ISO3 = { fr: 'fra', en: 'eng', es: 'spa', de: 'deu', it: 'ita', pt: 'por', nl: 'nld' };
fs.mkdirSync(OUT, { recursive: true });

const ts = (t, sep) => { const ms = Math.round(t * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}${sep}${String(ms % 1000).padStart(3, '0')}`; };
const sentences = (txt) => txt.split(/(?<=[.!?…])\s+/).map((x) => x.trim()).filter(Boolean);
// time windows of a line's source sentences, from the heard word times (words are the spoken text split on spaces)
function windowsOf(L, sl) {
  const spoken = sentences(L.text), wc = spoken.map((x) => x.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length);
  let k = 0; const win = [];
  for (const n of wc) { const a = L.words[Math.min(k, L.words.length - 1)], b = L.words[Math.min(k + n - 1, L.words.length - 1)]; win.push([a.t0 - 0.08, b.t1 + 0.28]); k += n; }
  win[0][0] = Math.min(win[0][0], L.t0 - 0.05); win[win.length - 1][1] = Math.max(win[win.length - 1][1], L.t1 + 0.25);
  return win;
}
function cuesFor(lang) {
  const tr = lang === SRC ? null : JSON.parse(fs.readFileSync(path.join(ROOT, 'subs', `${lang}.json`), 'utf8'));
  const cues = [];
  for (const L of V.lines) {
    const sl = S.lines.find((x) => x.id === L.id) || {};
    const text = tr ? tr[L.id] : (sl.sub ?? L.text);
    if (!text) { console.warn(`  [${lang}] no text for line "${L.id}"`); continue; }
    const parts = sentences(text), win = windowsOf(L, sl);
    if (parts.length === win.length) parts.forEach((p, i) => cues.push({ t0: win[i][0], t1: win[i][1], text: p }));
    else { const total = parts.reduce((a, p) => a + p.length, 0), a0 = win[0][0], a1 = win[win.length - 1][1]; let t = a0; for (const p of parts) { const d = (a1 - a0) * p.length / total; cues.push({ t0: t, t1: t + d, text: p }); t += d; } }
  }
  cues.forEach((c, i) => { const next = cues[i + 1]; if (next && c.t1 > next.t0 - 0.04) c.t1 = next.t0 - 0.04; });
  return cues;
}
const written = [];
for (const lang of langs) {
  const cues = cuesFor(lang);
  fs.writeFileSync(path.join(OUT, `subs.${lang}.srt`), cues.map((c, i) => `${i + 1}\n${ts(c.t0, ',')} --> ${ts(c.t1, ',')}\n${c.text}\n`).join('\n'));
  fs.writeFileSync(path.join(OUT, `subs.${lang}.vtt`), 'WEBVTT\n\n' + cues.map((c) => `${ts(c.t0, '.')} --> ${ts(c.t1, '.')}\n${c.text}\n`).join('\n'));
  written.push(lang); console.log(`${lang}: ${cues.length} cues -> subs.${lang}.srt / .vtt`);
}
const mux = opt('--mux');
if (mux) {
  const video = path.resolve(ROOT, mux), dest = path.join(OUT, path.basename(video).replace(/\.mp4$/, '-subs.mp4'));
  const inputs = written.flatMap((l) => ['-i', path.join(OUT, `subs.${l}.srt`)]);
  const maps = ['-map', '0:v', '-map', '0:a', ...written.flatMap((_, i) => ['-map', String(i + 1)])];
  const meta = written.flatMap((l, i) => [`-metadata:s:s:${i}`, `language=${ISO3[l] || l}`, `-metadata:s:s:${i}`, `title=${NAME[l] || l}`]);
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', video, ...inputs, ...maps, '-c:v', 'copy', '-c:a', 'copy', '-c:s', 'mov_text', ...meta, '-disposition:s:0', 'default', dest], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(1);
  console.log('wrote', dest, `(soft tracks: ${written.join(', ')})`);
}
