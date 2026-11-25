/* infographie-brute · kit JS  (dépend de GSAP et de vendor/om.js ; tout est déterministe) */
(function () {
  const C = () => getComputedStyle(document.documentElement).getPropertyValue('--cream').trim() || '#ede3c4';
  const R = () => getComputedStyle(document.documentElement).getPropertyValue('--red').trim() || '#b3171e';
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  // Pictogrammes plats, sans visage. Boîte 100×100.
  const ICONS = {
    person: (c) => `<circle cx="50" cy="20" r="14" fill="${c}"/><path d="M22 96V52q0-14 14-14h28q14 0 14 14v44h-14V64h-4v32H40V64h-4v32z" fill="${c}"/>`,
    'person-dollar': (c, bg) => `<circle cx="50" cy="20" r="14" fill="${c}"/><path d="M20 98V52q0-14 14-14h32q14 0 14 14v46z" fill="${c}"/><text x="50" y="82" font-family="Anton, Impact, sans-serif" font-size="40" text-anchor="middle" fill="${bg}">$</text>`,
    folder: (c, bg) => `<path d="M8 22h30l8 10h46v52H8z" fill="${c}"/><path d="M8 38h84" stroke="${bg}" stroke-width="3"/>`,
    stack: (c, bg) => [0, 1, 2, 3].map((i) => `<rect x="${14 + i * 3}" y="${70 - i * 17}" width="72" height="14" fill="${c}" stroke="${bg}" stroke-width="2"/>`).join(''),
    building: (c, bg) => `<path d="M10 30L50 8l40 22z" fill="${c}"/><g fill="${c}"><rect x="16" y="36" width="12" height="46"/><rect x="38" y="36" width="12" height="46"/><rect x="60" y="36" width="12" height="46"/><rect x="82" y="36" width="8" height="46"/></g><rect x="8" y="84" width="84" height="10" fill="${c}"/>`,
    robot: (c, bg) => `<rect x="30" y="22" width="40" height="30" rx="4" fill="${c}"/><circle cx="41" cy="36" r="5" fill="${bg}"/><circle cx="59" cy="36" r="5" fill="${bg}"/><rect x="48" y="10" width="4" height="12" fill="${c}"/><circle cx="50" cy="9" r="4" fill="${c}"/><rect x="24" y="56" width="52" height="38" rx="4" fill="${c}"/><rect x="10" y="58" width="12" height="30" fill="${c}"/><rect x="78" y="58" width="12" height="30" fill="${c}"/>`,
    globe: (c, bg) => `<circle cx="50" cy="50" r="40" fill="none" stroke="${c}" stroke-width="6"/><ellipse cx="50" cy="50" rx="17" ry="40" fill="none" stroke="${c}" stroke-width="4"/><path d="M10 50h80M16 30h68M16 70h68" stroke="${c}" stroke-width="4"/>`,
    bars: (c) => `<path d="M10 92H92" stroke="${c}" stroke-width="5"/><rect x="16" y="56" width="14" height="34" fill="${c}"/><rect x="38" y="36" width="14" height="54" fill="${c}"/><rect x="60" y="48" width="14" height="42" fill="${c}"/><rect x="80" y="18" width="12" height="72" fill="${c}"/>`,
    doc: (c, bg) => `<path d="M22 8h40l18 18v66H22z" fill="${c}"/><path d="M62 8v18h18" fill="${bg}" opacity=".35"/><g stroke="${bg}" stroke-width="4"><path d="M32 44h38M32 58h38M32 72h26"/></g>`,
  };
  const BRUTE = {
    // BRUTE.icon('person-dollar', { size: 200, color: '#ede3c4' }) → chaîne SVG
    icon(name, o) { o = o || {}; const s = o.size || 160, c = o.color || C(), bg = o.bg || '#1b2430';
      return `<svg viewBox="0 0 100 100" width="${s}" height="${s}" style="overflow:visible">${(ICONS[name] || ICONS.person)(c, bg)}</svg>`; },
    // flèche épaisse en SVG absolu (coordonnées du monde)
    arrow(x1, y1, x2, y2, o) { o = o || {}; const w = o.w || 26, c = o.color || C(), a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), hw = w * 2.2, hl = w * 2.4;
      const bx = x2 - Math.cos(a) * hl, by = y2 - Math.sin(a) * hl, px = -Math.sin(a), py = Math.cos(a);
      const pts = [[x1 + px * w / 2, y1 + py * w / 2], [bx + px * w / 2, by + py * w / 2], [bx + px * hw, by + py * hw], [x2, y2], [bx - px * hw, by - py * hw], [bx - px * w / 2, by - py * w / 2], [x1 - px * w / 2, y1 - py * w / 2]];
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); el.setAttribute('width', 1); el.setAttribute('height', 1); el.style.cssText = 'position:absolute;left:0;top:0;overflow:visible';
      el.innerHTML = `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${c}"/>`; if (o.id) el.id = o.id; return el; },
    banner(text, o) { o = o || {}; const d = document.createElement('div'); d.className = 'banner'; d.innerHTML = `${o.sub ? '' : ''}${text}${o.sub ? `<small>${o.sub}</small>` : ''}`; return d; },
    // apparition « pop » : petit rebond sec, à caler sur un mot (OM.cue)
    pop(tl, sel, at, o) { o = o || {}; return tl.fromTo(sel, { opacity: 0, scale: o.from == null ? 0.5 : o.from, rotation: o.rot == null ? -4 : o.rot, transformOrigin: '50% 60%' },
      { opacity: 1, scale: 1, rotation: 0, duration: o.dur || 0.38, ease: 'back.out(3)' }, at); },
    // trait qui se dessine (élément SVG avec pathLength=1 ou ligne)
    draw(tl, sel, at, dur) { return tl.fromTo(sel, { strokeDasharray: '0 1' }, { strokeDasharray: '1 0', duration: dur || 0.6, ease: 'power2.inOut' }, at); },
    // « boil » : tremblement saccadé à fps images/s, déterministe (hypothèse de style, à doser)
    boil(tl, sel, o) { o = o || {}; const fps = o.fps || 8, amp = o.amp == null ? 1.6 : o.amp, from = o.from || 0, to = o.to || 10, rnd = mulberry32(o.seed || 7);
      for (let t = from; t < to; t += 1 / fps) tl.set(sel, { x: (rnd() - .5) * amp * 2, y: (rnd() - .5) * amp * 2, rotation: (rnd() - .5) * amp * .5 }, t); return tl; },
    // grain animé (3 bruits alternés) + vignettage : à appeler une fois, sur le conteneur du film
    grain(root, tl, o) { o = o || {}; const fps = o.fps || 12, to = o.to || 60, op = o.opacity == null ? 0.22 : o.opacity;
      const mk = (seed) => { const d = document.createElement('div'); d.className = 'grain-layer';
        d.style.backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' seed='${seed}'/><feColorMatrix type='saturate' values='0'/></filter><rect width='400' height='400' filter='url(%23n)'/></svg>")`; root.appendChild(d); return d; };
      const L = [mk(3), mk(11), mk(23)]; const v = document.createElement('div'); v.className = 'vignette'; root.appendChild(v);
      for (let i = 0, t = 0; t < to; t += 1 / fps, i++) L.forEach((l, k) => tl.set(l, { opacity: k === i % 3 ? op : 0 }, t)); return L; },
  };
  window.BRUTE = BRUTE;
})();
