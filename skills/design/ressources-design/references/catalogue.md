# Catalogue des ressources

Statut : `à tester` = ajouté d'après la description de l'utilisateur, jamais ouvert ni essayé ici. Licences et conditions : à vérifier sur chaque site.

| # | Nom | Catégorie | Lien | À quoi ça sert | Accès | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | UX Pilot Motion | motion | https://uxpilot.ai/motion-graphics-software | Décrire une pièce de motion ou coller un site, puis l'exporter en vidéo | Web | à tester |
| 2 | Backgrounds Supply | backgrounds | https://backgrounds.supply/ | Fonds et dégradés pour une page, une app ou un fond d'écran | Web | à tester |
| 3 | Forever Components | bibliothèque | https://forevercomponents.com/connect/ | Composants utilisables dans Claude, Claude Code, Cursor et Codex via un MCP | MCP, déclaré dans `.mcp.json` ; clé dans la variable `FOREVER_COMPONENTS_KEY` | configuré, non testé |
| 4 | HorizonX | assets | https://horizonx.so/ | Fonds animés, textures, mockups à intégrer dans un projet d'agent | Web | à tester |
| 5 | Inspora | inspiration | https://www.inspora.design/ | Exemples triés de sites, logos et icônes d'app comme références | Web | à tester |
| 6 | Recraft | images IA | https://www.recraft.ai/ | Générer images, vecteurs et mockups dans un style fixé | Web (compte) | à tester |
| 7 | Mobbin | référence UI | https://mobbin.com/ | Chercher de vrais écrans d'apps mobiles et web pour un layout | Web (compte) | à tester |
| 8 | pen.dev | canevas de design | https://www.pen.dev/ | Concevoir avec un agent sur un canevas, puis renvoyer le résultat vers le code | Web | à tester |
| 9 | Bencho | composants | https://bencho.dev/ | Essayer des blocs UI React live et les copier dans un projet | Web | à tester |
| 10 | tegaki | animation de texte | https://tegaki.ink/ | Animer n'importe quelle police en écriture manuscrite (React, Svelte, Vue, Solid, Astro, CLI SVG) | npm `tegaki` | installé (voir `docs/tegaki.md`) |

## Notes

- **Forever Components** : serveur `https://forevercomponents.com/mcp`, en-tête `Authorization: Bearer <clé>`. La clé n'est jamais écrite dans le repo : définir `FOREVER_COMPONENTS_KEY` (en local : variable d'environnement ; dans le cloud : variable de l'environnement). Outils : `search_components`, `get_component`, `get_component_code` (consomme le quota), `list_categories`. Quota compte gratuit : 3 designs copiés par jour ; membres : 20.
- Les descriptions viennent de l'utilisateur, pas d'une lecture des sites.
