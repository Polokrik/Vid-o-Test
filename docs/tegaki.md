# Tegaki — notes d'utilisation

Tegaki (手書き) anime n'importe quelle police en écriture manuscrite. Aucune dépendance native.
Docs : https://tegaki.ink/ · Studio : https://tegaki.ink/studio/

## Installation
    npm install tegaki        # déjà dans package.json (^1.1.0)

## Usage React
    import { TegakiRenderer } from 'tegaki';
    import caveat from 'tegaki/fonts/caveat';

    <TegakiRenderer font={caveat} style={{ fontSize: '48px' }}>Hello World</TegakiRenderer>

Autres frameworks : `tegaki/react`, `tegaki/svelte`, `tegaki/vue`, `tegaki/solid`, `tegaki/astro`.

## CLI (génère un SVG animé, rien à installer)
    npx tegaki "Tegaki is awesome"
    npx tegaki "Hello World" --font tangerine --mode once -o hello.svg
    npx tegaki "ABC" --stagger 80% --size 140 --color "#222"
    npx tegaki --help | --list-fonts

- `--mode` : `loop` (défaut), `once`, `static`.
- Gère ligatures, arabe, devanagari, RTL (harfbuzz WASM).
- Sortie SVG uniquement ; PNG/GIF/WebM via le studio.
- Plugins : `--plugins '[["glow", {"radius": 0.12, "color": "#f0a"}], "taper"]'`

Référence complète : `node_modules/tegaki/README.md`.
