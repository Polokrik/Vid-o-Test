  // =====================================================================
  //  SCORE — D major / B minor, 120 BPM grid. Dark and thin in the storm, opening up with each era,
  //  a breath in era D, five chimes in era E, a flat warm chord on the final bridge (the payoff, in the pause before the number).
  //  Cues come from the voice (VW) so the sound lands on the same words as the picture.
  // =====================================================================
  const T = TIMELINE;
  const tStress = VW('stress', 'stress'), tIn = VW('storm', 'linter'), tCourtes = VW('stress', 'courtes');
  // ---------- A: the storm (thin, dark, rain, thunder) ----------
  to = 'm';
  pad(0.0, 8.05, ['B2', 'Fs3', 'D4'], 0.03, { type: 'triangle', cut: 520, att: 0.8, rel: 0.4, send: 0.5 });
  [['B3', 1.2], ['D4', 1.7], ['A3', 3.0], ['Fs3', 3.5], ['B3', 4.8], ['D4', 5.3]].forEach(([n, t], i) => pluck(t, nz(n), 0.11, -0.2 + i * 0.07, 0.9, 900, 0.45));
  for (let t = 0.2; t < 7.6; t += 0.5) sweep(t, t + 0.6, 0.0045, 3400, 5200, (t * 7) % 1 - 0.5);
  to = 's';
  [tStress, tCourtes + 0.1, tIn].forEach((t, i) => { sub(t, i === 2 ? 0.2 : 0.15); noiseHit(t, 1.1, 'lowpass', 520, 0.7, 0.05, 0, 0.3); });
  riser(5.55, 6.28, 0.012);
  // ---------- the cloud turns white (8.0): a paper swish, then the first major chord ----------
  sweep(7.55, 8.0, 0.012, 600, 3200, 0);
  to = 'm';
  pad(8.0, 11.55, ['D3', 'A3', 'Fs4'], 0.05, { cut: 1500, att: 0.35, rel: 0.4, send: 0.5 });
  pluck(8.05, nz('D5'), 0.09, 0, 0.9, 3200, 0.5); pluck(8.05 + E8, nz('A5'), 0.07, 0.1, 0.9, 3200, 0.5);
  const tTemps = VW('pause', 'temps');
  ['D5', 'E5', 'Fs5', 'A5', 'B5'].forEach((n, i) => pluck(tTemps + i * 0.14, nz(n), 0.09, 0.3 - i * 0.12, 0.45, 4200, 0.4));
  // ---------- C: Béatrice (a welcoming motif) ----------
  pad(11.5, 16.05, ['D3', 'A3', 'D4', 'Fs4'], 0.05, { cut: 1700, att: 0.3, rel: 0.4, send: 0.5 });
  const tName = VW('intro', 'Beatrice'), tNantes = VW('intro', 'Nantes');
  [['A4', 0], ['D5', E8], ['Fs5', 2 * E8], ['A5', 3 * E8]].forEach(([n, dt], i) => pluck(tName + dt, nz(n), 0.11, -0.2 + i * 0.12, 0.7, 3600, 0.45));
  to = 's'; chime(tNantes, [nz('D6'), nz('A6'), nz('Fs6')], 0.05);
  bass(11.5, nz('D2') ?? 73.4, 0.12);
  // ---------- D: breathing (in, out, calm) ----------
  to = 'm';
  pad(16.0, 21.55, ['D3', 'A3', 'Fs4', 'B4'], 0.04, { cut: 1100, att: 0.5, rel: 0.4, send: 0.6, swellTo: 0.075, swellAt: 18.2 });
  to = 's';
  sweep(16.75, 18.2, 0.05, 280, 2300, 0);                 // the breath in
  noiseHit(18.3, 1.35, 'bandpass', 2300, 1.1, 0.07, 0, 0.3, 280);   // the breath out
  const tCalme = VW('breath', 'calme');
  chime(tCalme - 0.05, [nz('D6'), nz('A5'), nz('Fs6')], 0.06);
  // ---------- E: five cards, five chimes, a light pulse that grows ----------
  to = 'm';
  pad(21.5, 29.55, ['D3', 'A3', 'D4', 'Fs4'], 0.05, { cut: 1600, att: 0.3, rel: 0.5, send: 0.5 });
  const eT = E_T();
  [['D5', 'A5'], ['E5', 'B5'], ['Fs5', 'Cs6'], ['A5', 'E6'], ['B5', 'Fs6']].forEach(([a, b], i) => { to = 's'; chime(eT[i] - 0.1, [nz(a), nz(b)], 0.07, -0.3 + i * 0.15); to = 'm'; });
  const pent = ['D5', 'E5', 'Fs5', 'A5', 'B5', 'A5', 'Fs5', 'E5'];
  for (let i = 0, t = 21.8; t < 29; i++, t += E8) pluck(t, nz(pent[i % pent.length]), 0.035 + 0.025 * Math.min(1, (t - 21.8) / 5), 0.35 - (i % 5) * 0.15, 0.3, 3000, 0.3);
  for (let t = 22.0; t < 29; t += BEAT) bass(t, nz(((t / BEAT | 0) % 4 === 3) ? 'A2' : 'D3'), 0.07);
  // ---------- F: everyone is unique; judgement swept away; a dandelion ----------
  pad(29.5, 35.55, ['D3', 'A3', 'Fs4'], 0.05, { cut: 1500, att: 0.3, rel: 0.4, send: 0.5 });
  [['chaque', 'D5'], ['personne', 'Fs5'], ['est', 'A5'], ['unique', 'D6']].forEach(([w, n], i) => { to = 's'; blip(VW('unique', w) - 0.05, nz(n) * 0.5, nz(n), 0.12, 0.05, -0.4 + i * 0.27); chime(VW('unique', w) - 0.05, [nz(n)], 0.035, -0.4 + i * 0.27); });
  to = 's'; noiseHit(VW('unique', 'ici') + 0.15, 0.35, 'bandpass', 700, 2, 0.03);    // the grey notes rustle in
  const tJug = VW('unique', 'jugement');
  noiseHit(tJug - 0.05, 0.85, 'bandpass', 3000, 0.9, 0.06, 0.3, 0.2, 500);   // the big hand sweeps
  sweep(33.0, 33.6, 0.02, 400, 3000, 0);                                      // the sky of paper rises
  const tS = VW('unique', 'souffler');
  noiseHit(tS - 0.05, 1.2, 'bandpass', 4500, 0.8, 0.05, 0.2, 0.4, 1200);      // the breath on the dandelion
  to = 'm'; ['D6', 'Fs6', 'A6', 'B6', 'D6', 'A5', 'Fs6', 'B5'].forEach((n, i) => pluck(tS + i * 0.07, nz(n), 0.05, -0.6 + i * 0.18, 0.5, 5200, 0.6));
  // ---------- G: the phone rings, the letter, the pen on the calendar ----------
  pad(35.5, 38.4, ['D3', 'A3', 'D4', 'Fs4'], 0.045, { cut: 1500, att: 0.3, rel: 0.12, send: 0.2 });
  const tEnvie = VW('rdv', 'envie'), tEch = VW('rdv', 'echange'), tRdv = VW('rdv', 'rendez');
  to = 's';
  for (let k = 0; k < 4; k++) { const t = tEnvie + k * 0.38; [0, 0.09].forEach((d, j) => blip(t + d, j ? 700 : 940, j ? 690 : 930, 0.07, 0.05, 0.2)); }
  pluck(tEch, nz('A5'), 0.07, 0.2, 0.5, 3800, 0.4); pluck(tEch + 0.1, nz('D6'), 0.07, 0.3, 0.5, 3800, 0.4);
  chime(tRdv - 0.08, [nz('Fs5'), nz('A5')], 0.06);
  for (let i = 0; i < 5; i++) noiseHit(tRdv + 0.0 + i * 0.07, 0.06, 'highpass', 3600, 0.7, 0.03);   // red crayon scratching the date
  // ---------- H: the payoff — a short stab and a sub in the pause, then a flat warm chord ----------
  to = 'm';
  const tPay = 39.02;
  [['D4', 0], ['A4', 0.012], ['Fs5', 0.024], ['D5', 0.036]].forEach(([n, dt]) => pluck(tPay + dt, nz(n), 0.34, 0, 0.5, 4200, 0.5));
  to = 's'; sub(tPay, 0.62);
  to = 'm';
  pad(tPay + 0.1, 49.5, ['D3', 'A3', 'D4', 'Fs4', 'A4'], 0.07, { cut: 1700, att: 0.6, rel: 1.5, send: 0.6 });
  const arp = ['D5', 'Fs5', 'A5', 'Fs5', 'B5', 'A5', 'Fs5', 'E5'];
  for (let i = 0, t = 41.5; t < 49.0; i++, t += BEAT) pluck(t, nz(arp[i % arp.length]), 0.045, -0.3 + (i % 4) * 0.2, 0.6, 3000, 0.5);
  to = 's';
  for (let t = 39.2; t < 49.2; t += 1.4) sweep(t, t + 1.5, 0.006, 500, 1800, (t * 3) % 1 - 0.5);   // the waves
  V_DIGITS: { const V = VL('contact'), idx = [0, 2, 3, 4, 6]; idx.forEach((i) => blip(V.words[i].t0 + 0.05, 1400, 1300, 0.05, 0.03, 0.3)); }
  chime(VW('contact', 'nantes') + 0.9, [nz('D6'), nz('A6'), nz('Fs6')], 0.06);
