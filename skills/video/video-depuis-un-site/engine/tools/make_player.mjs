// Packages the built animation (index.html) into ONE self-contained, shareable page: the canvas animation,
// plus the final mix (voice-over + score) embedded as audio, with a French "play with sound" button.
// usage: node make_player.mjs pieces/<name>  ->  pieces/<name>/player.html (needs renders/audio.wav from export.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.resolve(process.argv[2] || path.dirname(fileURLToPath(import.meta.url)));   // the piece directory (pieces/<name>)
const src = fs.readFileSync(path.join(HERE, 'index.html'), 'utf8');
const mp3 = path.join(HERE, 'renders', 'mix.mp3');
const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', path.join(HERE, 'renders', 'audio.wav'), '-c:a', 'libmp3lame', '-b:a', '160k', mp3], { stdio: 'inherit' });
if (r.status !== 0) { console.error('mp3 encode failed'); process.exit(1); }
const b64 = fs.readFileSync(mp3).toString('base64');

const a = src.indexOf('// live preview: rAF on the 24fps grid');
const b = src.indexOf('const HZ = {');
if (a < 0 || b < 0) { console.error('markers not found'); process.exit(1); }
const player = `// player: the final mix drives the clock; the picture is drawn only when its 2-frame step changes (the motion is on 2s)
const QS = new URLSearchParams(location.search);
const LIVE = { audio: null, t0: 0, start: performance.now() };
if (!QS.has('export')) {
  const cv = document.getElementById('c'), btn = document.getElementById('play');
  if (QS.has('t')) renderFrame(parseFloat(QS.get('t')));
  else {
    const au = new Audio(AUDIO_SRC); au.preload = 'auto';
    let playing = false, lastF = -1;
    const start = () => { au.currentTime = 0; au.play().then(() => { playing = true; btn.style.display = 'none'; }).catch(() => {}); };
    au.addEventListener('ended', () => { playing = false; LIVE.start = performance.now(); btn.textContent = '\\u21BA Revoir avec le son'; btn.style.display = 'block'; });
    btn.addEventListener('click', (e) => { e.stopPropagation(); start(); });
    cv.addEventListener('click', () => { if (!playing) start(); else if (au.paused) au.play(); else au.pause(); });
    const tick = () => {
      const sec = playing ? au.currentTime : (performance.now() - LIVE.start) / 1000;
      const t = ((sec % LOOP_T) + LOOP_T) % LOOP_T, f = Math.floor(t * FPS / 2) * 2;
      if (f !== lastF && typeof renderFrame === "function") { renderFrame(f / FPS); lastF = f; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

`;
let out = src.slice(0, a) + player + src.slice(b);
out = out.replace('"use strict";', `"use strict";\nconst AUDIO_SRC = 'data:audio/mpeg;base64,${b64}';`);
out = out.replace('</style>', `  #play { position: fixed; left: 50%; bottom: 7%; transform: translateX(-50%); padding: 14px 30px; border: 0; border-radius: 40px; background: #fbf6ea; color: #2a1d18; font: 600 22px "Ink Free", "Segoe Print", "Bradley Hand", "Chalkboard SE", cursive; box-shadow: 0 6px 22px rgba(0,0,0,.35); cursor: pointer; }\n  #play:hover { background: #fff; }\n</style>`);
out = out.replace('<canvas id="c"', '<button id="play" type="button">\\u25B6 Lancer avec le son</button>\n<canvas id="c"').replace('\\u25B6 Lancer', '▶ Lancer');
const dest = path.join(HERE, 'player.html');
fs.writeFileSync(dest, out);
console.log('wrote', dest, (out.length / 1e6).toFixed(2), 'MB');
