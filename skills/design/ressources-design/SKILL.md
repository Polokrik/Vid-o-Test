---
name: ressources-design
description: Catalogue des outils, bibliothèques, assets et sources d'inspiration pour le design, la vidéo, les jeux et les apps (motion, backgrounds, composants React, UI de référence, images IA, canevas de design, tegaki). À consulter AVANT de créer ou de chercher un visuel, un fond, un composant ou une référence, pour choisir la bonne ressource au lieu de repartir de zéro.
---

# Ressources design

Ce skill est un index : il dit **quelle ressource ouvrir pour quel besoin**. Le détail de chaque ressource est dans `references/catalogue.md`.

## Procédure

1. Identifier le besoin : fond, composant, inspiration, image, animation, vidéo, maquette, canevas.
2. Lire le tableau « Besoin → ressource » ci-dessous, puis la fiche correspondante dans `references/catalogue.md`.
3. Si la ressource a un MCP ou un paquet npm installé, l'utiliser directement. Sinon, donner le lien à l'utilisateur et dire ce qu'il doit y faire : ne pas inventer le contenu du site.
4. Ne jamais copier un asset ou un composant sans vérifier sa licence sur le site d'origine (colonne « Licence » du catalogue : à compléter).

## Besoin → ressource

| Besoin | Ressource |
| --- | --- |
| Pièce de motion ou site exporté en vidéo | UX Pilot Motion |
| Fond, dégradé, fond d'écran | Backgrounds Supply |
| Composants UI utilisables depuis Claude Code | Forever Components (MCP) |
| Fonds animés, textures, mockups pour un projet d'agent | HorizonX |
| Références de sites, logos, icônes d'app | Inspora |
| Images, vecteurs, mockups dans un style fixe | Recraft |
| Écrans réels d'apps mobiles et web (layouts) | Mobbin |
| Concevoir sur un canevas avec un agent, renvoyer vers le code | pen.dev |
| Blocs React live à copier | Bencho |
| Texte animé en écriture manuscrite | tegaki (installé, voir `docs/tegaki.md`) |

## Ajouter une ressource

Ajouter une fiche à `references/catalogue.md` (nom, lien, catégorie, à quoi ça sert, accès : lien / MCP / npm, licence, statut) et une ligne au tableau ci-dessus. Statuts : `à tester`, `testé`, `installé`.
