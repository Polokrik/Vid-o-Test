---
name: video-panorama-outils
description: Guide de choix des outils pour fabriquer des vidéos et motion graphics avec Claude (moteurs HTML/React, skills d'animation, Blender, générateurs externes, Claude Motion), avec licences, limites et ce qui a été vérifié ou non. À utiliser quand on demande « quel outil pour faire une vidéo / un motion », « HyperFrames ou Remotion », « comment font-ils ces vidéos », « que penser de ce repo / ce thread », ou avant de choisir le moteur d'un nouveau projet vidéo.
---

# Panorama des outils vidéo avec Claude

Idée centrale (consensus du thread Reddit r/ClaudeAI et des repos lus) : **Claude n'a pas de modèle de génération vidéo** ; il écrit du code (HTML/CSS/JS/React/Blender) qui dessine chaque image, un navigateur sans interface ou Blender la rend, ffmpeg assemble. Avantage : on corrige un mot, un chiffre ou un timing sans tout regénérer. Les vidéos les plus spectaculaires ajoutent des **assets générés** (images, vidéo, musique, voix) via des API payantes ou des modèles locaux ; le code, lui, reste gratuit.
Dernière vérification des faits : octobre 2026. Les repos bougent vite : revérifier avant d'installer.

## Quel moteur pour quel besoin
| besoin | choix | pourquoi / réserve |
|---|---|---|
| collage fait main, voix off, sous-titres, sans API | **skill `video-depuis-un-site`** (moteur cth9191/animate, MIT, inclus) | contrôles mesurés, voix comme horloge, styles ; canvas 2D uniquement |
| motion typographique / UI / lancement produit, 60 fps, flou de mouvement | **HyperFrames** (heygen-com/hyperframes, Apache-2.0, Node ≥ 22, HTML→MP4, GSAP) | gratuit pour tout usage ; plugin Claude Code officiel |
| vidéos en React, écosystème riche | **Remotion** + skills officielles (remotion-dev/skills) | **licence payante pour les entreprises** : lire la licence avant un usage commercial |
| principes d'animation (timing, easing, Disney) | LottieFiles/motion-design-skill, iart-ai/motion-design-skills, klik-anim/klik-cam | indépendants du moteur ; légers |
| montage de rushes (couper les silences, sous-titres, B-roll) | nateherkai/hyperframes-student-kit, Barty-Bart/motion-graphics | pour de vraies vidéos tournées |
| 3D, claymation | **Blender** (outils MCP Blender, souvent déjà disponibles en session : `mcp__Blender__*`) ; blender-mcp (ahujasid/mcp-for-blender) | lourd en machine ; Eevee suffit pour du stylisé |
| images/clips générés | API externes (Higgsfield, HeyGen, OpenRouter…) ou **ComfyUI en local** (skill `video-assets-comfyui`, non testée) | payant ou GPU ; à réserver aux plans que le code ne sait pas faire |
| animation web (pas vidéo) | motion.dev / Framer Motion, lottie-web | pas de rendu MP4 |
| « Claude Motion » | fonction officielle en bêta (offres Team/Enterprise), export MP4, animations par code, consomme le quota | probablement inutile ici : notre chaîne fait l'équivalent gratuitement |

## Les 20 repos de la liste initiale (lus : 15 README ; les autres sont des moteurs/biblios connus)
1 whaleyxbt/claude-motion (goût, vérification des images, sons en code, simulations web → vidéo 60 fps) · 2 howseen-ai/claude-motion-design (HTML + Playwright + ffmpeg, `seek(t)`, ressorts fermés, flou par sous-images, cale sur le tempo) · 3 charlie947/motion-graphics-skills (15 skills, commence par `brand-intake`) · 4 haidrrrry/claude-remotion-skill (boucle rendu → inspection des images → correction) · 5 t3knobox/klik-anim-skill-creation (lois d'animation, caméra, méthode découverte → storyboard en images → build → QA ; très gourmand en tokens) · 6 Sunwood-ai-labs/hyperframes-motion-reel-skill (reel à 120 BPM, HyperFrames) · 7 AbubakrChan/product-launch-motion (URL → film de lancement ; v2 : HTML pur, musique d'abord) · 8 **cth9191/animate** (notre moteur) · 9 iart-ai/motion-design-skills · 10 nateherkai/hyperframes-student-kit · 11 heygen-com/hyperframes · 12 remotion-dev/remotion · 13 remotion-dev/skills · 14 greensock/GSAP (annoncé gratuit, non revérifié) · 15 LottieFiles/motion-design-skill · 16 frankxai/awesome-motion-design-agent-skills (catalogue) · 17 Barty-Bart/motion-graphics (B-roll à partir d'une transcription, détourage, explainers, effets sonores) · 18 199-biotechnologies/motion-dev-animations-skill (animation web, pas vidéo) · 19 motiondivision/motion · 20 airbnb/lottie-web.
Contre-pied : le titre « ingénieurs Netflix » du post d'origine est faux ; ce sont des créateurs indépendants et HeyGen.

## Leçons du thread Reddit « comment font-ils ces motions »
- La « méthode pro » du commentaire le plus voté : prompt « animation JavaScript pure, collage dessiné, audio adapté… », avec une clé OpenRouter + budget (≈ 3 $/vidéo) pour générer assets, musique, voix et utiliser un second modèle comme critique. **Nous avons fait sans clé** (voix edge-tts, musique en code, photo du site) : plafond plus bas sur la musique et les illustrations uniques.
- Donner des **références** (images, planches d'une vidéo) et itérer ; faire valider un **storyboard par scène**.
- Compétence clé : des **ancres/cues nommées** pour la musique, les événements, les transitions, recalées automatiquement quand on change une durée (nous le faisons avec `VW()` sur la voix).
- Claude ne « regarde » pas une vidéo : planches d'images + transcription (skill `video-lecteur-de-references`).

## Le post « STUDIO + HyperFrames + Remotion + GSAP + Lottie + Blender + /schedule »
Idées bonnes à prendre : dossier de travail + `CLAUDE.md` qui range les éléments de marque dans `brand/` (voir `STUDIO-CLAUDE.md` du paquet), skill de principes de mouvement, routine avec **accord avant envoi**. Réserves : le chiffre « 68 000 étoiles » n'a pas été vérifié ; la commande `curl … | sh` du post doit être lue avant d'être lancée ; le dépôt Blender cité a été renommé (ancien nom → redirection) ; la licence de Remotion s'applique ; aucune de ces briques n'a été installée pendant notre travail.

## Contraintes de l'utilisateur connues (octobre 2026)
Pas d'API OpenAI/Gemini ; ComfyUI éventuel ; ordinateur portable avec RTX 4070 (≈ 8 Go de VRAM probable, 31 Go de RAM). Donc : tout en code + voix gratuite ; assets générés en local seulement si utile (`video-assets-comfyui`). Voice Studio (serveur MCP perso) possible pour voix/doublage quand il tourne.
