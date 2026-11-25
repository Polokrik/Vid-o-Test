---
name: video-sous-titres
description: Produire des pistes de transcription et de sous-titres multilingues (SRT, VTT, MP4 avec pistes à activer) à partir de la voix off d'une vidéo, séparer la voix et la musique, et préparer des versions dans d'autres langues. À utiliser pour « sous-titres », « SRT », « VTT », « traduire la vidéo », « plusieurs langues », « piste voix séparée », « doublage », ou quand video-depuis-un-site arrive à la livraison.
---

# Sous-titres et pistes séparées

Les vidéos vont souvent sur un site ou des réseaux, sans son. On livre donc toujours : la voix seule, la musique seule, et des sous-titres dans chaque langue demandée.

## Pistes audio séparées
Après `export.mjs` : voix seule = `pieces/<nom>/voice/voice.wav` ; musique + effets = `pieces/<nom>/renders/audio-score.wav` ; mixage final = `renders/audio.wav`. Les copier dans `livraison/pistes/voix-off.wav` et `musique-et-effets.wav`.

## Sous-titres
```bash
node tools/subtitles.mjs pieces/<nom> --langs fr,en,es --mux renders/share.mp4
```
- Écrit `renders/subs.<langue>.srt` et `.vtt`, et `renders/share-subs.mp4` : le MP4 de partage avec une piste de sous-titres par langue (texte souple, à activer dans le lecteur ; la première est active par défaut).
- Langue source (`--source`, défaut `fr`) : texte = champ `sub` de la ligne dans `voice/script.json`, sinon son `text` ; temps = mots entendus dans `voice.json` (une phrase = un sous-titre).
- Autres langues : `pieces/<nom>/subs/<langue>.json` = `{ "<id de ligne>": "texte traduit", … }` (modèles : `reference/sophro/subs/en.json`, `es.json`). Même nombre de phrases que la source, sinon la ligne est répartie proportionnellement.
- Traduire en gardant : les chiffres en chiffres (`06 75 70 05 94`), l'URL telle quelle, le ton (tutoiement/vouvoiement cohérent), des phrases courtes (≤ ~42 caractères par ligne affichée si le lecteur coupe). Relire avec l'utilisateur les termes spécialisés (ici : « Archives Akashiques », « sophrologie »).
- Pas de Voice Studio nécessaire pour les sous-titres.

## Utiliser les fichiers
- Site web : `<video controls><source src="video.mp4"><track kind="subtitles" srclang="fr" label="Français" src="subs.fr.vtt" default><track kind="subtitles" srclang="en" label="English" src="subs.en.vtt"></video>`.
- YouTube / réseaux : téléverser le `.srt` de chaque langue (ne pas publier sans accord de l'utilisateur).
- Sous-titres « gravés » dans l'image : la vidéo contient déjà des légendes dessinées à la main en français (`CAPS` dans `head.html`). Pour une version gravée dans une autre langue : remplacer les textes de `CAPS` par la traduction (mêmes bornes), puis ré-exporter (non automatisé).

## Versions doublées (autre langue parlée) — limite connue
Les scènes se calent sur des **mots français** (`VW('id','mot')`) et `CAPS` sur des **indices de mots** : une voix anglaise ne les retrouve pas. Pour doubler proprement : (1) remplacer, dans la pièce, chaque `VW('id','mot')` par une cue nommée définie par ligne dans `script.json` (`"cues": { "nantes": "Nantes" }`, un mot par langue) ; (2) régénérer la voix dans la langue (edge-tts `en-US-AvaMultilingualNeural`, ou Voice Studio) ; (3) relancer `voice.mjs --lang en` ; (4) refaire les frontières d'ères dans les pauses. Tant que (1) n'est pas fait, livrer la vidéo française + sous-titres traduits. Cette adaptation n'a pas encore été faite.

## Vérifier
Ouvrir le MP4 sous-titré dans un lecteur (VLC), contrôler que chaque langue apparaît au bon moment (les temps viennent des mots entendus) et qu'aucun sous-titre ne chevauche le suivant (l'outil raccourcit déjà les fins).
