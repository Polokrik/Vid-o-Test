# Démo : caméra sur un canevas infini

1. `om new demo` puis `om fonts add "Anton" demo` et `om fonts add "Roboto Condensed" demo`
2. Copier `../../kit/brute.css` et `../../kit/brute.js` dans `demo/assets/`
3. Remplacer `demo/index.html` par `index.html` de ce dossier
4. `om check demo` puis `om sound demo` puis `om render demo`

Le parcours de caméra : zoom sur le bloc 1, déplacement vers 2 puis 3, dézoom final sur l'ensemble.
Les pops et whooshs sont calés sur des temps fixes ; dans un vrai projet, les caler sur la voix avec `OM.cue('mot')`.
