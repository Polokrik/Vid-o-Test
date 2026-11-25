
// =====================================================================
//  COMMON — shared helpers for the eras (16:9, 1920x1080). Cut-paper look from styles/cut-paper/kit.js.
// =====================================================================
const SKEY = 'hero';                                   // the spark's key: same blink and bob phase in every era
const bgFull = (color, o = {}) => cut(rect(-30, -30, W + 60, H + 60, 0), color, { key: o.key ?? 'bg', shadow: false, tear: 0, shade: false, pat: o.pat, crayon: o.crayon, crAl: o.crAl, grain: o.grain ?? 0.8 });
// a scalloped cloud outline with a flat belly
function cloudPts(x, y, rx, ry, n = 7, depth = 0.34) {
  const P = [], M = 72;
  for (let i = 0; i < M; i++) {
    const a = i / M * TAU, k = 1 + depth * (Math.abs(Math.sin(n * a / 2)) - 0.55);
    let px = x + Math.cos(a) * rx * k, py = y + Math.sin(a) * ry * k;
    if (py > y + ry * 0.5) py = y + ry * 0.5;
    P.push([px, py]);
  }
  return P;
}
function cloud(x, y, rx, ry, color, key, o = {}) { return cut(cloudPts(x, y, rx, ry, o.n ?? 7, o.depth ?? 0.34), color, { key, crayon: o.crayon, crAl: 0.35, sb: 14, sy: 9, tear: 1.1, ...o.cut }); }
// soft hills / ground bands: a wavy top edge filling to the bottom of the frame
function hillPts(y0, amp, wl, ph, x0 = -40, x1 = W + 40, yb = H + 40) {
  const P = [];
  for (let x = x0; x <= x1; x += 40) P.push([x, y0 + Math.sin(x / wl + ph) * amp + Math.sin(x / (wl * 0.43) + ph * 2.1) * amp * 0.35]);
  P.push([x1, yb], [x0, yb]);
  return P;
}
function sunPaper(x, y, r, key = 'sun', rays = 12, spin = 0) {
  for (let i = 0; i < rays; i++) { const a = spin + i / rays * TAU; cut(capsulePts(x + Math.cos(a) * r * 1.25, y + Math.sin(a) * r * 1.25, x + Math.cos(a) * r * 1.75, y + Math.sin(a) * r * 1.75, r * 0.2), PAL.yellow, { key: key + 'r' + i, sb: 4, sy: 3, tear: 0.6, grain: 0.5 }); }
  cut(ellipsePts(x, y, r, r, 0, 40), PAL.yellow, { key, crayon: '#e6b23a', sb: 10, sy: 6 });
}
function flowerPaper(x, y, s, petal, key, stem = 90) {
  ink([[x, y], [x + 3, y + stem * s]], { w: 6 * s, color: PAL.greenD, key: key + 'st' });
  for (let p = 0; p < 6; p++) { const a = p / 6 * TAU; cut(ellipsePts(x + Math.cos(a) * 22 * s, y + Math.sin(a) * 22 * s, 18 * s, 11 * s, a, 14), petal, { key: key + 'p' + p, sb: 4, sy: 3, tear: 0.6, grain: 0.5 }); }
  cut(ellipsePts(x, y, 11 * s, 11 * s, 0, 14), PAL.yellow, { key: key + 'm', shadow: false, grain: 0.4 });
}
function pine(x, y, s, key, col = PAL.greenD) {   // a fir tree standing on (x, y)
  cut(rect(x - 12 * s, y - 50 * s, 24 * s, 50 * s, 2), PAL.woodD, { key: key + 't', sb: 4, sy: 3 });
  for (let i = 0; i < 3; i++) cut([[x - (110 - i * 26) * s, y - (40 + i * 70) * s], [x, y - (170 + i * 70) * s], [x + (110 - i * 26) * s, y - (40 + i * 70) * s]], i % 2 ? col : PAL.green, { key: key + i, sb: 6, sy: 4, tear: 1.2, grain: 0.7 });
}
function bird(x, y, s, key, flap = 0) {   // two torn wings of a bird in flight
  const f = Math.sin(TT * 9 + key.length) * 0.5 + flap;
  ink([[x - 30 * s, y + 8 * s * f], [x - 14 * s, y - 14 * s * (0.5 + f)], [x, y]], { w: 5 * s, color: PAL.ink, key: key + 'a', amt: 0.4 });
  ink([[x, y], [x + 14 * s, y - 14 * s * (0.5 + f)], [x + 30 * s, y + 8 * s * f]], { w: 5 * s, color: PAL.ink, key: key + 'b', amt: 0.4 });
}
function wavePaper(y0, amp, color, key, ph = 0, o = {}) {   // a strip of sea with a wavy top, drifting on the 2s
  cut(hillPts(y0, amp, o.wl ?? 90, ph + TT * (o.sp ?? 0.8), -40, W + 40, o.yb ?? H + 40), color, { key, tear: 0.8, sy: -5, sb: 8, pat: o.pat, crayon: o.crayon, crAl: 0.25 });
}
function stickyNote(x, y, s, color, str, rot, key) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(rect(-70, -70, 140, 140, 3), color, { key: 'sn' + key, tear: 1.4, sb: 8, sy: 5, shade: true });
  cut(rect(-26, -80, 52, 24, 2), 'rgba(240,230,190,0.7)', { key: 'snt' + key, shadow: false, grain: 0.3, shade: false });
  handText(str, -56, 12, 38, PAL.ink, { key: 'snx' + key });
  ctx.restore();
}
// a hand-lettered caption strip at the bottom, from CAPS (the voice's phrases)
function captions() {
  const f = () => {
    const c = CAPS.find((q) => TT >= q.t0 && TT < q.t1); if (!c) return;
    const k = clamp((TT - c.t0) / Math.max(0.35, c.text.length * 0.032));
    tag(c.text, CX, H - 96, 58, { rot: 0.006, tape: false, frac: k, fill: PAL.paper });
  };
  if (DEFER) DEFER.push(f); else f();
}
// ---- characters
function beatrice(x, y, s, o = {}) {   // the sophrologue: a paper bust, long brown hair, teal top
  const key = o.key ?? 'bea', hair = '#6b4630', skin = PAL.skin1;
  cut(rect(x - 104 * s, y - 196 * s, 208 * s, 270 * s, 90 * s), hair, { key: key + 'hb', sb: 6 });
  person(x, y, s, { key, skin, hair, shirt: o.shirt ?? PAL.teal, mood: o.mood ?? 'smile', shirtPat: pat.stripes('rgba(255,255,255,0.14)', 10, 34) });
}
function sparkOf(x, y, r, o = {}) { hero(x, y, r, { key: SKEY, ...o }); }
// vertical gradient-ish sky panel made of paper bands
function skyBands(cols, y0 = 0, y1 = H, key = 'sky') {
  const n = cols.length, h = (y1 - y0) / n;
  cols.forEach((c, i) => cut(rect(-30, y0 + i * h - 2, W + 60, h + 6, 0), c, { key: key + i, shadow: false, tear: 0, shade: false, grain: 0.7 }));
}
const seq = (t0, i, gap) => t0 + i * gap;   // cue of the i-th item in a run
// a torn white photo print with tape: draws the site's beach photo (assets/plage.jpg) in a paper frame
function photoFrame(x, y, w, h, rot, key, o = {}) {
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot); ctx.scale(o.s ?? 1, o.s ?? 1);
  cut(rect(-w / 2 - 22, -h / 2 - 22, w + 44, h + 70, 4), '#fbf6ea', { key: key + 'f', tear: 1.6, sb: 18, sy: 10 });
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip();
  if (!drawAsset('plage.jpg', -w / 2, -h / 2, w, h, { fit: 'cover' })) { ctx.fillStyle = '#9cc4d6'; ctx.fillRect(-w / 2, -h / 2, w, h); }
  ctx.restore();
  if (o.tape !== false) { cut(rect(-w * 0.32 - 40, -h / 2 - 40, 90, 34, 2), 'rgba(240,230,190,0.8)', { key: key + 'ta', shadow: false, grain: 0.3, shade: false }); cut(rect(w * 0.32 - 50, -h / 2 - 38, 90, 34, 2), 'rgba(240,230,190,0.8)', { key: key + 'tb', shadow: false, grain: 0.3, shade: false }); }
  ctx.restore();
}
// Nantes in paper: the Loire, the Château des ducs, the cathedral's two towers, the Tour LU. pop = 0..1 rise from the river.
function skylineNantes(x0, y0, w, h, pop, key = 'nt') {
  const gy = y0 + h * 0.74, k = EZ.o3(pop), up = (hh) => hh * k;
  const bx = (u) => x0 + u * w;
  // cathedral: two square towers and a nave
  cut(rect(bx(0.08), gy - up(h * 0.5), w * 0.1, up(h * 0.5) + 6, 2), '#b9b3c8', { key: key + 'c1', sb: 5, sy: 3 });
  cut(rect(bx(0.22), gy - up(h * 0.5), w * 0.1, up(h * 0.5) + 6, 2), '#b9b3c8', { key: key + 'c2', sb: 5, sy: 3 });
  cut(rect(bx(0.08), gy - up(h * 0.26), w * 0.24, up(h * 0.26) + 6, 2), '#cdc7da', { key: key + 'c3', sb: 5, sy: 3 });
  // château des ducs: a pale body, round towers, battlements
  cut(rect(bx(0.38), gy - up(h * 0.2), w * 0.34, up(h * 0.2) + 6, 2), '#f1e6c8', { key: key + 'k1', sb: 5, sy: 3 });
  [0.38, 0.72].forEach((u, i) => cut(rect(bx(u) - w * 0.04, gy - up(h * 0.3), w * 0.08, up(h * 0.3) + 6, w * 0.03), '#ece0bd', { key: key + 'kt' + i, sb: 5, sy: 3 }));
  for (let i = 0; i < 6; i++) cut(rect(bx(0.4 + i * 0.055), gy - up(h * 0.2) - 10, w * 0.03, 12, 1), '#f1e6c8', { key: key + 'bt' + i, shadow: false, grain: 0.3 });
  // Tour LU: slender, brick, a lantern on top
  cut(rect(bx(0.84), gy - up(h * 0.66), w * 0.07, up(h * 0.66) + 6, 2), PAL.brick, { key: key + 'lu', sb: 5, sy: 3 });
  cut([[bx(0.835), gy - up(h * 0.66)], [bx(0.875), gy - up(h * 0.8)], [bx(0.915), gy - up(h * 0.66)]], '#a8665a', { key: key + 'lu2', sb: 4, sy: 3 });
  // the Loire
  cut(rect(x0 - 10, gy, w + 20, h * 0.28, 0), '#7fbfd0', { key: key + 'riv', shadow: false, tear: 0.8, pat: pat.stripes('rgba(255,255,255,0.28)', 3, 14, 0) });
}
