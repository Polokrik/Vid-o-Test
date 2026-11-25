#!/usr/bin/env bash
# Installe les skills de ce dépôt dans le dossier de skills de Claude Code.
# Usage : ./install.sh [all|video|design]        (all par défaut)
# Dossier cible : $CLAUDE_SKILLS_DIR, sinon ~/.claude/skills
# Idempotent : chaque skill est remplacé par la version du dépôt.
set -u

ROOT="$(cd "$(dirname "$0")" && pwd)"
WHAT="${1:-all}"
DEST="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
mkdir -p "$DEST"

dirs=()
case "$WHAT" in
  all)    dirs=("$ROOT"/skills/video/*/ "$ROOT"/skills/design/*/ "$ROOT"/plugins/design/skills/*/) ;;
  video)  dirs=("$ROOT"/skills/video/*/) ;;
  design) dirs=("$ROOT"/skills/design/*/ "$ROOT"/plugins/design/skills/*/) ;;
  *) echo "Usage : $0 [all|video|design]" >&2; exit 2 ;;
esac

n=0
for dir in "${dirs[@]}"; do
  [ -f "$dir/SKILL.md" ] || continue
  name="$(basename "$dir")"
  rm -rf "${DEST:?}/$name"
  cp -R "$dir" "$DEST/$name"
  n=$((n + 1))
done

# huashu-motion : son outil « om » doit rester exécutable
[ -f "$DEST/huashu-motion/bin/om" ] && chmod +x "$DEST/huashu-motion/bin/om"

echo "$n skills installés dans $DEST ($WHAT). Redémarrez Claude Code pour les charger."
