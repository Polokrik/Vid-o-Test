# Reference piece: « La tempête intérieure » (sophro-nantes.fr, 49.5 s, 16:9, cut-paper, French voice-over)

A finished, reviewed piece to copy from. Sources only (no renders, no client photo, no mp3 takes).

| file | role |
|---|---|
| `piece.json` | format 1920×1080 @ 24 fps, `scenes` list, `voice`, `review.textIgnore` entries with reasons |
| `src/head.html` | constants, **voice clock helpers** `VL/VW/VT0/VT1`, `CAPS` (caption phrases from word indexes), `ERA_LIST`, `SHOTS`, `TIMELINE` (cuts, morphs, acts, board, narration) |
| `src/common.js` | helpers: `bgFull`, `cloud`, `hillPts`, `sunPaper`, `flowerPaper`, `pine`, `bird`, `wavePaper`, `stickyNote`, `captions()`, `beatrice()` (a person), `photoFrame()` (client photo from `assets/`), `skylineNantes()` |
| `src/era-a.js … era-h.js` | one scene per era; each cues on spoken words with `VW('line-id', 'word')` |
| `src/bridges.js` | `ERA_BG`, `pieceCam()` (push-ins, card-following camera), `BRIDGES` |
| `src/score.js` | the score, also cued on the voice; payoff stab + sub in the pause, silence before it |
| `voice/script.json` | lines with `id`, `file`, `text`, `after`, optional `rate` and `sub` (on-screen text ≠ spoken text) |
| `subs/en.json`, `subs/es.json` | translations for `scripts/subtitles.mjs` |

**Replace the hero.** This piece used the kit's orange starburst (`spark`) as its mascot, which reads as the Claude logo.
Do not reuse it: use `../../heroes/heroes.js` (see its header for the three-line swap).
Replace the client-specific content (Béatrice, Nantes skyline, the five services cards, the phone number) with the new client's.
