
// =====================================================================
//  ERA C (11.5 – 16s) — "Je m'appelle Béatrice. Je suis sophrologue, à Nantes."
//  Her cabinet: mint wall, a shelf with stones and a vial, a window onto Nantes. The spark, happy, beside her.
// =====================================================================
const C_SPARK = { x: 400, y: 770, r: 160, rays: 7 };
function sceneC() {
  const T = TT, tName = VW('intro', 'Beatrice'), tSoph = VW('intro', 'sophrologue'), tNantes = VW('intro', 'Nantes');
  bgFull('#a9d9c6', { key: 'wallC', pat: pat.stripes('rgba(255,255,255,0.20)', 34, 96), crayon: '#8fc5b0', crAl: 0.2 });
  // window onto Nantes: the skyline rises when she says "Nantes"
  cut(rect(1290, 130, 520, 500, 8), PAL.woodD, { key: 'winC' });
  cut(rect(1316, 156, 468, 448, 2), '#cfe7f2', { key: 'glassC', shadow: false, grain: 0.5 });
  ctx.save(); ctx.beginPath(); ctx.rect(1316, 156, 468, 448); ctx.clip();
  sunPaper(1700, 240, 38, 'sunC', 10, T * 0.3); cloud(1480 + Math.sin(T * 0.7) * 24, 250, 90, 34, '#ffffff', 'cloudC', { depth: 0.3 });
  skylineNantes(1316, 156, 468, 448, ev(tNantes - 0.1, 0.7), 'ntC');
  ctx.restore();
  ink([[1550, 156], [1550, 604]], { w: 8, color: PAL.woodD, key: 'wmC' });
  cut(rect(1270, 620, 560, 30, 4), PAL.wood, { key: 'sillC' });
  if (T > tNantes) for (let i = 0; i < 4; i++) { const u = ev(tNantes + i * 0.12, 0.3); if (u > 0 && u < 1) sparkle(1380 + i * 120, 180 + (i % 2) * 40 - u * 30, 16 * Math.sin(u * Math.PI), '#fff8dc'); }
  // the shelf: stones, a vial, a candle, a plant
  cut(rect(90, 330, 560, 26, 4), PAL.wood, { key: 'shelfC' });
  [[170, PAL.purple], [260, PAL.pink], [350, PAL.yellow]].forEach(([x, c], i) => cut([[x - 36, 326], [x - 24, 276 - i * 6], [x + 6, 252 - i * 8], [x + 38, 286], [x + 40, 326]], c, { key: 'stoneC' + i, sb: 5, sy: 3, tear: 1.2 }));
  cut(rect(450, 262, 54, 64, 10), '#cfe7f2', { key: 'vialC', sb: 5, sy: 3 }); cut(rect(466, 236, 22, 28, 3), PAL.woodL, { key: 'corkC', shadow: false });
  cut(rect(560, 270, 46, 56, 4), PAL.paper, { key: 'candleC', sb: 5, sy: 3 }); cut(ellipsePts(583, 252 + Math.sin(T * 9) * 2, 9, 16, 0, 12), PAL.yellow, { key: 'flameC', shadow: false, grain: 0.3 });
  plant(1180, 950, 1.5, PAL.blue, 'plantC');
  photoFrame(150, 430, 300, 190, -0.05, 'phC', { s: 0.9 });
  // floor
  cut(rect(-30, 960, W + 60, 200, 0), PAL.wood, { key: 'floorC', tear: 0, pat: pat.grainWood('rgba(120,60,20,0.18)'), sy: -6 });
  // Béatrice, a hello; the spark beside her
  const bob = Math.sin(T * 1.6) * 5;
  beatrice(900, 800 + bob, 2.1, { mood: T > tName - 0.1 ? 'happy' : 'smile', key: 'beaC' });
  sparkOf(C_SPARK.x, C_SPARK.y, C_SPARK.r * (0.85 + 0.15 * popS(11.55)), { rays: C_SPARK.rays, mood: T > tNantes ? 'happy' : 'smile' });
  // her name on a taped tag, popped as she says it
  tag('Béatrice', 900, 160, 96, { rot: -0.03, s: popS(tName - 0.1), fill: PAL.paper });
  tag('sophrologue', 1540, 760, 66, { rot: 0.025, s: popS(tSoph - 0.1), fill: PAL.pinkL });
  captions();
}
