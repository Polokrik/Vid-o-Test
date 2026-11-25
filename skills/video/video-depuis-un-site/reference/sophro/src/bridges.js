
// =====================================================================
//  ERAS, CAMERAS, BRIDGES — read by kit/morph.js
// =====================================================================
const ERA_BG = ['#2f3a66', '#cfe7f2', '#a9d9c6', '#a9d9c6', '#e9d3a8', '#f3a3bf', '#f6e2a8', '#cfe7f2'];
function pieceCam(era, t) {
  if (era === 4) { const tt = E_T(), keys = [[21.5, 960], ...tt.map((q, i) => [q - 0.05, E_CARDX[i]]), [28.95, 960]]; const x = springTrack(keys, SPRING.smooth), z = springTrack([[21.5, 1], [tt[0] - 0.1, 1.25], [28.9, 1.0]], SPRING.smooth); return camOf({ z, p: [x, 585], to: [960, 540] }); }
  if (era === 0) return push(t, 5.8, 6.5, { z: 2.6, p: [960, 640], to: [960, 540] }, 7.0, 7.55);
  return null;
}
const BRIDGES = [
  { tc: 8.0, d: 0.4, A: () => ({ P: stormPtsA(), c: '#53557a' }), B: () => ({ P: cloudPtsB(), c: '#ffffff' }) },   // the storm cloud turns white
  { tc: 16.0, d: 0.4, A: () => HP(C_SPARK.x, C_SPARK.y, C_SPARK.r), B: () => HP(D_SPARK.x, D_SPARK.y, D_SPARK.r) },   // the spark carries over
  { tc: 21.5, d: 0.4, A: () => HP(D_SPARK.x, D_SPARK.y, D_SPARK.r), B: () => HP(E_SPARK.x, E_SPARK.y, E_SPARK.r) },   // the spark carries over
  { tc: 39.0, d: 0.4, A: () => ({ P: calPts(), c: '#fbf6ea' }), B: () => ({ P: photoPts(), c: '#fbf6ea' }) },   // the calendar page becomes the photo
];
