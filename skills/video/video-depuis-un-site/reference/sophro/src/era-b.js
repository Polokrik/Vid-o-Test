
// =====================================================================
//  ERA B (8 – 11.5s) — "Et si vous preniez un temps, rien que pour vous ?"
//  The storm cloud has turned white. A morning hill: tea, an hourglass, a book, flowers. The spark breathes out.
// =====================================================================
const B_CLOUD = { x: 960, y: 262, rx: 350, ry: 128 };
const cloudOffB = () => [Math.sin(TT * 1.1) * 12, Math.sin(TT * 1.7) * 5];
const cloudPtsB = () => { const [dx, dy] = cloudOffB(); return cloudPts(B_CLOUD.x + dx, B_CLOUD.y + dy, B_CLOUD.rx, B_CLOUD.ry, 7, 0.34); };

function hourglass(x, y, s, frac, key = 'hg') {   // frac = how much sand has run into the bottom (0..1)
  const gl = 'rgba(205,232,246,0.85)';
  cut(rect(x - 60 * s, y - 120 * s, 120 * s, 22 * s, 4), PAL.woodD, { key: key + 'c1', sb: 6, sy: 4 });
  cut(rect(x - 60 * s, y + 98 * s, 120 * s, 22 * s, 4), PAL.woodD, { key: key + 'c2', sb: 6, sy: 4 });
  cut([[x - 48 * s, y - 100 * s], [x + 48 * s, y - 100 * s], [x + 6 * s, y], [x + 48 * s, y + 100 * s], [x - 48 * s, y + 100 * s], [x - 6 * s, y]], gl, { key: key + 'g', grain: 0.4, sb: 8, sy: 5 });
  const top = 1 - frac;                                   // sand left on top, sand piled below
  cut([[x - 40 * s * top - 4, y - 96 * s + 70 * s * frac], [x + 40 * s * top + 4, y - 96 * s + 70 * s * frac], [x + 3 * s, y - 4 * s], [x - 3 * s, y - 4 * s]], PAL.yellow, { key: key + 's1', shadow: false, grain: 0.3, shade: false });
  cut([[x - 40 * s * (0.4 + 0.6 * frac), y + 96 * s], [x + 40 * s * (0.4 + 0.6 * frac), y + 96 * s], [x, y + (96 - 70 * frac) * s]], PAL.yellow, { key: key + 's2', shadow: false, grain: 0.3, shade: false });
  if (frac > 0.02 && frac < 0.98) ink([[x, y - 2 * s], [x, y + (96 - 70 * frac) * s]], { w: 2.5 * s, color: PAL.mustard, key: key + 'fl' });
}
function sceneB() {
  const T = TT, tWord = VW('pause', 'temps'), tRien = VW('pause', 'pour');
  skyBands(['#bfe0ef', '#cfe7f2', '#dcedf3'], 0, H, 'skyB');
  sunPaper(1560, 220, 72, 'sunB', 12, T * 0.25);
  [[330, 170, 130, 50], [1340, 410, 150, 54]].forEach(([x, y, rx, ry], i) => cloud(x + Math.sin(T * 0.6 + i) * 30, y, rx, ry, '#ffffff', 'cloudB' + i, { depth: 0.3 }));
  const [dx, dy] = cloudOffB();
  cut(cloudPtsB(), '#ffffff', { key: 'cloudB', crayon: '#dfe9f0', crAl: 0.3, sb: 16, sy: 10, tear: 1.1 });
  bird(1100 + Math.sin(T) * 40, 470, 1.1, 'birdB1'); bird(1220 + Math.sin(T + 1) * 30, 420, 0.8, 'birdB2');
  cut(hillPts(690, 28, 260, 0.4), '#8cc58a', { key: 'hillB1', sy: -5, pat: pat.stripes('rgba(255,255,255,0.10)', 4, 20, 0.3) });
  cut(hillPts(800, 22, 220, 1.6), PAL.green, { key: 'hillB2', sy: -6, pat: pat.stripes('rgba(255,255,255,0.12)', 4, 22, 0.3) });
  // the small pleasures: an hourglass, a steaming mug, a book; flowers pop on "un temps"
  hourglass(1390, 760, 1.15, EZ.io(ev(8.3, 3.0)), 'hgB');
  mug(640, 790, 1.15, PAL.yellow, 'mugB', true);
  cut(rect(1560, 850, 230, 36, 4), PAL.teal, { key: 'bookB1', sb: 5, sy: 4 }); cut(rect(1580, 818, 200, 34, 4), PAL.pink, { key: 'bookB2', sb: 5, sy: 4 });
  [[300, 840, PAL.pink], [440, 900, PAL.purple], [1160, 880, '#ffffff'], [1020, 940, PAL.pink], [220, 960, PAL.yellow]].forEach(([x, y, c], i) => { const k = popS(tWord + i * 0.14); if (k > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(k, k); flowerPaper(0, 0, 1.2, c, 'flB' + i, 70); ctx.restore(); } });
  // the spark exhales: relief, then a smile with closed eyes
  const mood = T < 8.9 ? 'wow' : T < tRien - 0.1 ? 'smile' : 'happy';
  sparkOf(960, 640, 190, { rays: 7, mood });
  captions();
}
