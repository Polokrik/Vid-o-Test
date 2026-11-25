
// =====================================================================
//  ERA H (39 – 49.5s) — the number, the site, the beach, the calm spark. No captions: the tags are the text.
// =====================================================================
const H_PHOTO = { x: 130, y: 175, w: 960, h: 590, rot: -0.03 };
const photoPts = () => rot(rect(H_PHOTO.x - 22, H_PHOTO.y - 22, H_PHOTO.w + 44, H_PHOTO.h + 70, 4), H_PHOTO.x + H_PHOTO.w / 2, H_PHOTO.y + H_PHOTO.h / 2, H_PHOTO.rot);
function sailboat(x, y, s, key) {
  cut([[x - 90 * s, y - 20 * s], [x + 90 * s, y - 20 * s], [x + 60 * s, y + 30 * s], [x - 60 * s, y + 30 * s]], PAL.teal, { key: key + 'h', sb: 8, sy: 5 });
  cut([[x - 6 * s, y - 24 * s], [x - 6 * s, y - 160 * s], [x - 80 * s, y - 24 * s]], '#fbf6ea', { key: key + 's1', sb: 6, sy: 3 });
  cut([[x + 6 * s, y - 24 * s], [x + 6 * s, y - 120 * s], [x + 70 * s, y - 24 * s]], PAL.pinkL, { key: key + 's2', sb: 6, sy: 3 });
}
function sceneH() {
  const T = TT, V = VL('contact'), wd = (i) => V.words[i].t0;
  skyBands(['#bfe0ef', '#cfe7f2', '#dcedf3'], 0, 700, 'skyH');
  sunPaper(1170, 115, 50, 'sunH', 12, T * 0.25);
  [[1450, 640, 90, 34]].forEach(([x, y, rx, ry], i) => cloud(x + Math.sin(T * 0.5 + i) * 30, y, rx, ry, '#ffffff', 'cloudH' + i, { depth: 0.3 }));
  wavePaper(840, 14, '#7fbfd0', 'waveH1', 0.2, { wl: 110, sp: 0.5 });
  sailboat(1700 + Math.sin(T * 0.4) * 30, 968, 0.8, 'boatH');
  wavePaper(930, 16, '#4a9aa8', 'waveH2', 1.4, { wl: 90, sp: 0.8 });
  wavePaper(1010, 12, '#3f8f98', 'waveH3', 2.6, { wl: 80, sp: 1.0 });
  bird(1250 + Math.sin(T * 0.7) * 50, 480, 1.0, 'birdH1'); bird(1380 + Math.sin(T * 0.7 + 1) * 40, 440, 0.8, 'birdH2');
  // the photo from her site, taped on
  photoFrame(H_PHOTO.x, H_PHOTO.y, H_PHOTO.w, H_PHOTO.h, H_PHOTO.rot, 'phH', { s: 1 });
  // name, then the number written digit group by digit group, then the site
  tag('Béatrice Magdelaine', 1500, 190, 72, { rot: -0.02, s: popS(39.3), fill: PAL.paper });
  tag('sophrologue à Nantes', 1500, 292, 46, { rot: 0.015, s: popS(39.5), fill: PAL.pinkL, tape: false });
  cut(rect(1110, 380, 740, 150, 6), PAL.paper, { key: 'numH', tear: 1.8, sb: 16, sy: 9 });
  const groups = [['06', wd(0)], ['75', wd(2)], ['70', wd(3)], ['05', wd(4)], ['94', wd(6)]];
  let x = 1150; groups.forEach(([g, t], i) => { const w = handText(g, x, 492, 96, PAL.ink, { key: 'numg' + i, frac: ev(t, 0.55) }); x += w + 26; });
  cut(rect(1200, 590, 600, 112, 6), PAL.mint, { key: 'urlH', tear: 1.8, sb: 14, sy: 8 });
  handText('sophro-nantes.fr', 1228, 672, 74, PAL.ink, { key: 'urlt', frac: ev(wd(9), 1.5) });
  if (T > 46.5) { cut(rect(1100, 724, 760, 70, 5), PAL.paper, { key: 'mailB', tear: 1.4, sb: 10, sy: 6 }); handText('beatrice.magdelaine@sophro-nantes.fr', 1124, 772, 40, PAL.ink, { key: 'mailH', frac: ev(46.6, 1.2) }); }
  tag('Prenez du temps pour vous', 610, 100, 62, { rot: -0.02, s: popS(47.6), fill: PAL.paper });
  // the calm spark, on the sand at the bottom-left
  sparkOf(170, 860, 165 * (0.9 + 0.1 * popS(39.1)), { rays: 12, mood: 'happy' });
  for (let i = 0; i < 6; i++) { const u = mod(T * 0.35 + i / 6, 1); sparkle(170 + Math.cos(i * 2.1) * (210 + u * 70), 860 + Math.sin(i * 2.1) * (210 + u * 50), 12 * Math.sin(u * Math.PI), '#fff8dc'); }
}
