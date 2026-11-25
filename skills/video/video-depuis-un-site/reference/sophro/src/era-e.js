
// =====================================================================
//  ERA E (21.5 – 29.5s) — "Sophrologie, lectures des Archives Akashiques, thème minéral de naissance, balades en forêt, élixirs floraux."
//  Five paper cards hang from a twine; each swings in on its word, the camera follows, the spark hops from card to card.
// =====================================================================
const E_CARDX = [250, 605, 960, 1315, 1670], E_CARDY = 480;
const E_T = () => [VW('services', 'sophrologie'), VW('services', 'archives'), VW('services', 'theme'), VW('services', 'balades'), VW('services', 'elixirs')];
const E_SPARK = { x: 960, y: 885, r: 100, rays: 9 };
const eSparkX = () => { const t = E_T(); return springTrack([[21.5, 960], ...t.map((q, i) => [q + 0.05, E_CARDX[i]]), [28.95, 960]], SPRING.smooth); };

function eCard(i, color, label, draw) {
  const t0 = E_T()[i] - 0.12, k = popS(t0); if (k <= 0) return;
  const sway = Math.sin(TT * 1.3 + i * 1.7) * 0.025 * (1 + 2.5 * Math.exp(-(TT - t0) * 2.2));
  ctx.save(); ctx.translate(E_CARDX[i], 168); ctx.rotate(sway + (i % 2 ? 0.015 : -0.015)); ctx.translate(0, E_CARDY - 168); ctx.scale(k, k);
  cut(rect(-168, -292, 336, 580, 6), color, { key: 'eCard' + i, tear: 1.7, sb: 18, sy: 10, grain: 0.9 });
  ctx.save(); ctx.beginPath(); ctx.rect(-138, -262, 276, 372, 3); ctx.clip();
  ctx.fillStyle = '#fbf6ea'; ctx.fillRect(-140, -264, 280, 376);
  draw();
  ctx.restore();
  ink(rect(-138, -262, 276, 372, 3), { closed: true, w: 3, color: 'rgba(60,40,30,0.5)', key: 'eFr' + i, amt: 0.8 });
  tag(label, 0, 204, label.length > 14 ? 33 : 38, { rot: i % 2 ? 0.02 : -0.02, fill: PAL.paper, tape: false });
  ctx.restore();
  // a wooden clothespin on the twine
  cut(rect(E_CARDX[i] - 12, 150, 24, 52, 3), PAL.woodL, { key: 'pin' + i, sb: 4, sy: 3, grain: 0.4 });
}
function eIllus0() {   // sophrologie: breathing rings and a calm face
  const b = 0.5 + 0.5 * Math.sin(TT * 2.2);
  [['#d9f0e6', 124], ['#b5e2d3', 92], ['#f8c3d4', 62]].forEach(([c, r], j) => cut(ellipsePts(0, -40, r * (1 + 0.08 * b), r * (1 + 0.08 * b), 0, 40), c, { key: 'eR' + j, sb: 8, sy: 4, tear: 1.2 }));
  person(0, 74, 0.5, { key: 'eP0', skin: PAL.skin2, hair: '#2b211d', shirt: PAL.teal, mood: 'focus' });
}
function eIllus1() {   // archives akashiques: a night of stars over an open book
  ctx.fillStyle = '#3b3470'; ctx.fillRect(-140, -264, 280, 376);
  const R = RNG('eStars'); for (let i = 0; i < 22; i++) sparkle(R.r(-130, 130), R.r(-250, 20), R.r(3, 8) * (0.55 + 0.45 * ((B + i) % 2)), '#fff3c2');
  cut([[-124, 52], [-6, 74], [-6, 124], [-124, 100]], '#fff8e4', { key: 'eBkL', shadow: false, pat: pat.lines('rgba(90,70,60,0.35)', 12, 8) });
  cut([[6, 74], [124, 52], [124, 100], [6, 124]], '#fff8e4', { key: 'eBkR', shadow: false, pat: pat.lines('rgba(90,70,60,0.35)', 12, 8) });
  for (let i = 0; i < 9; i++) { const u = mod(TT * 0.45 + i / 9, 1), a = u * 7 + i, rr = 20 + u * 70; sparkle(Math.cos(a) * rr, 60 - u * 260, (1 - u) * 14 + 3, i % 2 ? '#fff3c2' : '#f3a3bf'); }
}
function eIllus2() {   // thème minéral de naissance: crystals and a moon
  cut(ellipsePts(-84, -190, 30, 30, 0, 24), '#f6ecc8', { key: 'eMoon', sb: 6, sy: 3 }); cut(ellipsePts(-72, -198, 28, 28, 0, 24), '#fbf6ea', { key: 'eMoonB', shadow: false, grain: false, shade: false });
  sparkle(70, -180, 14, PAL.yellow);
  const crys = (x, y, s, c, light, key) => { cut([[x - 40 * s, y + 100 * s], [x - 52 * s, y - 10 * s], [x - 20 * s, y - 90 * s], [x + 20 * s, y - 90 * s], [x + 52 * s, y - 10 * s], [x + 40 * s, y + 100 * s]], c, { key, sb: 8, sy: 5, tear: 1.0 }); ink([[x - 20 * s, y - 90 * s], [x - 8 * s, y + 100 * s]], { w: 3, color: light, key: key + 'a', amt: 0.4 }); ink([[x + 20 * s, y - 90 * s], [x + 12 * s, y + 100 * s]], { w: 3, color: light, key: key + 'b', amt: 0.4 }); ink([[x - 52 * s, y - 10 * s], [x + 52 * s, y - 10 * s]], { w: 3, color: light, key: key + 'c', amt: 0.4 }); };
  crys(-88, 24, 0.62, PAL.pink, '#fbd9e6', 'eC1'); crys(92, 34, 0.55, PAL.yellow, '#fdeaa0', 'eC3'); crys(0, 0, 0.95, PAL.purple, '#c4b8f0', 'eC2');
  sparkle(-30, -40 + Math.sin(TT * 3) * 4, 10, '#fff');
}
function eIllus3() {   // balades en forêt: a path between firs
  ctx.fillStyle = '#d6efe0'; ctx.fillRect(-140, -264, 280, 376);
  sunPaper(80, -190, 26, 'eSunF', 10, TT * 0.3);
  cut(hillPts(-20, 14, 70, 0.3, -150, 150, 130), '#8cc58a', { key: 'eHillF1', shadow: false });
  pine(-86, 24, 0.5, 'eFir1'); pine(92, 14, 0.42, 'eFir2'); pine(-20, -6, 0.34, 'eFir3', PAL.green);
  cut([[-30, 112], [-8, 64], [34, 20], [66, -4], [52, -6], [14, 26], [-30, 60], [-70, 112]], '#f1e0b4', { key: 'ePath', shadow: false, tear: 1.0 });
  cut(ellipsePts(-98, 84, 26, 18, 0, 20, Math.PI, TAU), PAL.red ?? '#d4382c', { key: 'eMush', sb: 4, sy: 3 }); cut(rect(-104, 84, 12, 24, 3), PAL.paper, { key: 'eMushS', shadow: false });
  dot(-108, 76, 4, '#fff'); dot(-88, 72, 3.4, '#fff');
}
function eIllus4() {   // élixirs floraux: a dropper bottle and flowers
  ctx.fillStyle = '#fdeedd'; ctx.fillRect(-140, -264, 280, 376);
  flowerPaper(-92, 58, 1.0, PAL.pink, 'eFl1', 40); flowerPaper(98, 64, 0.9, PAL.purple, 'eFl2', 40); flowerPaper(0, 70, 0.8, '#ffffff', 'eFl3', 30);
  cut(rect(-52, -26, 104, 130, 22), '#9fd0e6', { key: 'eBot', sb: 8, sy: 5 }); cut(rect(-52, 22, 104, 82, 20), '#7fb9d6', { key: 'eBot2', shadow: false });
  cut(rect(-22, -60, 44, 40, 4), '#9fd0e6', { key: 'eNeck', sb: 6, sy: 3 });
  cut(rect(-26, -88, 52, 34, 4), PAL.woodL, { key: 'eCork', sb: 4, sy: 3 });
  cut(ellipsePts(0, -160, 28, 50, 0, 24), PAL.pink, { key: 'eBulb', sb: 6, sy: 4 }); cut(rect(-10, -118, 20, 36, 3), '#fbf6ea', { key: 'ePip', shadow: false });
  const u = mod(TT * 0.9, 1); cut(ellipsePts(0, -60 + u * 120, 9 * (1 - u * 0.4), 14 * (1 - u * 0.4), 0, 14), '#bfe3f2', { key: 'eDrop', shadow: false, grain: 0.3 });
}
function sceneE() {
  const T = TT, tt = E_T();
  cut(rect(-1500, -30, W + 3000, H + 60, 0), '#e9d3a8', { key: 'wallE', shadow: false, tear: 0, shade: false, pat: pat.dots('rgba(150,100,50,0.14)', 4, 64), crayon: '#d4b985', crAl: 0.2 });
  // the twine
  const tw = []; for (let x = -1500; x <= W + 1500; x += 60) tw.push([x, 160 + Math.sin(x / 300) * 12]);
  ink(tw, { w: 5, color: '#8a6a3a', key: 'twine', amt: 0.6 });
  eCard(0, PAL.mint, 'Sophrologie', eIllus0); eCard(1, PAL.purple, 'Archives Akashiques', eIllus1); eCard(2, PAL.pinkL, 'Thème minéral', eIllus2); eCard(3, PAL.green, 'Balades en forêt', eIllus3); eCard(4, PAL.yellow, 'Élixirs floraux', eIllus4);
  // table, butterflies, the hopping spark
  cut(rect(-1500, 810, W + 3000, 400, 0), PAL.wood, { key: 'tableE', tear: 0, pat: pat.grainWood('rgba(120,60,20,0.18)'), sy: -7, sb: 14 });
  [[0, 1], [1, 2]].forEach(([i, sd]) => { const x = 700 + i * 560 + Math.sin(T * 0.8 + i) * 120, y = 780 + Math.sin(T * 1.3 + i * 2) * 30 + (i ? -260 : 0), f = 0.4 + 0.6 * Math.abs(Math.sin(T * 7 + i)); [-1, 1].forEach((sg) => cut(ellipsePts(x + sg * 16 * f, y, 18 * f + 4, 12, sg * 0.5, 14), i ? PAL.pink : PAL.purple, { key: 'bfE' + i + sg, sb: 4, sy: 2, tear: 0.5, grain: 0.4 })); });
  const idx = tt.filter((q) => T >= q - 0.1).length - 1, near = idx >= 0 && T < tt[idx] + 0.8;
  const hop = idx >= 0 ? Math.abs(Math.sin((T - tt[idx]) * 5)) * 38 * Math.exp(-(T - tt[idx]) * 1.5) : 0;
  const mood = T > 28.6 ? 'happy' : near ? 'wow' : 'smile';
  sparkOf(eSparkX(), E_SPARK.y - hop, E_SPARK.r * (0.85 + 0.15 * popS(21.55)), { rays: E_SPARK.rays, mood });
  // light chimes of sparkle where each card lands
  tt.forEach((q, i) => { const u = ev(q, 0.5); if (u > 0 && u < 1) for (let j = 0; j < 5; j++) { const a = j / 5 * TAU + i; sparkle(E_CARDX[i] + Math.cos(a) * (60 + u * 160), E_CARDY - 120 + Math.sin(a) * (40 + u * 120), 14 * Math.sin(u * Math.PI), '#fff8dc'); } });
}
