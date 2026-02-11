#!/bin/bash
set -euo pipefail

# ─────────────────────────────────────────────
# Clean up all vibe branches (local + remote)
# Use this to reset before a fresh run
# ─────────────────────────────────────────────

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Cleaning up vibe branches"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Make sure we're on main first
git checkout main 2>/dev/null || git checkout -b main

BRANCHES=("react-tailwind" "svelte-css" "vue-tailwind" "vanilla-html-css-js" "comparison-report")

for BRANCH in "${BRANCHES[@]}"; do
  FULL="vibe/${BRANCH}"

  # Delete remote branch
  if git ls-remote --heads origin "$FULL" | grep -q "$FULL"; then
    echo "  Deleting remote: ${FULL}"
    git push origin --delete "$FULL" 2>/dev/null || true
  fi

  # Delete local branch
  if git branch --list "$FULL" | grep -q "$FULL"; then
    echo "  Deleting local:  ${FULL}"
    git branch -D "$FULL" 2>/dev/null || true
  fi
done

# Clean the output directories
echo ""
echo "  Cleaning output directories..."
for DIR in react svelte vue vanilla comparison; do
  if [ -d "$DIR" ]; then
    find "$DIR" -mindepth 1 ! -name '.gitkeep' -delete 2>/dev/null || true
    touch "$DIR/.gitkeep"
    echo "  [cleaned] ${DIR}/"
  fi
done

echo ""
echo "  Done! Ready for a fresh run."
echo ""
