#!/usr/bin/env node
// Sets up a video workspace on any computer (Windows, macOS, Linux): copies the bundled engine, installs Playwright + Chromium,
// finds a Python that has pip and installs edge-tts + faster-whisper. The engine is vendored (MIT, cth9191/animate, with our patches):
// no clone from GitHub is needed. Network is needed for npm, Chromium, pip and the first whisper model download.
//   usage: node scripts/setup.mjs [workspace-dir] [--update]      (default workspace: ./video-studio; --update re-copies the engine over an existing one)
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2), update = argv.includes('--update');
const WORK = path.resolve(argv.find((a) => !a.startsWith('--')) || 'video-studio'), ENG = path.join(WORK, 'animate-skill');
const win = process.platform === 'win32';
const sh = (cmd, args, o = {}) => spawnSync(cmd, args, { stdio: 'inherit', shell: win && /^(npm|npx)$/.test(cmd), ...o });
const ok = (cmd, args) => { try { const r = spawnSync(cmd, args, { encoding: 'utf8', shell: win && /^(npm|npx)$/.test(cmd) }); return r.status === 0 ? (r.stdout || r.stderr || '').trim() : null; } catch { return null; } };

// ---- prerequisites
const nodeMajor = Number(process.versions.node.split('.')[0]);
if (nodeMajor < 18) { console.error(`Node >= 18 needed (found ${process.versions.node})`); process.exit(1); }
if (!ok('ffmpeg', ['-version'])) { console.error('ffmpeg not found on PATH: install it (Windows: winget install Gyan.FFmpeg · macOS: brew install ffmpeg · Linux: apt install ffmpeg)'); process.exit(1); }
const candidates = [process.env.PYTHON, 'python3', 'python', 'py'].filter(Boolean);
let py = null;
for (const c of candidates) { const args = c === 'py' ? ['-3', '-m', 'pip', '--version'] : ['-m', 'pip', '--version']; if (ok(c, args)) { py = c === 'py' ? 'py' : c; break; } }
if (!py) { console.error('no Python with pip found (set PYTHON=/path/to/python; on Windows use the python.org install, not a venv without pip)'); process.exit(1); }
const pyArgs = (a) => (py === 'py' ? ['-3', ...a] : a);

// ---- engine
if (fs.existsSync(ENG) && !update) console.log(`engine already in ${ENG} (use --update to refresh it)`);
else {
  fs.mkdirSync(WORK, { recursive: true });
  const keep = ['node_modules', 'package.json', 'package-lock.json', 'pieces', 'python.txt'];
  fs.mkdirSync(ENG, { recursive: true });
  for (const n of fs.readdirSync(path.join(SKILL, 'engine'))) fs.cpSync(path.join(SKILL, 'engine', n), path.join(ENG, n), { recursive: true, force: true });
  for (const n of ['reference', 'fonts']) fs.cpSync(path.join(SKILL, n), path.join(ENG, n), { recursive: true, force: true });
  fs.mkdirSync(path.join(ENG, 'pieces'), { recursive: true });
  console.log(`engine copied to ${ENG}`);
}
// ---- node deps
if (!fs.existsSync(path.join(ENG, 'package.json'))) fs.writeFileSync(path.join(ENG, 'package.json'), JSON.stringify({ name: 'video-studio', private: true, type: 'commonjs' }, null, 2));
if (!fs.existsSync(path.join(ENG, 'node_modules', 'playwright'))) { sh('npm', ['i', 'playwright'], { cwd: ENG }); }
sh('npx', ['playwright', 'install', 'chromium'], { cwd: ENG });
// ---- python deps
const pip = sh(py, pyArgs(['-m', 'pip', 'install', '-q', 'edge-tts', 'faster-whisper', 'numpy']));
const resolved = ok(py, pyArgs(['-c', 'import sys; print(sys.executable)'])) || py;
fs.writeFileSync(path.join(ENG, 'python.txt'), resolved);
const check = ok(py, pyArgs(['-c', 'import edge_tts, faster_whisper, numpy; print("python deps ok")']));
console.log(check || 'python deps: install failed, run pip manually: pip install edge-tts faster-whisper numpy');
console.log(`\nready. workspace: ${ENG}\n  python for voice tools: ${resolved}\n  new piece:  cd "${ENG}" && node tools/newpiece.mjs <name>`);
