---
name: video-depuis-un-site
description: "Fabrique une vidéo animée (30–60 s, collage papier fait main, voix off, musique, sous-titres) à partir de l'URL d'un site, entièrement en code et sans API payante, sur n'importe quel ordinateur. À utiliser quand on demande « une vidéo / animation / motion pour ce site », une vidéo promo ou de présentation à partir d'une URL, une animation JavaScript avec voix off, ou « make a video from this website ». Livre MP4, sous-titres multilingues, pistes audio séparées et une page HTML autonome. Skills liées : video-voix-off, video-sous-titres, video-controles-qualite, video-styles-et-heros, video-lecteur-de-references, video-panorama-outils."
---

# Vidéo à partir d'un site

URL → brief → script parlé → animation canvas déterministe (collage papier, « boil » sur 2 images) → voix off + musique synthétisée → contrôles mesurés → livrables. Tout est en local ou avec des services gratuits sans clé. Le moteur est inclus dans cette skill (`engine/`, dérivé de cth9191/animate, licence MIT, avec nos correctifs) : rien à cloner. La preuve que ça marche : `reference/sophro/` (49,5 s, tous les contrôles passés) et un test à partir d'un dossier vide (installation → voix → rendu → revue).

Dans ce document, « le dossier de la skill » = le dossier où se trouve ce SKILL.md.

