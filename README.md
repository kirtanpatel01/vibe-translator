# Vibe Translator

One prompt. Five stacks. Powered by [Oz Cloud Agents](https://www.warp.dev/oz).

Describe an app in plain English. Oz spawns 5 parallel agents that each build it in a different framework, then a judge agent compares all results.

## Quick Start

```bash
# 1. Login to Warp
warp login

# 2. Register the environment
oz environment create --file oz-environment.yaml

# 3. Run it
./vibe-translate.sh "Build me a pomodoro timer with dark mode"

# 4. Monitor agents
oz task list

# 5. Open PRs when done
./open-prs.sh
```

## How It Works

```
 Your Prompt
      |
      v
 vibe-translate.sh
      |
      +---> [Agent 1] React + Tailwind       ---> vibe/react-tailwind
      +---> [Agent 2] Svelte + CSS            ---> vibe/svelte-css
      +---> [Agent 3] Vue + Tailwind          ---> vibe/vue-tailwind
      +---> [Agent 4] Vanilla HTML/CSS/JS     ---> vibe/vanilla-html-css-js
      |
      v  (waits for all 4)
      |
      +---> [Agent 5] Comparison Judge        ---> vibe/comparison-report
```

## Agents

| Agent | Stack | Directory | Branch |
|-------|-------|-----------|--------|
| 1 | React + Tailwind CSS | `/react` | `vibe/react-tailwind` |
| 2 | Svelte + Vanilla CSS | `/svelte` | `vibe/svelte-css` |
| 3 | Vue 3 + Tailwind CSS | `/vue` | `vibe/vue-tailwind` |
| 4 | Vanilla HTML/CSS/JS | `/vanilla` | `vibe/vanilla-html-css-js` |
| 5 | Comparison Judge | `/comparison` | `vibe/comparison-report` |

## Output

After all agents finish you get:

- **4 branches** each with a fully built app in a different stack
- **`comparison/report.md`** — detailed side-by-side analysis with scores
- **`comparison/scores.json`** — machine-readable structured scores
- **`comparison/index.html`** — visual comparison dashboard (open in browser)

## Example Prompts

```bash
./vibe-translate.sh "Build a calculator with a clean modern design"
./vibe-translate.sh "Build a markdown note-taking app with live preview and local storage"
./vibe-translate.sh "Build a kanban board with drag-and-drop and dark/light theme toggle"
./vibe-translate.sh "Build a weather dashboard with 5-day forecast and city search"
```

## Requirements

- [Warp](https://www.warp.dev/) with Oz CLI
- Warp account with 20+ credits
- [GitHub CLI](https://cli.github.com/) (`gh`)
- Git with push access

## Full Guide

See [vibe-translator-guide.md](../vibe-translator-guide.md) for the complete walkthrough.
