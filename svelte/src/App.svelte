<script>
  import { theme } from './stores/themeStore.js';
  import { timer, MODES } from './stores/timerStore.js';
  import Timer from './components/Timer.svelte';
  import Controls from './components/Controls.svelte';
  import ModeSelector from './components/ModeSelector.svelte';
  import Settings from './components/Settings.svelte';
  import ThemeToggle from './components/ThemeToggle.svelte';

  const { mode, formattedTime } = timer;

  let settingsOpen = false;

  const modeLabels = {
    [MODES.WORK]: 'Focus',
    [MODES.SHORT_BREAK]: 'Short Break',
    [MODES.LONG_BREAK]: 'Long Break',
  };

  $: document.title = `${$formattedTime} - ${modeLabels[$mode]} | Pomodoro`;
</script>

<div class="app" data-theme={$theme}>
  <header class="header">
    <h1 class="logo">Pomodoro</h1>
    <div class="header-actions">
      <button
        class="settings-btn"
        on:click={() => (settingsOpen = !settingsOpen)}
        title="Settings"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
      <ThemeToggle />
    </div>
  </header>

  <main class="main">
    <ModeSelector />
    <Timer />
    <Controls />
  </main>

  <Settings bind:open={settingsOpen} />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    color: var(--text-primary);
    transition: background 0.3s ease, color 0.3s ease;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
  }

  .logo {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .settings-btn {
    background: var(--surface-secondary);
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .settings-btn:hover {
    background: var(--surface-hover);
    color: var(--text-primary);
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 1.5rem 3rem;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
  }
</style>
