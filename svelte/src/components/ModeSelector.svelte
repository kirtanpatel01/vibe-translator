<script>
  import { timer, MODES } from '../stores/timerStore.js';

  const { mode } = timer;

  const modes = [
    { key: MODES.WORK, label: 'Focus' },
    { key: MODES.SHORT_BREAK, label: 'Short Break' },
    { key: MODES.LONG_BREAK, label: 'Long Break' },
  ];
</script>

<div class="mode-selector">
  {#each modes as m}
    <button
      class="mode-tab"
      class:active={$mode === m.key}
      on:click={() => timer.switchMode(m.key)}
    >
      {m.label}
    </button>
  {/each}
</div>

<style>
  .mode-selector {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.25rem;
    background: var(--surface-secondary);
    border-radius: 12px;
    max-width: 380px;
    margin: 0 auto;
  }

  .mode-tab {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .mode-tab:hover {
    color: var(--text-primary);
  }

  .mode-tab.active {
    background: var(--surface-primary);
    color: var(--text-primary);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-weight: 600;
  }
</style>
