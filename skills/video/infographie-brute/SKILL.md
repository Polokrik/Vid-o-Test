---
name: infographie-brute
description: "Style d'animation infographique « brute » inspiré du data-journalisme : fond sombre grainé, pictogrammes plats crème, typographie condensée très grasse, accent rouge rare, canevas infini exploré par une caméra (pan/zoom), apparitions « pop » calées sur la voix. À utiliser quand l'utilisateur demande un style type DataGueule, infographie brute, pictogrammes sur fond sombre, canvas infini, schémas à flèches, vidéo explicative militante / data-journalisme. Se construit avec huashu-motion (HTML + GSAP + OM.camera, rendu par `om render`) ; fournit un kit CSS/JS (grain, hachures, pictogrammes, flèches, bandeaux, pop, boil)."
metadata:
  author: "Paul (paulmagdelaine)"
  version: "0.1.0"
  status: "v1 déduite de 2 captures + un résumé texte ; le mouvement n'a pas été vérifié sur la vidéo"
---

# Infographie brute (style inspiré, pas copié)

Un film d'infographie où **tout est déjà posé sur une grande scène** et où une caméra va d'une idée à l'autre. Le look est brut, lisible, légèrement vintage. Le rythme vient de la voix.

## Ce que le style est (à respecter)

**Look (déduit de captures)**
- Fond **bleu-gris très sombre**, texturé : grain + léger vignettage. Jamais un aplat parfait.
- Pictogrammes **plats, sans visage**, anguleux, couleur **crème / blanc cassé**. Un symbole sur le corps ou la tête dit le sens ($ sur le torse, étoiles, etc.).
- **Un seul accent rouge bordeaux**, rare : bandeaux de titre, alertes, chiffre clé.
- Texte : **capitales condensées très grasses**, mots-clés isolés (« DÉCISIONS », « MARCHÉ »), parfois à 90° ou en diagonale. Un petit bandeau rouge avec texte blanc pour la thématique.
- Schémas simples **A → B → C** : grosses flèches épaisses, cadres, lignes de cote, pointillés. Remplissages **hachurés, pointillés ou granuleux** plutôt qu'unis.

**Mouvement (d'après la description fournie, à valider sur le projet)**
- **Canevas infini** : on construit une grande scène (2× ou 4× l'écran) et on déplace la caméra : zoom avant sur un détail, déplacement vers le suivant, **zoom arrière final** qui révèle la composition d'ensemble.
- **Pop / scale / snap** : chiffres, icônes et mots importants arrivent avec un petit rebond sec, **sur un mot de la voix**.
- **Parenting** : bloc texte + icône + flèche bougent ensemble (un seul conteneur).
- Option « boil » : léger tremblement saccadé (8 images/s) pour le côté papier découpé. C'est une hypothèse de style, à utiliser avec parcimonie.
- Son : whoosh sur les déplacements de caméra, pops discrets sur les apparitions, nappe très légère.

## Ce qu'on évite
Aplats parfaits et dégradés « tech » ; icônes arrondies qui font « app » ; plus de ~2 couleurs vives ; texte long ; coupures sèches (la caméra relie les idées) ; **logo, personnages ou compositions de la chaîne dont le style s'inspire** (on s'inspire du langage visuel, on ne reproduit pas la marque).

## Méthode (5 étapes)
1. **Script découpé** : par phrase, noter la donnée clé, la métaphore visuelle (pictogramme), le mouvement de caméra.
2. **Système visuel** : palette (variables CSS de `kit/brute.css`, surchargeables), polices (`om fonts add Anton` et `om fonts add "Roboto Condensed"`), set de pictogrammes (`BRUTE.icon`).
3. **Fresque** : tout poser dans un conteneur `#world` (ex. 3840×2160) avec flèches, cadres, numéros. Penser à l'image finale au dézoom.
4. **Motion** : enregistrer la voix d'abord ; caméra d'abord (`OM.camera`), puis pops calés sur `OM.cue('mot')`.
5. **Son + finition** : `om sound` (whoosh / pop), grain global (`BRUTE.grain`), `om check`, `om still`, `om render`.

## Kit (`kit/`)
Copier `brute.css` et `brute.js` dans `<projet>/assets/` puis les inclure après `vendor/om.js`.

```html
<link rel="stylesheet" href="assets/brute.css">
<script src="assets/brute.js"></script>
```
- `BRUTE.grain(root, tl, {fps:12})` : grain animé + vignettage (déterministe).
- `BRUTE.icon(nom, {size, color})` → SVG : `person`, `person-dollar`, `folder`, `stack`, `building`, `robot`, `globe`, `bars`, `doc`.
- `BRUTE.arrow(x1, y1, x2, y2, {w, color})` → flèche épaisse (SVG absolu).
- `BRUTE.banner('TEXTE', {sub})` → bandeau rouge de thématique.
- `BRUTE.pop(tl, sel, at, {from, rot})` → apparition avec rebond sec.
- `BRUTE.draw(tl, sel, at, dur)` → trait qui se dessine (flèches, pointillés).
- `BRUTE.boil(tl, sel, {from, to, fps, amp})` → tremblement papier découpé.
- Classes : `.hatch`, `.dots`, `.chalk` (remplissages), `.vert` (texte à 90°), `.cond` (condensé gras).
- Caméra : `const cam = OM.camera('#world'); cam.set({fit:'#a', pad:200}); cam.to(tl, 2.0, {fit:'#b', pad:200, duration:.9, ease:'expo.inOut'}); cam.to(tl, 6, {focus:[1920,1080], zoom:.5, duration:1.4})`.

## Exemple
`examples/demo/index.html` : mini-parcours de caméra sur 3 blocs puis dézoom. Le recopier dans un projet `om new` (voir README de l'exemple).

## Contrôles qualité
- Le texte reste lisible à pleine taille quand la caméra s'arrête sur un bloc.
- Pas plus de 2 couleurs vives par plan ; le rouge reste sous ~10 % du temps d'écran.
- Chaque pop tombe sur un mot ou un accent de la voix.
- Le dernier plan est un zoom arrière qui montre l'ensemble.
- Aucun logo ni personnage reconnaissable d'un tiers.
