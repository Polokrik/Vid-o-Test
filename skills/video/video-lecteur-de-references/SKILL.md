---
name: video-lecteur-de-references
description: "Lire une vidéo de référence (ou un clip trouvé en ligne) sans la « regarder » : planches contact ffmpeg (une image par seconde), liste des coupes, transcription locale, et fiche reference.md à compléter, pour s'en inspirer par principes (rythme, matière, structure) sans copier. À utiliser pour « analyse cette vidéo », « fais comme cette vidéo », « référence », « inspire-toi de ce motion », ou pour étudier un fichier d'idées graphiques."
---

# Lecteur de références

Claude ne regarde pas une vidéo en continu : il lit des **images fixes** et du **texte**. On lui donne donc des planches contact (ordre de lecture gauche→droite, haut→bas, une image par seconde) et une transcription du son, et on garde le résultat écrit dans un fichier `reference.md` à côté de la vidéo pour ne pas relire les images à chaque session.

## Lancer
```bash
node <dossier-de-la-skill>/scripts/contact_sheet.mjs <video.mp4> --out <dossier>/ref --transcribe fr --cols 4 --rows 6
```
Options : `--fps 1` (images/s), `--width 360`, `--cut 0.3` (seuil de détection de coupes), `--transcribe <langue>` (faster-whisper local ; sinon pas de transcription). Nécessite ffmpeg/ffprobe ; la transcription nécessite Python + faster-whisper (installés par `video-depuis-un-site/scripts/setup.mjs`, ou `PYTHON=…`).
Sortie : `sheet-01.jpg…` (lire chaque planche avec l'outil de lecture d'image), `reference.md` (durée, résolution, coupes, planches, transcription, squelette à remplir), `audio-16k.wav`.

## Lire et noter
1. Ouvrir les planches dans l'ordre. Pour chaque idée, noter le temps **approximatif** (± 1 s : une planche à 1 image/s ne donne pas l'image exacte d'une coupe).
2. Compléter `reference.md` : **Look** (palette en hex estimés, trait, texture, profondeur, typographie), **Rythme** (durée des plans, tenues, rafales, transitions), **Colonne vertébrale** (les temps forts en une ligne chacun), **Son** (voix, musique, plus fort, silences — d'après la transcription et ce qu'en dit l'utilisateur, pas d'après les images), **À emprunter comme principe / À ne pas copier**.
3. La détection de coupes confond souvent éclairs, fondus et morphs avec des coupes : la croiser avec les planches.
4. Rester honnête : on ne sait pas ce qu'on n'a pas vu (pas d'audio via les images, pas de mouvement fin). Le dire.

## Utilisation avec les autres skills
- Style : `video-styles-et-heros` (créer un style à partir de la fiche) ; mesures plus fines : `engine/tools/measure/` (`refs.mjs` pour des images, `shotlog.py` pour une vidéo).
- Structure : en tirer un plan de scènes (tableau temps / idée / image / son) pour `video-depuis-un-site`.
- Droits : les références restent locales, non redistribuées ; on s'inspire de principes, on ne reproduit pas les images ni le son d'un tiers.

## Le fichier d'idées graphiques de l'utilisateur
Le lire en entier d'abord. En faire une liste courte de styles/mouvements candidats avec, pour chacun, une phrase de description, un exemple de scène adaptée au client, et le risque (difficulté, droits). Proposer trois pistes testables en images (`still.mjs`) plutôt que de tout construire.
