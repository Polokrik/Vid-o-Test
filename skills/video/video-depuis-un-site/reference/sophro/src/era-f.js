
// =====================================================================
//  ERA F (29.5 – 35.5s) — "Chaque personne est unique. Ici, pas de jugement : juste un espace pour souffler."
//  Four different faces pop in around the spark; grey notes of judgement drift in and are swept away by a big hand;
//  a sky of paper rises, the spark blows a dandelion and its seeds fly off.
// =====================================================================
const F_PEOPLE = [
  { x: 230, key: 'fp1', skin: PAL.skin3, hair: '#1f1713', shirt: PAL.yellow, shirtPat: pat.dots('rgba(255,255,255,0.45)', 6, 30), mood: 'happy', w: 'chaque' },
  { x: 590, key: 'fp2', skin: PAL.skin1, hair: '#b5532b', shirt: PAL.teal, glasses: true, mood: 'smile', w: 'personne' },
  { x: 1330, key: 'fp3', skin: PAL.skin2, hair: '#bdb8b0', shirt: PAL.purple, mood: 'wow', w: 'est' },
  { x: 1690, key: 'fp4', skin: PAL.skin2, hair: '#2b211d', beard: true, shirt: PAL.blue, shirtPat: pat.stripes('rgba(255,255,255,0.3)', 8, 28), mood: 'happy', w: 'unique' },
];
const F_NOTES = [['trop sensible', 360, 330, -0.1], ['il faut…', 800, 250, 0.07], ['tu devrais', 1250, 300, -0.05], ['allez !', 1620, 360, 0.1]];
function bunting(y, key) {
  const pts = []; for (let x = -40; x <= W + 40; x += 40) pts.push([x, y + Math.sin(x / W * Math.PI) * 60 + 30]);
  ink(pts, { w: 4, color: '#8a6a3a', key: key + 's', amt: 0.4 });
  const cols = [PAL.yellow, PAL.mint, PAL.purple, PAL.pink, PAL.sky, PAL.orangeD ? '#f4a259' : PAL.orange];
  for (let i = 0; i < 17; i++) { const x = 60 + i * 112, yy = y + Math.sin(x / W * Math.PI) * 60 + 30; cut([[x - 36, yy], [x + 36, yy], [x, yy + 70]], cols[i % cols.length], { key: key + i, sb: 5, sy: 3, tear: 0.8, grain: 0.5 }); }
}
function dandelion(x, y, headR, launch, key) {   // stem from (x, y) up to a seed head; each seed leaves after its launch time
  ink([[x, y], [x - 10, y - (y - 560) * 0.5], [x + 6, 560 + headR * 0.4]], { w: 9, color: PAL.greenD, key: key + 'st', amt: 0.6 });
  cut([[x + 4, y - 110], [x + 80, y - 160], [x + 20, y - 80]], PAL.green, { key: key + 'lf', sb: 4, sy: 3 });
  const hy = 560, N = 44;
  for (let i = 0; i < N; i++) {
    const a = i / N * TAU * 2.0 + 0.3, ring = 0.55 + 0.45 * ((i * 7) % 11) / 10, L = headR * ring;
    const t0 = launch + (i % 11) * 0.045 + Math.floor(i / 11) * 0.03, u = Math.max(0, TT - t0);
    const sx = x + Math.cos(a) * L + u * (260 + (i % 5) * 70), sy = hy + Math.sin(a) * L - u * (40 + (i % 4) * 30) + Math.sin(u * 3 + i) * 18 * Math.min(1, u);
    if (sx > W + 80) continue;
    const ex = sx - Math.cos(a) * 24, ey = sy - Math.sin(a) * 24;   // the little tuft of each seed
    ink([[x + Math.cos(a) * 12 + u * 0 * 1, hy + Math.sin(a) * 12], [sx, sy]].map((p, k) => (u > 0 && k === 0 ? [sx - 22, sy + 4] : p)), { w: 2.4, color: '#e8e4d8', key: key + 'sd' + i, amt: 0.3 });
    cut(ellipsePts(sx, sy, 11, 11, 0, 12), '#fbf6ea', { key: key + 'tf' + i, sb: 3, sy: 2, tear: 0.4, grain: 0.3, shade: false });
    for (let k = -2; k <= 2; k++) ink([[sx, sy], [sx + Math.cos(a + k * 0.35) * 16, sy + Math.sin(a + k * 0.35) * 16]], { w: 1.6, color: '#f1ede2', key: key + 'f' + i + k, amt: 0.2 });
  }
  cut(ellipsePts(x + 2, hy, 20, 20, 0, 16), '#c9b98a', { key: key + 'hd', sb: 4, sy: 3, grain: 0.5 });
}
function sceneF() {
  const T = TT, tS = VW('unique', 'souffler'), tJ = VW('unique', 'jugement'), tI = VW('unique', 'ici'), tW = 33.15;
  // part 1 and 2: the pink room of everyone
  bgFull('#f3a3bf', { key: 'wallF', pat: pat.gingham('rgba(255,255,255,0.16)', 26), crayon: '#e68aa9', crAl: 0.2 });
  bunting(50, 'bunF');
  cut(rect(-30, 880, W + 60, 300, 0), PAL.wood, { key: 'floorF', tear: 0, pat: pat.grainWood('rgba(120,60,20,0.18)'), sy: -6 });
  F_PEOPLE.forEach((p) => { const k = popS(VW('unique', p.w) - 0.05); if (k > 0) { ctx.save(); ctx.translate(p.x, 880); ctx.scale(k, k); ctx.translate(-p.x, -880); person(p.x, 800 + Math.sin(T * 1.4 + p.x) * 4, 1.2, p); ctx.restore(); } });
  sparkOf(960, 690, 150 * (0.88 + 0.12 * popS(29.55)), { rays: 9, mood: T > VW('unique', 'unique') && T < tI ? 'happy' : T >= tI && T < tS - 0.2 ? 'smile' : 'smile' });
  // grey notes of judgement float in, then a big hand sweeps them off the page
  const sw = EZ.io(ev(tJ - 0.05, 0.8)), hx = lerp(W + 450, -520, sw);
  F_NOTES.forEach(([s, x0, y0, r], i) => {
    const tin = tI + 0.15 * i; if (T < tin) return;
    const fall = EZ.o2(ev(tin, 0.7)), carried = hx < x0 + 160, nx = carried ? hx - 150 - i * 12 : x0, ny = lerp(-120, y0, fall) + (carried ? -sw * 60 : Math.sin(T * 2 + i) * 8);
    if (nx < -200) return;
    stickyNote(nx, ny, 0.85, '#cfcbd0', s, r + (carried ? -sw * 0.9 : 0), 'fn' + i);
  });
  if (T >= tJ - 0.1 && hx > -480) hand(hx, 560, 1.7, Math.PI, PAL.skin1, PAL.teal, { key: 'handF', sleevePat: pat.stripes('rgba(255,255,255,0.14)', 10, 34) });
  // part 3: a sky of paper rises over the room — "un espace"
  const wp = EZ.io(ev(tW, 0.55));
  if (wp > 0) cut(hillPts(lerp(H + 90, -120, wp), 22, 150, 0.2, -40, W + 40, H + 300), '#cfe7f2', { key: 'wipeF', shadow: true, sy: -9, sb: 14, tear: 1.0 });
  if (wp >= 1) {
    skyBands(['#bfe0ef', '#cfe7f2', '#dcedf3'], 0, H, 'skyF');
    sunPaper(1560, 190, 62, 'sunF', 12, T * 0.25);
    [[300, 150, 130, 48], [1180, 250, 150, 54], [1760, 420, 100, 38]].forEach(([x, y, rx, ry], i) => cloud(x + Math.sin(T * 0.5 + i) * 36, y, rx, ry, '#ffffff', 'cloudF' + i, { depth: 0.3 }));
    cut(hillPts(860, 26, 240, 1.2), '#8cc58a', { key: 'hillF1', sy: -5 }); cut(hillPts(960, 18, 200, 2.4), PAL.green, { key: 'hillF2', sy: -6, pat: pat.stripes('rgba(255,255,255,0.12)', 4, 22, 0.3) });
    dandelion(1010, 980, 125, tS, 'dnd');
    const blow = ev(tS - 0.1, 1.3), wind = T >= tS - 0.1 ? 1 : 0;
    sparkOf(470, 700, 200 * (0.92 + 0.08 * popS(33.7)), { rays: 10, mood: T >= tS - 0.1 && T < tS + 1.1 ? 'wow' : 'happy' });
    if (wind) for (let i = 0; i < 4; i++) { const u = mod(T * 1.4 + i * 0.27, 1), sx = 640 + u * 360; ink([[sx, 640 + i * 28 - 40], [sx + 60, 636 + i * 28 - 40 - Math.sin(u * TAU) * 12], [sx + 120, 640 + i * 28 - 40]], { w: 5, color: 'rgba(255,255,255,0.9)', key: 'windF' + i, amt: 0.6, frac: Math.sin(u * Math.PI) * 1.2 }); }
    for (let i = 0; i < 3; i++) bird(1300 + i * 150 + Math.sin(T * 0.8 + i) * 30, 360 + i * 40, 0.9 - i * 0.1, 'birdF' + i);
  }
  captions();
}
