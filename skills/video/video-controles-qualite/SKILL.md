---
name: video-controles-qualite
description: "Vérifier et améliorer une vidéo générée en code : lire la sortie de review.mjs (grille de coupes, densité de la voix, arc sonore, texte coupé, plans figés, loudness), corriger les échecs courants, inspecter les images à taille réelle, contrôler l'audio par retranscription, et rédiger un compte rendu honnête. À utiliser avant de livrer toute vidéo faite avec video-depuis-un-site, ou quand « review.mjs » échoue, ou pour « contrôle qualité vidéo »."
---

# Contrôles qualité d'une vidéo en code

Trois niveaux, toujours : (1) images de test pendant la construction, (2) `review.mjs` (chiffres), (3) images à taille réelle de chaque scène + contrôle audio. « Fini » = les trois.

## Lancer
```bash
node tools/export.mjs pieces/<nom> --share --no-captions    # ≈ 1,5 min / 50 s en 1080p
node tools/review.mjs pieces/<nom>                           # écrit review/ (planches), review/phone.jpg
node tools/still.mjs pieces/<nom> 3.0,6.9 out.png --scale 0.5   # images à taille utile
```
Lire `review/phone.jpg` (1 image/s à 360 px : tout texte doit y rester lisible).

## Ce que mesure review.mjs et comment réagir
| contrôle | seuil | si ça échoue |
|---|---|---|
| coupes et ponts sur la grille de 0,5 s | ±1 image | déplacer la frontière d'ère au multiple de 0,5 s le plus proche, dans le silence entre deux lignes |
| densité de la voix | ≤ 3,5 mots/s, pas de chevauchement | ralentir la ligne (`rate`), la reformuler ; compenser `after` (skill `video-voix-off`) |
| arc sonore | le dernier acte (payoff) est le plus fort ; le plus chargé n'est pas le plus fort | baisser tonnerre/tutti du début, monter l'accord du payoff + sub |
| silence avant le payoff | ≥ 0,5 s à ≤ −40 dBFS (musique seule) | terminer nappes, notes et bruitages avant, release court, pas de réverbération longue |
| plus fort moment | dans l'acte payoff | idem |
| texte | pas coupé par le cadre, pas superposé, hors zone sûre | déplacer/réduire ; si c'est voulu (caméra qui suit, notes qui entrent), l'inscrire dans `piece.json` → `review.textIgnore: [[t0, t1, "raison"]]` |
| plans figés | rien > 3 s sans changement | ajouter de la vie (mouvement de fond, apparition, caméra) |
| loudness | ≈ −14 LUFS, crête ≤ −1 dBFS | le moteur normalise ; si hors cible, réduire les pics |
| rythme (acte 'build', 'gift'…) | rôles déclarés dans `TIMELINE.acts` | renseigner les rôles : build, journey, peak, silence, gift, goodbye |

Ne pas faire confiance à l'œil pour le texte coupé : c'est `review.mjs` qui juge.

## Revue manuelle à taille réelle (rien ne la remplace)
Pour chaque scène, une image (ou deux) à `--scale 0.5` et vérifier :
- le héros est présent, expressif, **sans ressemblance avec le logo Claude** (pas d'étoile/astérisque orange) ;
- ≥ 3 détails de vie dans le décor ; textures papier visibles ; pas de trou de fond ;
- aucun élément ne chevauche un texte ou une légende ; les notes/étiquettes sont lisibles ;
- les chiffres, noms, URL, e-mails affichés sont **identiques au site** ;
- la caméra ne laisse pas voir du vide aux bords (fonds élargis) ;
- les transitions (ponts) : l'objet-pont est grand et dans le cadre.

## Contrôle audio sans écoute
Retranscrire `renders/audio.wav` (faster-whisper, langue de la voix) et comparer au script ; vérifier la loudness dans la sortie de revue. Dire clairement : « le son n'a pas été écouté par moi ». Faire écouter par un humain avant diffusion si possible.

## Erreurs rencontrées (à éviter d'emblée)
- Une ligne trop dense (4,8 mots/s) → échec de densité ; une voix plus lente + reformulation.
- Un coup de tonnerre plus fort que le payoff → arc sonore faux.
- Texte « coupé » par un zoom de caméra ou une note qui entre : légitime mais à déclarer avec une raison.
- Fonds trop petits quand la caméra suit des cartes → bords vides.
- Un héros par défaut du moteur = étoile orange → à remplacer (skill `video-styles-et-heros`).
- Python console Windows et accents → `PYTHONIOENCODING=utf-8`.

## Compte rendu final (court, honnête)
Ce qui a été livré ; les résultats chiffrés (nombre de contrôles passés) ; ce qui a été ajouté au contenu du site ; le scène la plus faible et ce qui la corrigerait ; ce qui n'a pas pu être vérifié (écoute, rendu sur d'autres machines, lecteur HTML sur machine lente) ; comment changer la voix ou les textes.
