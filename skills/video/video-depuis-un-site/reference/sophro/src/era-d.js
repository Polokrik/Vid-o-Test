
// =====================================================================
//  ERA D (16 – 21.5s) — "Ici, on respire. On relâche. On retrouve son calme."
//  The spark breathes with the paper rings: in on "respire", out on "relâche"; the old storm cloud shrinks and turns white.
// =====================================================================
const D_SPARK = { x: 960, y: 560, r: 215, rays: 8 };
const breathD = (T) => {
  const inh = EZ.io(clamp((T - 16.75) / 1.45)), exh = EZ.io(clamp((T - 18.3) / 1.3));
  let b = inh * (1 - 0.85 * exh);
  if (T > 19.7) b = 0.15 + 0.03 * Math.sin((T - 19.7) * 2.2);
  return b;
};
function sceneD() {
  const T = TT, b = breathD(T), tCalme = VW('breath', 'calme');
  skyBands(['#bfe9dc', '#cdeee3', '#dff3ea'], 0, H, 'skyD');
  const sunK = popS(tCalme - 0.1); if (sunK > 0) sunPaper(1640, 190, 70 * sunK, 'sunD', 12, T * 0.3);
  // the old storm cloud: smaller and whiter as the breath calms
  const u = EZ.io(clamp((T - 17.0) / 3.4)), cs = 1 - 0.45 * u;
  const nR = Math.round(26 * (1 - clamp((T - 16.0) / 2.6)));
  for (let i = 0; i < nR; i++) { const R = RNG('rainD', i), x = 150 + R.f() * 380, y = 330 + mod(R.f() * 360 + T * 520, 360); ink([[x, y], [x - 6, y + 22]], { w: 4, color: 'rgba(120,150,190,0.85)', key: 'rD' + i, amt: 0.2 }); }
  cloud(340, 230, 280 * cs, 105 * cs, mixHex('#53557a', '#ffffff', u), 'cloudD', { crayon: '#7a7fa0' });
  // breathing rings behind the hero
  const cols = ['#d9f0e6', '#b5e2d3', '#f8c3d4', '#f6ecc8'], R0 = 300 * (1 + 0.14 * b);
  for (let i = 3; i >= 0; i--) cut(ellipsePts(D_SPARK.x, D_SPARK.y + 20, R0 + i * 92 * (1 + 0.1 * b), (R0 + i * 92 * (1 + 0.1 * b)) * 0.94, 0, 56), cols[i], { key: 'ringD' + i, sb: 12, sy: 6, tear: 1.6, amt: 1.4, grain: 0.7 });
  // Béatrice at the right, calm, rising from the hill
  beatrice(1640, 900 - b * 10, 1.6, { mood: T > tCalme ? 'happy' : 'smile', key: 'beaD' });
  cut(hillPts(900, 24, 240, 0.9), PAL.green, { key: 'hillD', sy: -6, pat: pat.stripes('rgba(255,255,255,0.12)', 4, 22, 0.3) });
  // drifting paper leaves and petals
  for (let i = 0; i < 10; i++) {
    const x = 120 + i * 190 + Math.sin(T * 0.9 + i) * 50, y = mod(i * 163 + (T - 16) * 55, H + 160) - 80, c = [PAL.green, PAL.pink, PAL.greenD, PAL.yellow, PAL.pinkL][i % 5];
    cut(ellipsePts(x, y, 26, 12, Math.sin(T * 1.5 + i) * 1.2, 12), c, { key: 'leafD' + i, sb: 4, sy: 3, tear: 0.6, grain: 0.5 });
  }
  // the hero, breathing
  const mood = T > tCalme ? 'happy' : 'focus';
  sparkOf(D_SPARK.x, D_SPARK.y, D_SPARK.r * (1 + 0.2 * b), { rays: D_SPARK.rays, mood });
  captions();
}
