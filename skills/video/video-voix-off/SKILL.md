---
name: video-voix-off
description: "Produire et minuter la voix off d'une vidéo, sans clé API : écrire le script parlé, générer une prise par ligne (edge-tts gratuit, Voice Studio, ou enregistrement de l'utilisateur), obtenir les temps de chaque mot avec faster-whisper, régler la densité, compenser les durées, vérifier par retranscription. À utiliser pour « voix off », « text-to-speech », « TTS français », « timing de la voix », « synchroniser l'image sur la voix », ou quand la skill video-depuis-un-site demande la voix."
---

# Voix off : la voix est l'horloge

Principe : on génère **une prise par ligne**, on les assemble avec des pauses (`voice.wav`) et on mesure l'heure de chaque mot (`voice.json`). Ensuite toute l'image se cale sur ces mots (`VW('id', 'mot')`), donc changer le texte ou la voix déplace automatiquement le montage.

## Choisir la voix (ordre de préférence)
1. **Voice Studio** (serveur MCP `voicestudio` de l'utilisateur : voix choisie ou clonée, 646 langues, doublage). À essayer d'abord s'il est connecté : charger ses outils avec `ToolSearch` (`select:mcp__voicestudio__check_health,list_voices,generate_speech,list_languages,clone_voice,transcribe`), appeler `check_health`, lister les voix, **faire écouter/choisir 2–3 voix sur une seule ligne avant de tout générer**. Il a répondu « connexion refusée » (serveur arrêté) à plusieurs reprises ; ne pas conclure qu'il n'existe pas : le dire à l'utilisateur. Jamais de clonage de voix sans l'accord de la personne. Non testé dans nos essais : vérifier les schémas à l'usage.
2. **edge-tts** (Microsoft, gratuit, sans clé, internet requis, texte envoyé au service) : `node tools/gen_voice.mjs pieces/<nom> [voix] [rate] [pitch] [ids]`. Défauts : `fr-FR-VivienneMultilingualNeural -12% -3Hz` (douce, bien-être). Autres : `fr-FR-RemyMultilingualNeural` (homme), `fr-FR-DeniseNeural`, `en-US-AvaMultilingualNeural`, `es-ES-ElviraNeural` ; liste complète : `python -m edge_tts --list-voices`.
3. **Enregistrement de l'utilisateur** : un fichier par ligne dans `voice/` (le nom doit correspondre à `file`).
4. Hors ligne (non testé) : Piper ou Kokoro en local, si la confidentialité du texte l'exige.
Pour du texte confidentiel : ne pas utiliser edge-tts (le texte part chez Microsoft).

## Écrire le script (`voice/script.json`)
```json
{ "lead": 0.9, "tail": 2.2, "lines": [
  { "id": "stress", "file": "stress.mp3", "text": "Le stress. La fatigue.", "after": 0.55 },
  { "id": "contact", "file": "contact.mp3", "text": "Zéro six, soixante-quinze… Ou sur sophro nantes point F R.", "sub": "06 75 70 05 94. Ou sur sophro-nantes.fr.", "after": 0.4 } ] }
```
- `id` : nom stable de la ligne (les scènes l'utilisent). `after` : silence après la ligne. `rate` : vitesse propre à la ligne (`"-30%"`). `sub` : texte affiché si différent du texte parlé.
- **≤ 3,5 mots/s par ligne** (le contrôle de revue échoue au-delà). Une ligne dense : ralentir (`rate`) ou reformuler, pas la couper si le sens y tient. Le français est dense en syllabes ; viser 2–3 mots/s pour une voix posée.
- **Épeler pour la voix** : nombres (« zéro six, soixante-quinze, … »), sigles, URL (« sophro nantes point F R ») ; l'affichage passe par `sub`.
- Pas de promesse que le site ne fait pas. Silence (`after` 0,8–1 s) avant le payoff.

## Générer, assembler, minuter
```bash
node tools/gen_voice.mjs pieces/<nom>                          # une prise par ligne (ou : ... "fr-FR-VivienneMultilingualNeural" -12% -3Hz ligne1,ligne2)
node tools/voice.mjs pieces/<nom> --model small --lang fr       # voice/voice.wav + voice.json (temps de chaque ligne et de chaque mot)
```
`voice.mjs` écrit le tableau « ligne / début-fin / mots par seconde ». Le modèle `small` (≈ 480 Mo) se télécharge à la première utilisation. Sans faster-whisper les temps de mots sont estimés (moins précis). L'outil utilise le Python choisi par `setup.mjs` (`python.txt`) ou `$PYTHON`.

## Changer une ligne sans casser le montage
Si une ligne est régénérée et dure Δ de plus ou de moins, **corriger son `after` de −Δ** pour que toutes les lignes suivantes gardent exactement leur heure. Exemple vécu : « Et si vous preniez du temps, pour vous ? » régénérée plus lentement (`rate −40%`) : durée 2,28 s → 2,85 s, donc `after` 0,72 → 0,43 ; relancer `voice.mjs` et vérifier que la ligne suivante démarre à la même seconde.

## Vérifier
- Retranscrire le mixage final (`renders/audio.wav`) avec faster-whisper (`language='fr'`) et comparer au script : c'est la seule « écoute » possible. Les noms propres, « sophrologue » et les nombres peuvent être transcrits autrement sans que la voix soit fautive ; en cas de doute, demander une écoute humaine.
- Dire dans le compte rendu : « voix non écoutée par moi, intelligible à la retranscription ».
- Mots sans correspondance dans `voice.json` : l'outil interpole ; relire le résumé « 62/86 heard » : en dessous de ~65 %, les cues par mot sont moins fiables.

## Pièges
- `VW('id','mot')` compare des mots normalisés sans accents ni apostrophes (« l'intérieur » → `'linter'`) ; une faute lève une erreur explicite au rendu.
- Sortie Python accentuée sous Windows : `PYTHONIOENCODING=utf-8`.
- faster-whisper avec une PyAV incompatible : le moteur décode déjà via ffmpeg.
- Ne pas mélanger deux voix dans une même vidéo sans raison ; garder la même hauteur (`pitch`) sur toutes les lignes.
