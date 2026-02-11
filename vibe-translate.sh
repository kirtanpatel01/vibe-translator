#!/bin/bash
set -euo pipefail

# ─────────────────────────────────────────────
# Vibe Translator — One Prompt, Five Stacks
# Powered by Oz Cloud Agents
# ─────────────────────────────────────────────

PROMPT="${1:-}"

if [ -z "$PROMPT" ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  Vibe Translator"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "  Usage: ./vibe-translate.sh '<your app idea>'"
  echo ""
  echo "  Examples:"
  echo "    ./vibe-translate.sh 'Build a pomodoro timer with dark mode'"
  echo "    ./vibe-translate.sh 'Build a kanban board with drag-and-drop'"
  echo "    ./vibe-translate.sh 'Build a markdown editor with live preview'"
  echo ""
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Vibe Translator"
echo "  Prompt: ${PROMPT}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ─────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────

declare -a STACKS=(
  "react-tailwind"
  "svelte-css"
  "vue-tailwind"
  "vanilla-html-css-js"
)

declare -a DIRS=(
  "react"
  "svelte"
  "vue"
  "vanilla"
)

declare -a INSTRUCTIONS=(
  "Build this app using React with Tailwind CSS for styling. Create the project in the /react directory using Vite as the bundler. Structure it with clean, reusable components. Include a package.json with all dependencies. The app should be fully functional and production-quality."

  "Build this app using Svelte with vanilla CSS for styling. Create the project in the /svelte directory using Vite as the bundler. Use Svelte stores for state management where appropriate. Include a package.json with all dependencies. The app should be fully functional and production-quality."

  "Build this app using Vue 3 with Tailwind CSS for styling. Create the project in the /vue directory using Vite as the bundler. Use the Composition API with <script setup> syntax. Include a package.json with all dependencies. The app should be fully functional and production-quality."

  "Build this app using only vanilla HTML, CSS, and JavaScript with zero dependencies. Create the project in the /vanilla directory with an index.html, style.css, and script.js. It should work by simply opening index.html in a browser. Keep it clean and well-structured."
)

declare -a TASK_IDS=()

# ─────────────────────────────────────────────
# Phase 1: Launch builder agents (1-4) in parallel
# ─────────────────────────────────────────────

echo "[Phase 1] Launching 4 builder agents in parallel..."
echo ""

for i in "${!STACKS[@]}"; do
  STACK="${STACKS[$i]}"
  DIR="${DIRS[$i]}"
  INSTRUCTION="${INSTRUCTIONS[$i]}"

  TASK_ID=$(oz task create \
    --environment vibe-translator \
    --prompt "You are a senior frontend developer. The user wants you to build an app based on this description: '${PROMPT}'.

${INSTRUCTION}

IMPORTANT:
- Work ONLY in the /${DIR} directory
- When finished, create a new git branch called 'vibe/${STACK}'
- Commit all your files with a descriptive message
- Push the branch to origin
- Do NOT modify files outside your assigned directory" \
    --background \
    --name "vibe-${STACK}" \
    --output json | jq -r '.id')

  TASK_IDS+=("$TASK_ID")
  echo "  [+] Agent ${STACK} launched (task: ${TASK_ID})"
done

echo ""
echo "[Phase 1] All 4 builder agents are running!"
echo ""

# ─────────────────────────────────────────────
# Wait for Phase 1 to complete
# ─────────────────────────────────────────────

echo "[Waiting] Monitoring builder agents..."
echo ""

for i in "${!TASK_IDS[@]}"; do
  TASK_ID="${TASK_IDS[$i]}"
  STACK="${STACKS[$i]}"

  echo "  Waiting for ${STACK} (${TASK_ID})..."
  oz task wait "$TASK_ID"

  STATUS=$(oz task get "$TASK_ID" --output json | jq -r '.status')
  if [ "$STATUS" = "completed" ]; then
    echo "  [done] ${STACK} completed successfully!"
  else
    echo "  [warn] ${STACK} finished with status: ${STATUS}"
  fi
done

echo ""
echo "[Phase 1] All builders finished!"
echo ""

# ─────────────────────────────────────────────
# Phase 2: Launch the comparison agent (Agent 5)
# ─────────────────────────────────────────────

echo "[Phase 2] Launching comparison agent..."
echo ""

COMPARE_TASK_ID=$(oz task create \
  --environment vibe-translator \
  --prompt "You are a senior frontend architect and code reviewer. Your job is to compare 4 different implementations of the same app.

The original app request was: '${PROMPT}'

The 4 implementations are on these branches:
  1. vibe/react-tailwind       (React + Tailwind CSS)     -> /react directory
  2. vibe/svelte-css           (Svelte + Vanilla CSS)     -> /svelte directory
  3. vibe/vue-tailwind         (Vue 3 + Tailwind CSS)     -> /vue directory
  4. vibe/vanilla-html-css-js  (Vanilla HTML/CSS/JS)      -> /vanilla directory

INSTRUCTIONS:

1. Fetch all remote branches:
   git fetch --all

2. For each branch, checkout and carefully review the code in its directory.

3. Evaluate each implementation on these criteria (score 1-10 for each):
   - Code Quality: Clean structure, readability, best practices
   - Completeness: Does it fully implement the requested features?
   - UI/UX Design: Visual quality, responsiveness, accessibility
   - Performance: Bundle size considerations, rendering efficiency
   - Developer Experience: How easy to maintain and extend

4. Create the following files in the /comparison directory on a NEW branch called 'vibe/comparison-report':

FILE 1 — /comparison/report.md:
A detailed markdown report with:
- Executive summary (2-3 sentences)
- Side-by-side comparison table with all scores
- Detailed analysis per implementation (strengths and weaknesses)
- Winner declaration with justification
- 'Which stack for which scenario' recommendations

FILE 2 — /comparison/scores.json:
{
  \"prompt\": \"<the original prompt>\",
  \"generated_at\": \"<ISO 8601 timestamp>\",
  \"implementations\": {
    \"react-tailwind\": {
      \"code_quality\": <1-10>,
      \"completeness\": <1-10>,
      \"ui_ux_design\": <1-10>,
      \"performance\": <1-10>,
      \"developer_experience\": <1-10>,
      \"total\": <sum of above>,
      \"summary\": \"<one line summary>\"
    },
    \"svelte-css\": { ... },
    \"vue-tailwind\": { ... },
    \"vanilla-html-css-js\": { ... }
  },
  \"winner\": \"<stack-name>\",
  \"verdict\": \"<2-3 sentence justification>\"
}

FILE 3 — /comparison/index.html:
A beautiful standalone HTML comparison dashboard that:
- Displays the original prompt at the top
- Shows a visual scorecard for each implementation using bar charts (pure CSS or inline SVG)
- Highlights the winner with a trophy/crown visual
- Uses a responsive dark-mode design
- Works by opening the file directly in a browser (zero dependencies)
- Includes a summary verdict section at the bottom

5. Commit all files with a descriptive message and push the 'vibe/comparison-report' branch to origin." \
  --background \
  --name "vibe-comparison-judge" \
  --output json | jq -r '.id')

echo "  [+] Comparison agent launched (task: ${COMPARE_TASK_ID})"
echo ""
echo "[Waiting] Waiting for comparison agent..."

oz task wait "$COMPARE_TASK_ID"

COMPARE_STATUS=$(oz task get "$COMPARE_TASK_ID" --output json | jq -r '.status')
echo ""
if [ "$COMPARE_STATUS" = "completed" ]; then
  echo "  [done] Comparison agent completed successfully!"
else
  echo "  [warn] Comparison agent finished with status: ${COMPARE_STATUS}"
fi

# ─────────────────────────────────────────────
# Done!
# ─────────────────────────────────────────────

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Vibe Translation Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Branches created:"
echo "    - vibe/react-tailwind"
echo "    - vibe/svelte-css"
echo "    - vibe/vue-tailwind"
echo "    - vibe/vanilla-html-css-js"
echo "    - vibe/comparison-report"
echo ""
echo "  View the comparison:"
echo "    git fetch --all"
echo "    git checkout vibe/comparison-report"
echo "    open comparison/index.html"
echo "    cat comparison/report.md"
echo ""
echo "  Open PRs:"
echo "    ./open-prs.sh"
echo ""
