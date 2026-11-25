---
name: video-styles-et-heros
description: Choisir ou créer le style visuel et le héros d'une vidéo animée en code (papier découpé, hachures à l'encre, risographie, carnet, maths, pixel, isométrique, ou style nouveau à partir de références ou d'un fichier d'idées graphiques), avec des héros sans logo (galet, pelote) et la règle « jamais l'étoile orange qui ressemble au logo Claude ». À utiliser pour « quel style », « changer de style », « créer un nouveau style », « mascotte / héros », « fichier d'idées graphiques », ou au début de video-depuis-un-site.
---

# Styles et héros

## Règle d'or : pas de lookalike du logo Claude
Le moteur fournit par défaut une mascotte « étincelle » (étoile orange à rayons avec un visage) : elle ressemble au logo de Claude. **Ne jamais l'utiliser** (`spark()`, `SP()`, ni aucune étoile/astérisque orange à rayons) dans un visuel livré. La pièce de référence et `newpiece.mjs` utilisent déjà `heroes.js` : le héros est appelé via `hero(x, y, r, { mood, s, key })`, les ponts via `HP(x, y, r)`.

## Héros disponibles (`src/heroes.js` de la pièce)
- **`pebble`** (galet, teal par défaut, petits pieds, reflet) : calme, solidité, bien-être. Couleurs : `HERO_COLORS` (teal, lilac, rose, sand, sky) via `{ color }`.
- **`puff`** (pelote duveteuse type pissenlit) : air, souffle, légèreté (`{ kind: 'puff' }`).
Humeurs communes : `smile`, `happy`, `wow`, `sad`, `focus` (yeux fermés). Clignement et respiration inclus.
Créer un nouveau héros = une fonction avec la même signature (corps en `cut(...)`, `face(...)`), son contour pour les ponts (`{ P, c }`), et l'ajouter à `hero()`. Choisir un héros lié au sujet du client (un galet pour la sophrologie ; une goutte, une graine, une barque, une pièce de puzzle… ailleurs). Un héros constant dans toute la vidéo, avec un visage, qui réagit à ce qui se passe.

## Styles livrés par le moteur (`styles/<nom>/` : `STYLE.md`, `kit.js`, `demo/`)
| style | rendu | convient à |
|---|---|---|
| `cut-paper` (utilisé) | papier déchiré, ombres douces, grain, crayon, motifs ; mondes pleins, personnages | bien-être, artisans, services de proximité, pédagogie douce |
| `crosshatch` | encre qui « bout », hachures, papier chaud | bureau, tech, récits d'intérieur |
| `riso` | trois encres, trames de points, décalage d'impression | culture, événements, jeunesse |
| `sketchbook` | graphite + une couleur, écriture à la main, page de carnet | idées, coaching, startups |
| `math` | scène noire, axes, couleurs par variable | sciences, finance pédagogique |
| `pixel` | basse définition, police bitmap, jeu rétro | jeux, tech rétro |
| `isometric` | lignes isométriques fines, une couleur d'accent | produits, logiciels, process |
| **custom** | mesuré à partir de vos références | tout |
Voir toutes les vignettes : `node tools/gallery.mjs gallery.png` (≈ 3 s). Choisir le style **avec** l'utilisateur ou sur la base de la marque ; les démos du moteur contiennent la mascotte orange et du texte « Claude Code » : ne pas les reprendre telles quelles.

## Créer un style à partir de références ou d'un fichier d'idées
1. Demander les références : vidéos, images, pages web, ou le **fichier d'idées graphiques** de l'utilisateur (lire d'abord le fichier en entier, en extraire une liste de pistes : palette, matière, trait, mouvement, rythme).
2. Pour une vidéo de référence : skill `video-lecteur-de-references` (planches + transcription + `reference.md`).
3. Suivre `engine/new-style.md` : mesurer palette/épaisseur de trait/texture/mouvement (`tools/measure/refs.mjs` pour des images, `shotlog.py` pour une vidéo), dessiner 1–2 images équivalentes, les comparer (`tools/compare.mjs`), **faire valider**, puis enregistrer le style dans `styles/<nom>/`.
4. Ne jamais copier l'œuvre d'un tiers : on emprunte des principes (matière, rythme, palette), pas des dessins.

## Pistes de styles à construire (non faites, à tester image par image)
Aquarelle (lavis translucides, bords diffus), gravure sur bois/linogravure (aplats + tailles), vitrail (plombs noirs, couleurs saturées), cyanotype / plan d'architecte (blanc sur bleu), demi-teintes de bande dessinée, feutrine ou pâte à modeler, **silhouettes en papier découpé façon théâtre d'ombres des années 1920** (idée vue dans le fil Reddit : fond dégradé, silhouettes noires articulées, lumière dorée). Pour chaque piste : 3 images d'essai (`still.mjs`) avant de s'engager.

## Règles de composition apprises
- Une couleur par scène, un monde plein (mur, sol, objets), jamais un objet flottant sur du blanc.
- Texte toujours écrit à la main sur du papier (étiquettes, rubans), jamais de titre centré sur dégradé.
- Mouvement sur 2 images (12 dessins/s) : c'est la signature « stop-motion ». Garder les ressorts (`springMove`) pour tout ce qui a de la masse.
- Varier les échelles, au moins un gros plan ; ≥ 3 petits détails vivants par image.
- Accessibilité : contrastes suffisants ; ne pas dépendre de la couleur seule.
