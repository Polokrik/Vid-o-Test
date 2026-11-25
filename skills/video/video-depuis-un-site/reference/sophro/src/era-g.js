
// =====================================================================
//  ERA G (35.5 – 39s) — "Envie d'un premier échange ? Prenez rendez-vous."
//  A phone rings, a letter hops in, and a calendar page gets its date circled. Béatrice smiles; the spark is thrilled.
// =====================================================================
const G_CAL = { x: 210, y: 180, w: 560, h: 580, rot: -0.04 };
const calPts = () => rot(rect(G_CAL.x, G_CAL.y, G_CAL.w, G_CAL.h, 8), G_CAL.x + G_CAL.w / 2, G_CAL.y + G_CAL.h / 2, G_CAL.rot);
function phonePaper(x, y, s, ringing, key = 'ph') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ringing ? Math.sin(TT * 38) * 0.06 : 0); ctx.scale(s, s);
  cut(rect(-80, -140, 160, 280, 26), '#2f6f73', { key: key + 'b', sb: 14, sy: 9 });
  cut(rect(-64, -112, 128, 180, 8), '#fbf6ea', { key: key + 's', shadow: false, grain: 0.4 });
  ink(arcPts(0, -30, 26, Math.PI * 0.15, Math.PI * 0.85, 10), { w: 7, color: PAL.ink, key: key + 'h', amt: 0.4 });
  cut(ellipsePts(0, 102, 26, 26, 0, 20), PAL.green, { key: key + 'c', sb: 5, sy: 3 });
  if (ringing) for (let i = 0; i < 3; i++) { const u = mod(TT * 2.2 + i / 3, 1); ink(arcPts(-88, -118, 34 + u * 70, Math.PI * 1.05, Math.PI * 1.55, 10), { w: 6 * (1 - u), color: PAL.orangeD, key: key + 'r' + i, amt: 0.5 }); ink(arcPts(88, -118, 34 + u * 70, Math.PI * 1.45, Math.PI * 1.95, 10), { w: 6 * (1 - u), color: PAL.orangeD, key: key + 'q' + i, amt: 0.5 }); }
  ctx.restore();
}
function envelopePaper(x, y, s, key = 'en') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(rect(-120, -80, 240, 160, 6), '#fbf6ea', { key: key + 'b', sb: 12, sy: 7 });
  cut([[-120, -80], [0, 20], [120, -80]], PAL.pinkL, { key: key + 'f', sb: 6, sy: 4, tear: 0.8 });
  cut(ellipsePts(0, 14, 18, 18, 0, 16), '#d4382c', { key: key + 'h', sb: 4, sy: 3 });
  ctx.restore();
}
function calendarPaper(popk, circleFrac) {
  const c = [G_CAL.x + G_CAL.w / 2, G_CAL.y + G_CAL.h / 2];
  ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(G_CAL.rot); ctx.scale(popk, popk); ctx.translate(-c[0], -c[1]);
  cut(rect(G_CAL.x, G_CAL.y, G_CAL.w, G_CAL.h, 8), '#fbf6ea', { key: 'calB', tear: 1.6, sb: 20, sy: 12 });
  cut(rect(G_CAL.x, G_CAL.y, G_CAL.w, 120, 8), '#e0594a', { key: 'calH', shadow: false });
  handText('Rendez-vous', G_CAL.x + 40, G_CAL.y + 82, 66, '#fff8ee', { key: 'calT' });
  for (let r = 0; r < 5; r++) for (let q = 0; q < 7; q++) { const n = r * 7 + q + 1; if (n > 31) continue; handText(String(n), G_CAL.x + 36 + q * 74 + (n < 10 ? 10 : 0), G_CAL.y + 190 + r * 76, 38, PAL.ink, { key: 'cd' + n }); }
  // the circled date, in red crayon
  const cx = G_CAL.x + 36 + 3 * 74 + 26, cy = G_CAL.y + 190 + 2 * 76 - 12;
  if (circleFrac > 0) ink([...arcPts(cx, cy, 44, -2.4, 4.2, 28, 0.82)], { w: 7, color: '#d4382c', key: 'calC', frac: circleFrac, amt: 1.2 });
  ctx.restore();
}
function sceneG() {
  const T = TT, tEnvie = VW('rdv', 'envie'), tEch = VW('rdv', 'echange'), tPrenez = VW('rdv', 'prenez'), tRdv = VW('rdv', 'rendez');
  bgFull('#f6e2a8', { key: 'wallG', pat: pat.dots('rgba(180,120,40,0.14)', 5, 70), crayon: '#e9cc83', crAl: 0.2 });
  cut(rect(-30, 900, W + 60, 300, 0), PAL.wood, { key: 'tableG', tear: 0, pat: pat.grainWood('rgba(120,60,20,0.18)'), sy: -6 });
  clock(330, 300, 105, 10, 10, 'clockG'); plant(330, 920, 1.4, PAL.blue, 'plantG'); cat(700, 960, 0.9, PAL.charcoal, 'catG');
  beatrice(1560, 930, 1.9, { mood: 'happy', key: 'beaG' });
  const kP = popS(tEnvie - 0.05); if (kP > 0) { ctx.save(); ctx.translate(1040, 420); ctx.scale(kP, kP); ctx.translate(-1040, -420); phonePaper(1040, 420, 1.15, T < tEch + 0.9, 'phG'); ctx.restore(); }
  const kE = popS(tEch - 0.05); if (kE > 0) { const hop = Math.abs(Math.sin((T - tEch) * 5)) * 50 * Math.exp(-(T - tEch) * 1.6); ctx.save(); ctx.translate(1290, 300 - hop); ctx.scale(kE, kE); envelopePaper(0, 0, 1.0, 'enG'); ctx.restore(); }
  const kC = popS(tRdv - 0.08); if (kC > 0) calendarPaper(kC, ev(tRdv + 0.0, 0.45));
  sparkOf(1000, 760, 165 * (0.9 + 0.1 * popS(35.55)), { rays: 11, mood: T > tPrenez ? 'happy' : 'wow' });
  captions();
}