## Règles non négociables
1. **Aucun héros qui ressemble au logo Claude.** Jamais l'étoile/astérisque orange à rayons (`spark()`, `SP()`). Le scaffold utilise déjà un héros sans logo (galet). Voir `video-styles-et-heros`.
2. **Rien d'inventé.** Textes, services, chiffres, contacts viennent du site. Toute phrase ajoutée (ex. un slogan de fin) est signalée au client. Pas d'allégation de santé ou de résultat que le site ne fait pas, pas de tarif inventé.
3. **Secrets** : n'utiliser une clé que si l'utilisateur la désigne ; ne jamais fouiller ni réutiliser le `.env` d'un autre projet. Sans clé : voix gratuite, musique en code, images du site.
4. **Rien ne part vers l'extérieur** (envoi, publication, upload) sans accord explicite. On livre des fichiers.
5. **« Fini » se mesure** : `review.mjs` passe ET des images ont été regardées à taille réelle. Dire ce qui n'est pas vérifié (on ne peut pas écouter le son).
6. Ne poser que les questions qui changent le résultat (URL, appel à l'action, durée, langue, voix). Pour le reste, choisir un défaut et le dire.
7. Si un retour client est attendu (« on attend la personne concernée »), ne pas avancer sur le contenu : rester en attente.

## Mise en place (une fois par ordinateur)
Prérequis : Node ≥ 18, ffmpeg, Python 3.10+ avec pip (sous Windows celui de python.org ; un venv sans pip ne convient pas, le script le détecte et passe au suivant). Puis :

```bash
node <dossier-de-la-skill>/scripts/setup.mjs <dossier-de-travail>      # ex. ~/video-studio ; --update pour rafraîchir le moteur
cd <dossier-de-travail>/animate-skill
node tools/newpiece.mjs <nom-du-projet>                               # crée pieces/<nom>/ depuis la pièce de référence
```
`setup.mjs` copie le moteur, installe Playwright + Chromium, choisit un Python avec pip (mémorisé dans `python.txt`), installe edge-tts, faster-whisper, numpy. Il faut du réseau (npm, Chromium ≈ 120 Mo, pip, premier modèle whisper ≈ 480 Mo). Chemins : éviter un dossier de travail très profond sous Windows (limite de 260 caractères).

## Flux (points de validation en gras)

### 0. Cadrage
URL, **appel à l'action voulu** (rendez-vous, achat, contact…), durée (30–60 s), format (16:9 par défaut ; 9:16 pour les réseaux = mise en page à refaire), langue, voix. Une phrase : « le client est X ; le spectateur doit vouloir Y ».

### 1. Lire le site
`WebFetch` sur l'accueil et les pages utiles ; capture de l'accueil : `node tools/capture.mjs <url> pieces/<nom>/ref.png` puis la regarder (couleurs, ambiance, photos). Noter identité, services, publics, formules exactes, contacts, ton. Rogner une belle photo du site (sujet de la vidéo) dans `assets/` (≤ 1600 px de large ; le build avertit au-delà de 12 Mo) ; n'embarquer rien d'autre venant d'ailleurs.

### 2. Marque, concept, héros
Dossier `brand/` du client (palette échantillonnée sur le site, ton, héros, assets) — voir `STUDIO-CLAUDE.md` du paquet. **Concept en une phrase et une image** (« une petite lumière abattue apprend à respirer »). Héros sans logo adapté au sujet (`video-styles-et-heros`). Un monde plein par scène (mur/sol/décors, ≥ 3 détails vivants), textes écrits à la main sur du papier, jamais du texte nu.

### 3. Script parlé
`pieces/<nom>/voice/script.json` : lignes `{ id, file, text, after, rate?, sub? }`. ≤ 3,5 mots/s par ligne, nombres/sigles épelés pour la voix, `sub` = texte affiché, structure accroche → tournant → qui → quoi → comment → appel + contact, silence avant le payoff. **Valider script + storyboard (tableau scène / mots / image / son) avec l'utilisateur** quand il est là. Détails : `video-voix-off`.

### 4. Voix (la voix est l'horloge)
`node tools/gen_voice.mjs pieces/<nom>` (edge-tts, gratuit) ou Voice Studio / enregistrement de l'utilisateur ; puis `node tools/voice.mjs pieces/<nom> --model small --lang fr` → `voice/voice.wav` + `voice.json` (temps de chaque mot). Compenser `after` si une ligne change de durée. Détails : `video-voix-off`.

### 5. Construire (`pieces/<nom>/src`, issu de `reference/sophro`)
- `head.html` : durée = fin de la voix + queue ; `ERA_LIST` = une scène par idée ; **frontières d'ères sur la grille de 0,5 s, dans les silences entre lignes**, ≥ 0,13 s avant la première parole ; `CAPS` = phrases des sous-titres dessinés (indices de mots) ; `TIMELINE` (coupes, morphs, actes, board, narration).
- **Toute cue vient de la voix** : `VW('id', 'mot', n)` (mot normalisé sans accents ni apostrophes : « l'intérieur » → `'linter'`). Jamais de temps codé en dur sauf pour les décors.
- Ponts (morphs) : ≤ 4 pour ~50 s, `d: 0.4`, objet-pont ≥ 200 px et dans le cadre (`HP(x,y,r)` pour le héros) ; sinon coupes franches sur les silences. Caméra : `pieceCam()` (push-in puis retour avant un pont ; suivre un élément avec `springTrack`) ; fonds élargis si la caméra défile.
- Éléments qui arrivent sur un mot : `popS(VW(...))` ; écriture manuscrite `frac: ev(t, d)` ; chiffres écrits groupe par groupe sur les mots dits.
- Une scène à la fois : écrire (~100 lignes), `node tools/build.mjs pieces/<nom>`, regarder `node tools/still.mjs pieces/<nom> t1,t2,t3 out.png --scale 0.4`, corriger, suivante. Le build refuse les URL et `data:` dans le code ; les images vont dans `assets/`, la police est déjà embarquée (`fonts/`, Caveat, licence OFL).
- Le fichier `engine/ENGINE.md` (doc du moteur) et `engine/craft.md` (règles apprises) détaillent le kit (`cut`, `ink`, `face`, `person`, `springMove`, caméras…).

### 6. Score
`src/score.js`, cuée sur la voix : nappe sombre et mince dans la tempête, plus ouverte ensuite, motif d'accueil à l'arrivée du praticien, souffle en bruit filtré, carillons sur les mots d'une liste, bruitages sur les gestes. **Payoff** : accord court + sub dans la pause juste avant la ligne qui l'annonce, **≥ 0,5 s de silence avant**, puis accord plat. Le plus fort doit être le payoff (pas un tonnerre au début).

### 7. Rendu et revue
`node tools/export.mjs pieces/<nom> --share --no-captions` (≈ 1,5 min pour 50 s en 1080p) puis `node tools/review.mjs pieces/<nom>`. Tout doit passer ; sinon corriger selon `video-controles-qualite`, puis regarder les images à taille réelle.

### 8. Livrables
Dossier `livraison/` : `<nom>.mp4` (partage) et `-master.mp4` ; `pistes/voix-off.wav` et `pistes/musique-et-effets.wav` (`renders/audio-score.wav`) ; `sous-titres/*.srt|vtt` par langue + `-sous-titres.mp4` (`node tools/subtitles.mjs pieces/<nom> --langs fr,en --mux renders/share.mp4`, voir `video-sous-titres`) ; `<nom>-animation.html` (`node tools/make_player.mjs pieces/<nom>` : l'animation dessinée en direct, voix et musique embarquées ; peut saccader sur une machine lente, le MP4 reste la référence). Compte rendu court : ce que c'est, résultats des contrôles, ce qui a été ajouté au contenu du site, ce qui n'est pas vérifié, comment changer voix/textes.

## Pièges rencontrés
- Un Python sans pip (venv) ne peut pas installer edge-tts : `setup.mjs` en choisit un autre ; sinon `PYTHON=/chemin/python`.
- faster-whisper plante avec une PyAV incompatible → le moteur décode via ffmpeg (déjà corrigé).
- Sortie Python en console Windows : forcer `PYTHONIOENCODING=utf-8` si on parse du texte accentué.
- bash : éviter plusieurs heredocs imbriqués avec guillemets ; écrire les fichiers avec l'outil d'écriture.
- Polices : « PieceHand » (Caveat) est embarquée dans la page par le build ; `HAND` doit commencer par `"PieceHand"`.
- La page HTML ne redessine qu'une image sur deux (le mouvement est sur 2s) ; normal.
- Le texte « coupé » est jugé par `review.mjs`, pas à l'œil.
- Une légende écrite à la main met ~0,03 s par lettre : l'afficher ≥ 1,25 s.
- Doubler dans une autre langue : les cues `VW('id','mot-français')` ne suivent pas ; voir `video-sous-titres` (limite connue).

## Fichiers de la skill
| chemin | rôle |
|---|---|
| `scripts/setup.mjs` | installation portable (Windows/macOS/Linux) |
| `engine/` | moteur MIT + correctifs : build, still, export, review, voice (multilingue), gen_voice, subtitles, make_player, newpiece |
| `reference/sophro/` | pièce complète à copier (avec héros sans logo) ; son README |
| `fonts/` | Caveat (SIL OFL) embarquée dans chaque pièce |
