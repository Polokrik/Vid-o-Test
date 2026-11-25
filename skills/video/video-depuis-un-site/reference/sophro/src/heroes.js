
// =====================================================================
//  HEROES — logo-free mascots for the cut-paper style (kit/core.js + styles/cut-paper/kit.js).
//  Same interface as the kit's spark(): hero(x, y, r, { mood, s, key, color }) with moods smile | happy | wow | sad | focus.
//  NEVER use the kit's spark() / SP() as a hero: an orange starburst reads as the Claude logo.
//
//  To swap the hero of a piece built from reference/sophro:
//    1. add this file to piece.json "scenes" right after src/common.js
//    2. in common.js:  function sparkOf(x, y, r, o = {}) { hero(x, y, r, { key: SKEY, ...o }); }
//    3. in bridges.js use HP(x, y, r) instead of SP(x, y, r, rays):  { A: () => HP(...), B: () => HP(...) }
//       (HP is a plain { P, c } shape, so the morph blends the pebble outline: no spark involved)
//  Pick a hero that fits the client: pebble (calm, wellness), puff (air, breath, lightness), more can be added the same way.
// =====================================================================
const HERO_COLORS = { teal: '#5bb3b0', lilac: '#a99ae0', rose: '#f09ab0', sand: '#e8c58a', sky: '#7fb6e0' };
const heroBob = (y, r, key) => y + Math.sin(TT * TAU * 0.9 + key.length * 1.7) * r * 0.03;
const heroMood = (mood, key) => (mood !== 'happy' && mood !== 'focus' && (B + Math.round(key.length * 1.7 * 5)) % 37 < 2 ? 'focus' : mood);
const pebblePts = (x, y, r) => ellipsePts(x, y, r * 0.9, r * 0.78, -0.08, 48);
const HP = (x, y, r, c = HERO_COLORS.teal) => ({ P: pebblePts(x, y, r), c });

// a smooth little pebble with stubby feet, a highlight and a face: calm, solid, friendly
function pebble(x, y, r, o = {}) {
  const sc = o.s ?? 1; if (sc <= 0.01) return; r *= sc;
  const key = o.key ?? 'peb', col = o.color ?? HERO_COLORS.teal, dark = o.dark ?? 'rgba(30,60,70,0.35)';
  y = heroBob(y, r, key);
  const sq = 1 + Math.sin(TT * TAU * 0.45 + key.length) * 0.015;
  [-1, 1].forEach((sg, i) => cut(ellipsePts(x + sg * r * 0.36, y + r * 0.74, r * 0.2, r * 0.1, 0, 14), col, { key: key + 'f' + i, sb: 4, sy: 3, tear: 0.5, grain: 0.5, crayon: dark }));
  cut(ellipsePts(x, y, r * 0.9 * sq, r * 0.78 / sq, -0.08, 48), col, { key: key + 'b', crayon: dark, crAl: 0.3, crPer: 34, sb: 12, sy: 8, tear: 1.0 });
  cut(ellipsePts(x - r * 0.38, y - r * 0.36, r * 0.2, r * 0.1, -0.6, 16), 'rgba(255,255,255,0.35)', { key: key + 'h', shadow: false, grain: false, shade: false, tear: 0.4 });
  const SPARK_PHASE = 0; SPARK_AT = toScreen(x, y);
  face(x, y + r * 0.02, r / 64 * 1.15, heroMood(o.mood ?? 'smile', key));
}

// a dandelion puff: a fluffy white ball of tufts with a face, drifting in the air
function puff(x, y, r, o = {}) {
  const sc = o.s ?? 1; if (sc <= 0.01) return; r *= sc;
  const key = o.key ?? 'puf'; y = heroBob(y, r, key) + Math.sin(TT * 1.1) * r * 0.04;
  const R = RNG('puff', key), n = 18;
  for (let i = 0; i < n; i++) { const a = i / n * TAU + Math.sin(TT * 0.8 + i) * 0.05, L = r * (0.78 + R.f() * 0.2); cut(ellipsePts(x + Math.cos(a) * L * 0.72, y + Math.sin(a) * L * 0.7, r * 0.2, r * 0.13, a, 12), '#fbf6ea', { key: key + 't' + i, sb: 5, sy: 3, tear: 0.5, grain: 0.4 }); }
  cut(ellipsePts(x, y, r * 0.72, r * 0.7, 0, 36), '#fff8ee', { key: key + 'b', crayon: '#e8dcc6', crAl: 0.3, sb: 10, sy: 6, tear: 0.8 });
  SPARK_AT = toScreen(x, y);
  face(x, y + r * 0.02, r / 64 * 1.05, heroMood(o.mood ?? 'smile', key));
}
const hero = (x, y, r, o = {}) => (o.kind === 'puff' ? puff : pebble)(x, y, r, o);
