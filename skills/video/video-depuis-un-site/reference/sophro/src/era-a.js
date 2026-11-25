
// =====================================================================
//  ERA A (0 – 8s) — "Le stress. La fatigue. Les nuits trop courtes. Parfois, la tempête est à l'intérieur."
//  A night room. The spark sits under its own storm cloud; the clock races; sticky notes fall; the storm gets inside.
// =====================================================================
const A_STORM = { x: 960, y: 262, rx: 350, ry: 128 };
const stormOff = () => [Math.sin(TT * 1.3) * 14, Math.sin(TT * 2.1) * 6];
const stormPtsA = () => { const [dx, dy] = stormOff(); return cloudPts(A_STORM.x + dx, A_STORM.y + dy, A_STORM.rx, A_STORM.ry, 7, 0.34); };
const A_FLASH = () => [VW('stress', 'stress'), VW('storm', 'linter'), VW('stress', 'courtes') + 0.1];

function scribble(cx, cy, r, turns, key, frac, col) {   // a tangled spiral of worry
  const R = RNG('scr', key), P = [], n = Math.round(turns * 26);
  for (let i = 0; i <= n; i++) { const u = i / n, a = u * turns * TAU, rr = r * (0.25 + 0.75 * Math.sin(u * Math.PI) ** 0.6) * (0.85 + R.f() * 0.3); P.push([cx + Math.cos(a) * rr * 1.2, cy + Math.sin(a * 1.07) * rr]); }
  ink(P, { w: 5, color: col, key, frac, amt: 1.2 });
}
function boltPts(x, y, len) { return [[x, y], [x - 30, y + len * 0.3], [x + 6, y + len * 0.34], [x - 44, y + len * 0.72], [x - 4, y + len * 0.74], [x - 70, y + len], [x + 14, y + len * 0.5], [x - 22, y + len * 0.47], [x + 24, y + len * 0.15]]; }

