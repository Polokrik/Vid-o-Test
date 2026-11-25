#!/usr/bin/env node
// Turns a reference video into something Claude can read: contact sheets (one frame per second, tiled), a list of cuts,
// an optional transcript (faster-whisper, local), and a reference.md skeleton to fill in after looking at the sheets.
//   usage: node contact_sheet.mjs <video> [--out dir] [--fps 1] [--cols 4] [--rows 6] [--width 360] [--transcribe fr|en|...] [--cut 0.3]
// Needs ffmpeg + ffprobe on PATH; --transcribe needs Python with faster-whisper (PYTHON=... or auto-detected).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const video = argv.find((a) => !a.startsWith('--') && fs.existsSync(a));
if (!video) { console.error('usage: node contact_sheet.mjs <video> [--out dir] [--fps 1] [--cols 4] [--rows 6] [--width 360] [--transcribe fr] [--cut 0.3]'); process.exit(2); }
const OUT = path.resolve(opt('--out', path.join(path.dirname(path.resolve(video)), path.basename(video).replace(/\.[^.]+$/, '') + '-reference')));
const fps = Number(opt('--fps', 1)), cols = Number(opt('--cols', 4)), rows = Number(opt('--rows', 6)), width = Number(opt('--width', 360)), cutT = Number(opt('--cut', 0.3));
fs.mkdirSync(OUT, { recursive: true });
const run = (cmd, args, o = {}) => spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 28, ...o });

// ---- facts
const pr = run('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,width,height,r_frame_rate,duration:format=duration', '-of', 'json', video]);
const info = JSON.parse(pr.stdout || '{}'), vs = (info.streams || []).find((s) => s.codec_type === 'video') || {}, hasAudio = (info.streams || []).some((s) => s.codec_type === 'audio');
const dur = Number(info.format?.duration || vs.duration || 0), [fn, fd] = String(vs.r_frame_rate || '24/1').split('/').map(Number), vfps = fn / (fd || 1);

// ---- cuts (scene detection)
const sc = run('ffmpeg', ['-hide_banner', '-i', video, '-vf', `select='gt(scene,${cutT})',showinfo`, '-an', '-f', 'null', '-']);
const cuts = [...(sc.stderr || '').matchAll(/pts_time:([0-9.]+)/g)].map((m) => Number(m[1])).filter((t) => t > 0.05);

// ---- contact sheets: cols x rows frames per sheet, read left to right, top to bottom
const per = cols * rows, nFrames = Math.ceil(dur * fps), sheets = [];
for (let s = 0; s * per < nFrames; s++) {
  const t0 = s * per / fps, file = path.join(OUT, `sheet-${String(s + 1).padStart(2, '0')}.jpg`);
  const r = run('ffmpeg', ['-y', '-v', 'error', '-ss', String(t0), '-i', video, '-t', String(per / fps), '-vf', `fps=${fps},scale=${width}:-1,tile=${cols}x${rows}`, '-frames:v', '1', '-q:v', '3', file]);
  if (r.status === 0 && fs.existsSync(file)) sheets.push({ file: path.basename(file), t0, t1: Math.min(dur, t0 + per / fps) });
}

// ---- transcript
let transcript = '';
const lang = opt('--transcribe');
if (lang && hasAudio) {
  const wav = path.join(OUT, 'audio-16k.wav');
  run('ffmpeg', ['-y', '-v', 'error', '-i', video, '-ac', '1', '-ar', '16000', wav]);
  const py = [process.env.PYTHON, 'python3', 'python', 'py'].filter(Boolean).find((c) => run(c, c === 'py' ? ['-3', '-c', 'import faster_whisper'] : ['-c', 'import faster_whisper']).status === 0);
  if (!py) transcript = '(transcript skipped: no Python with faster-whisper; pip install faster-whisper)';
  else {
    const code = `import sys, json, subprocess, numpy as np\nfrom faster_whisper import WhisperModel\nraw = subprocess.run(['ffmpeg','-v','error','-i',sys.argv[1],'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True,check=True).stdout\nm = WhisperModel('small', device='cpu', compute_type='int8')\nsegs,_ = m.transcribe(np.frombuffer(raw,dtype=np.float32), language=sys.argv[2], beam_size=5)\nfor s in segs: print(f"{s.start:6.1f}-{s.end:6.1f}  {s.text.strip()}")`;
    const r = run(py, [...(py === 'py' ? ['-3'] : []), '-c', code, wav, lang], { env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
    transcript = r.status === 0 ? r.stdout.trim() : '(transcript failed: ' + (r.stderr || '').slice(-200) + ')';
  }
}

// ---- reference.md skeleton
const md = `# Reference: ${path.basename(video)}

- duration ${dur.toFixed(1)} s, ${vs.width}x${vs.height} @ ${vfps.toFixed(2)} fps, audio: ${hasAudio ? 'yes' : 'no'}
- cuts detected (scene > ${cutT}): ${cuts.length ? cuts.map((t) => t.toFixed(1)).join(', ') + ' s' : 'none'} (mean shot ${(dur / (cuts.length + 1)).toFixed(1)} s)
- sheets: ${sheets.map((s) => `${s.file} (${s.t0.toFixed(0)}-${s.t1.toFixed(0)} s)`).join(', ')}; ${cols}x${rows} frames, one every ${(1 / fps).toFixed(1)} s, read left to right, top to bottom. Times off a sheet are estimates (±${(1 / fps).toFixed(1)} s).

## To fill in after reading the sheets (keep it short, measured, no copying of someone else's art)
- **Look**: palette (hex guesses), line/texture, depth, typography, grain, what the medium is.
- **Rhythm**: shot lengths, where it holds, where it rushes, transitions (cut / morph / wipe).
- **Story spine**: the sequence of beats in one line each, with times.
- **Sound** (from the transcript / listening, not from the sheets): voice, music mood, loudest moment, silences.
- **What to borrow as a principle** and **what must not be copied**.

## Transcript
${transcript || '(not requested; add --transcribe fr)'}
`;
fs.writeFileSync(path.join(OUT, 'reference.md'), md);
console.log(`wrote ${path.join(OUT, 'reference.md')} + ${sheets.length} sheet(s); ${cuts.length} cut(s) detected${transcript && !transcript.startsWith('(') ? '; transcript done' : ''}`);
