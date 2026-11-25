# Skills design et vidéo pour Claude Code

Ce dépôt rassemble les skills de **création vidéo** et de **design** utilisés avec Claude Code, prêts à installer en local ou dans un environnement cloud. Un seul script les copie au bon endroit.

Guide d'utilisation (méthode, styles, prompts, Voice Studio) : [Créer des vidéos animées avec Claude Code — guide pratique](https://claude.ai/artifact/XhTHgM9VqPRhZiqXy8EJQE).

## Contenu

### Vidéo et motion design — `skills/video/`

| Skill | À quoi il sert | Origine | Licence |
| --- | --- | --- | --- |
| `huashu-motion` | Films de lancement, explainers, animation calée sur une voix ; outil `om` (voix, son, rendu, contrôle qualité) | alchaincyf | voir `SOURCES.md` |
| `huashu-art-motion` | Styles d'artistes et d'époques, 9 grammaires d'explainer, procédure stricte avec contrôles qualité | alchaincyf | MIT |
| `take-one` | Film complet « studio » (12 rôles), routes chiffrées, relecteur, salle de revue | Tal Siach | MIT |
| `reanimate` | Cloner une animation web (site, GIF, Lottie) dans votre code, vérifiée image par image | Niaz Morshed | MIT |
| `rossark-motion-skill` | Donner vie à des illustrations, mascottes, icônes (React Native, SwiftUI, web) | rossark0 | MIT |
| `infographie-brute` | Style data-journalisme : fond sombre grainé, pictogrammes, canevas infini + caméra | Créé pour ce projet | — |
| `video-depuis-un-site` | Vidéo animée de 30 à 60 s à partir d'un site (collage papier, voix off, musique, sous-titres) | Plugin du compte | voir `SOURCES.md` |
| `video-styles-et-heros` | Choisir ou créer le style visuel et le héros d'une vidéo en code | Plugin du compte | voir `SOURCES.md` |
| `video-voix-off` | Écrire, générer et minuter la voix off, sans clé d'API | Plugin du compte | voir `SOURCES.md` |
| `video-sous-titres` | Transcriptions et sous-titres multilingues (SRT, VTT, pistes MP4) | Plugin du compte | voir `SOURCES.md` |
| `video-controles-qualite` | Vérifier et améliorer une vidéo générée en code | Plugin du compte | voir `SOURCES.md` |
| `video-lecteur-de-references` | Lire une vidéo de référence par planches contact | Plugin du compte | voir `SOURCES.md` |
| `video-panorama-outils` | Choisir les outils pour fabriquer une vidéo avec Claude | Plugin du compte | voir `SOURCES.md` |
| `video-assets-comfyui` | Générer des assets en local avec ComfyUI (expérimental, non testé) | Plugin du compte | voir `SOURCES.md` |

### Design — `skills/design/` et `plugins/design/`

| Skill | À quoi il sert | Origine | Licence |
| --- | --- | --- | --- |
| `design-deslopifier` | Revoir et redessiner des interfaces, slides ou visuels qui font « générés par IA » | Plugin du compte | voir `SOURCES.md` |
| `frontend-design` | Direction visuelle pour des interfaces : typographie, choix esthétiques non génériques | Anthropic | Apache 2.0 |
| `canvas-design` | Créer des visuels en PNG ou PDF à partir d'une philosophie de design | Anthropic | Apache 2.0 |
| `theme-factory` | Appliquer un thème à des slides, documents, pages HTML | Anthropic | Apache 2.0 |
| `web-artifacts-builder` | Construire des pages HTML complexes (React, Tailwind, shadcn/ui) | Anthropic | Apache 2.0 |
| `algorithmic-art` | Art génératif avec p5.js | Anthropic | Apache 2.0 |
| `slack-gif-creator` | GIF animés optimisés pour Slack | Anthropic | Apache 2.0 |
| `paint` | Peindre une image façon aquarelle en code | Anthropic | Apache 2.0 |
| Plugin `design` (7 skills) | `accessibility-review`, `design-critique`, `design-handoff`, `design-system`, `research-synthesis`, `user-research`, `ux-copy` | Anthropic | voir `SOURCES.md` |

Non inclus, volontairement :

- `video-making` (Anthropic) : licence propriétaire « All rights reserved », non redistribuable. Il reste disponible directement dans Claude.
- `artifact-design`, `artifact-diagramming`, `dataviz` : intégrés à Claude Code, ce ne sont pas des fichiers à installer.

## Installation en local (Claude Code sur votre ordinateur)

Prérequis pour les skills vidéo : Node 18 ou plus, ffmpeg, Google Chrome. Certains skills demandent aussi `uv` (Python) ou `bun` ; leur `SKILL.md` le précise.

macOS ou Linux :

```bash
git clone https://github.com/Polokrik/vid-o-test.git
```

```bash
cd vid-o-test && ./install.sh
```

Windows : lancez les mêmes commandes dans Git Bash. Sinon, copiez à la main chaque dossier de `skills/video/`, `skills/design/` et `plugins/design/skills/` dans `%USERPROFILE%\.claude\skills\`.

Redémarrez ensuite Claude Code. Pour n'installer qu'une famille : `./install.sh video` ou `./install.sh design`.

## Installation dans l'environnement cloud (claude.ai/code)

L'environnement cloud est effacé à chaque session : les skills doivent être réinstallés au démarrage.

1. Dans les réglages de l'environnement, ajoutez ce dépôt à la liste des dépôts.
2. Dans **Setup script**, ajoutez :

```bash
if [ -d vid-o-test ]; then bash vid-o-test/install.sh; fi
```

3. Démarrez une nouvelle session avec ce dépôt sélectionné.

## Utiliser un skill

Tapez `/nom-du-skill` suivi de la demande, par exemple `/huashu-motion Explainer de 30 s sur [sujet], 16:9.`, ou nommez le skill dans votre phrase. Sans nom, Claude choisit d'après les descriptions, et peut se tromper quand plusieurs skills couvrent la même demande.

## Mettre à jour

- Ce dépôt : `git pull`, puis `./install.sh`.
- Un skill tiers depuis sa source : voir `SOURCES.md` (dépôt d'origine et version copiée), puis recopier son dossier ici.

## Points d'attention

- Un skill est du code exécuté avec vos droits. Relisez un skill tiers avant de le mettre à jour.
- Le plugin `design` contient un `.mcp.json` qui déclare des connecteurs (Slack, Figma, Linear, Asana, Atlassian, Notion…). Ils ne fonctionnent qu'après autorisation dans les réglages de connecteurs de claude.ai.
- Les skills `video-*` et `design-deslopifier` viennent de plugins de votre compte claude.ai ; ce dépôt en est une copie datée.