function sceneA() {
  const T = TT, flashes = A_FLASH();
  const flashing = flashes.some((c) => T >= c && T < c + 0.3);
  // wall, window with the night and a sleeping cat, wall clock
  bgFull('#2f3a66', { key: 'wallA', pat: pat.dots('rgba(255,230,180,0.08)', 4, 78), crayon: '#232c52', crAl: 0.25 });
  cut(rect(150, 110, 380, 470, 6), PAL.woodD, { key: 'winA' });
  cut(rect(176, 136, 328, 418, 2), PAL.night, { key: 'glassA', shadow: false, pat: (bb) => { const R = RNG('starsA'); for (let i = 0; i < 26; i++) sparkle(R.r(bb.x0 + 10, bb.x1 - 10), R.r(bb.y0 + 10, bb.y1 - 60), R.r(3, 8) * (0.55 + 0.45 * ((B + i) % 2))); } });
  const moonX = lerp(250, 440, EZ.io(ev(3.5, 3.0)));
  cut(ellipsePts(moonX, 230, 36, 36, 0, 30), '#f6ecc8', { key: 'moonA', crayon: '#e3d49a' });
  cut(ellipsePts(moonX - 14, 222, 34, 34, 0, 30), PAL.night, { key: 'moonbA', shadow: false, grain: false, shade: false });
  ink([[176, 345], [504, 345]], { w: 8, color: PAL.woodD, key: 'wmidA' }); ink([[340, 136], [340, 554]], { w: 8, color: PAL.woodD, key: 'wmidB' });
  cut(rect(130, 566, 420, 34, 4), PAL.wood, { key: 'sillA' });
  cat(300, 538, 0.85, PAL.charcoal, 'catA');
  const tm = 700 + 215 * EZ.io(ev(3.5, 1.4));
  clock(1640, 250, 108, Math.floor(tm / 60) % 12, tm % 60, 'clockA');
  // sticky notes on the wall (three more fall in on the words "les nuits trop courtes")
  stickyNote(1380, 470, 0.9, PAL.yellow, 'à faire', -0.06, 'a1'); stickyNote(1530, 520, 0.85, PAL.pinkL, 'mails', 0.05, 'a2'); stickyNote(1690, 480, 0.9, PAL.mint, 'urgent', 0.08, 'a3');
  // the desk and its small life
  cut(rect(-30, 790, W + 60, 400, 0), PAL.wood, { key: 'deskA', tear: 0, pat: pat.grainWood('rgba(120,60,20,0.18)'), sy: -7, sb: 14 });
  const lampOn = flashing ? 1 : (TT * 24 | 0) % 29 < 24 ? 1 : 0.4;   // a flickering lamp
  cut(ellipsePts(560, 800, 62, 18, 0, 24), PAL.lamp, { key: 'lbaseA' }); cut(capsulePts(560, 792, 610, 600, 16), '#c9a24a', { key: 'larmA' });
  cut([[556, 620], [592, 548], [704, 548], [740, 620]], lampOn > 0.9 ? PAL.lamp : '#24543f', { key: 'shadeA' });
  books(1590, 800, 1.1, 'bkA');
  mug(1330, 850, 1.0, '#8a8590', 'mugA', false);   // a cold mug: no steam
  cut(rect(430, 850, 220, 130, 4), PAL.paper, { key: 'paperA', sy: 5, pat: pat.lines('rgba(90,130,190,0.35)', 22, 18) });
  // the storm cloud and its rain
  const [dx, dy] = stormOff();
  cloud(700 + dx * 1.3, 318 + dy, 230, 92, '#3b3d5e', 'cloudA2');
  cloud(1230 + dx * 0.8, 306 + dy, 250, 98, '#3b3d5e', 'cloudA3');
  cut(stormPtsA(), '#53557a', { key: 'cloudA', crayon: '#3b3d5e', crAl: 0.4, sb: 16, sy: 10, tear: 1.1 });
  const heavy = clamp((T - VW('stress', 'fatigue')) * 0.9 + 0.5, 0.5, 1) * 1;
  const nR = Math.round(46 * heavy);
  for (let i = 0; i < nR; i++) { const R = RNG('rainA', i), x = 770 + R.f() * 380, y = 360 + mod(R.f() * 440 + T * 560, 440); if (y < 790) ink([[x, y], [x - 7, y + 26]], { w: 4, color: 'rgba(190,215,245,0.9)', key: 'rA' + i, amt: 0.2 }); }
  // the spark: sad, startles at each flash, droops with fatigue, rattles when the storm gets in
  const tFat = VW('stress', 'fatigue'), tNight = VW('stress', 'nuits'), tStorm = VW('storm', 'tempete'), tIn = VW('storm', 'linter');
  const startle = (T >= flashes[0] && T < flashes[0] + 0.5) || (T >= tStorm && T < tIn + 0.6);
  let mood = 'sad'; if (startle) mood = 'wow'; else if (T >= tFat && T < tNight + 0.9) mood = 'focus';
  const droop = 1 - 0.12 * EZ.o2(ev(tFat, 0.6)), sx = startle ? Math.sin(T * 70) * 5 : 0;
  const R0 = 190 * droop;
  sparkOf(960 + sx, 640 + (1 - droop) * 190, R0, { rays: 6, mood, s: 0.9 + 0.1 * popS(0.15) });
  if (T >= tStorm) {   // the storm inside the little body
    const k = popS(tStorm), r = R0 * 0.9 * (0.9 + 0.1 * popS(0.15)), cy = 640 + (1 - droop) * 190 + Math.sin(T * TAU * 0.9 + SKEY.length * 1.7) * r * 0.035;
    ctx.save(); trace(ellipsePts(960 + sx, cy, r * 0.52 * k, r * 0.5 * k, 0, 40), true); ctx.clip();
    ctx.fillStyle = 'rgba(36,41,84,0.88)'; ctx.fillRect(900, cy - 90, 140, 180);
    trace(cloudPts(960 + sx, cy - r * 0.2, r * 0.36, r * 0.14, 5, 0.3), true); ctx.fillStyle = '#8c8fb5'; ctx.fill();
    for (let i = 0; i < 7; i++) { const x = 960 + sx - r * 0.3 + i * r * 0.1, y = cy - r * 0.08 + mod(i * 31 + T * 220, r * 0.4); ctx.strokeStyle = 'rgba(190,215,245,0.95)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 10); ctx.stroke(); }
    if (T >= tIn && T < tIn + 0.4) { trace(boltPts(960 + sx, cy - r * 0.1, r * 0.4), true); ctx.fillStyle = PAL.yellow; ctx.fill(); }
    ctx.restore();
    face(960 + sx, cy + r * 0.04, r / 64 * 1.1, mood);
  }
  // tangled worries around its head, drawn on as the voice says "le stress"
  const tf = ev(flashes[0] - 0.1, 0.9);
  scribble(720, 600, 90, 3.2, 'tangleA', tf, '#c9c0ff'); scribble(1215, 570, 80, 2.8, 'tangleB', ev(flashes[0] + 0.25, 0.9), '#ffb9c9');
  // sticky notes that fall as the nights get short
  [[VW('stress', 'nuits'), 700, 'vite !', PAL.pinkL, 0.5], [VW('stress', 'trop'), 1220, 'dodo ?', PAL.sky, -0.4], [VW('stress', 'courtes'), 1460, '3 h', PAL.yellow, 0.3]].forEach(([t0, x, s, c, r], i) => {
    const u = EZ.i2(ev(t0, 0.9)); if (T < t0) return;
    stickyNote(x + Math.sin(T * 5 + i) * 18, lerp(120, 800, u), 0.7, c, s, r * (1 - u * 0.6) + Math.sin(T * 6 + i) * 0.2, 'fall' + i);
  });
  if (flashing) { cut(boltPts(930, 340, 210), PAL.yellow, { key: 'boltA', sb: 18, shc: 'rgba(255,230,120,0.8)', sy: 0, tear: 0.6 }); fillAll('rgba(255,248,215,0.30)'); }
  captions();
}
