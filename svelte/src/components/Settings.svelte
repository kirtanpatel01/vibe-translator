<script>
  import { timer, MODES } from '../stores/timerStore.js';

  const { durations } = timer;

  export let open = false;

  function handleDurationChange(modeKey, event) {
    const minutes = parseInt(event.target.value, 10);
    if (!isNaN(minutes) && minutes >= 1 && minutes <= 120) {
      timer.updateDuration(modeKey, minutes * 60);
    }
  }

  function close() {
    open = false;
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="settings-backdrop" on:click={close} on:keydown={close} role="presentation"></div>
  <div class="settings-panel">
    <div class="settings-header">
      <h3>Settings</h3>
      <button class="settings-close" on:click={close} title="Close">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>

    <div class="settings-body">
      <label class="setting-item">
        <span class="setting-label">Focus (min)</span>
        <input
          class="setting-input"
          type="number"
          min="1"
          max="120"
          value={$durations[MODES.WORK] / 60}
          on:change={(e) => handleDurationChange(MODES.WORK, e)}
        />
      </label>

      <label class="setting-item">
        <span class="setting-label">Short Break (min)</span>
        <input
          class="setting-input"
          type="number"
          min="1"
          max="60"
          value={$durations[MODES.SHORT_BREAK] / 60}
          on:change={(e) => handleDurationChange(MODES.SHORT_BREAK, e)}
        />
      </label>

      <label class="setting-item">
        <span class="setting-label">Long Break (min)</span>
        <input
          class="setting-input"
          type="number"
          min="1"
          max="60"
          value={$durations[MODES.LONG_BREAK] / 60}
          on:change={(e) => handleDurationChange(MODES.LONG_BREAK, e)}
        />
      </label>
    </div>
  </div>
{/if}

<style>
  .settings-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }

  .settings-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--surface-primary);
    border-radius: 16px;
    padding: 1.5rem;
    width: 90%;
    max-width: 340px;
    z-index: 11;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border);
  }

  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .settings-header h3 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--text-primary);
  }

  .settings-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0.25rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }

  .settings-close:hover {
    color: var(--text-primary);
  }

  .settings-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .setting-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .setting-input {
    width: 72px;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface-secondary);
    color: var(--text-primary);
    font-size: 0.9rem;
    text-align: center;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .setting-input:focus {
    border-color: var(--accent);
  }

  .setting-input::-webkit-inner-spin-button,
  .setting-input::-webkit-outer-spin-button {
    opacity: 1;
  }
</style>
