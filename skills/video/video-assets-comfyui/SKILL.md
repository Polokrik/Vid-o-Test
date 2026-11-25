---
name: video-assets-comfyui
description: EXPÉRIMENTAL (non testée) — générer en local avec ComfyUI des assets (textures papier, décors, personnages détourés) à intégrer dans les vidéos animées en code de video-depuis-un-site, sans API payante, sur un portable à GPU modeste. À utiliser quand l'utilisateur veut des illustrations uniques plutôt que des formes dessinées en code, ou « ComfyUI », « générer des images en local ».
---

# Assets locaux avec ComfyUI (plan, non testé)

**Statut honnête : cette skill n'a pas été exécutée.** À l'écriture, ComfyUI n'était pas installé sur la machine de l'utilisateur et la mémoire vidéo n'a pas pu être confirmée (Windows affichait 4 Go pour une RTX 4070 portable, vraisemblablement 8 Go ; vérifier avec `nvidia-smi`). Tout ce qui suit est un plan à valider pas à pas ; corriger cette skill au premier essai réel.

## Rôle : des assets, pas des vidéos
Les modèles vidéo locaux sont lents et de qualité limitée sur un portable. On garde le **mouvement en code** (déterministe, corrigeable) et on n'utilise ComfyUI que pour des **images fixes** : fonds peints, textures, éléments détourés qui seront posés dans la scène comme des découpes de papier (`drawAsset(nom, x, y, w, h, { fit })` dans un cadre en papier déchiré, voir `reference/sophro/src/common.js → photoFrame`).

## Étapes
1. **Mesurer la machine** : `nvidia-smi` (VRAM), RAM, disque libre (modèles de 2 à 12 Go). Choisir selon la VRAM : ≤ 4 Go → SD 1.5 + LCM/Turbo ; ~8 Go → SDXL Turbo/Lightning (4 à 8 pas, ~768 px) ou un modèle type Flux quantifié (GGUF) ; plus → plus grand. Vérifier la **licence de chaque modèle** avant un usage commercial.
2. **Installer ComfyUI** (version portable Windows ou depuis le dépôt officiel comfyanonymous/ComfyUI) ; lancer, ouvrir l'interface, tester un workflow par défaut.
3. **Détourage** : un nœud de suppression d'arrière-plan (rembg ou équivalent) pour produire des PNG à fond transparent.
4. **Style** : prompt court « cut paper collage, torn paper edges, flat colors, soft paper texture, white background » + un style cohérent (même graine ou LoRA si disponible) pour tous les assets d'un projet ; noter le prompt, la graine et le modèle dans `brand/assets.md`.
5. **Automatiser** (quand le workflow marche) : l'API HTTP de ComfyUI (`POST /prompt` avec le workflow exporté en « API format », `GET /history/<id>`, `GET /view`) permet de lancer les générations depuis un script ; ne rien lancer d'externe.
6. **Intégrer** : redimensionner à la taille d'affichage (les assets sont embarqués dans la page ; le build avertit au-delà de 12 Mo), mettre dans `pieces/<nom>/assets/`, dessiner avec `drawAsset` à l'intérieur d'une découpe de papier pour rester dans le style ; garder des découpes animées par code.
7. **Contrôler** : pas de logo, de texte illisible ni de visage réel reconnaissable dans un asset généré ; relire chaque image à taille réelle ; mentionner dans le compte rendu quels assets sont générés.

## Ce qu'il reste à faire pour la rendre fiable
Installer ComfyUI, chronométrer un asset (secondes/image selon le modèle), écrire le workflow API de détourage, tester `drawAsset` avec un PNG transparent, puis réécrire cette skill avec les commandes réellement exécutées.
