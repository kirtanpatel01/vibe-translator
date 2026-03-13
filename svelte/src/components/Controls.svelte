<script>
  import { timer } from '../stores/timerStore.js';

  const { isRunning } = timer;
</script>

<div class="controls">
  <button class="btn btn-secondary" on:click={timer.reset} title="Reset">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  </button>

  {#if $isRunning}
    <button class="btn btn-primary" on:click={timer.pause} title="Pause">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
    </button>
  {:else}
    <button class="btn btn-primary" on:click={timer.start} title="Start">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <polygon points="6,4 20,12 6,20" />
      </svg>
    </button>
  {/if}

  <button class="btn btn-secondary" on:click={timer.skip} title="Skip">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <polygon points="5,4 15,12 5,20" />
      <rect x="17" y="4" width="2" height="16" />
    </svg>
  </button>
</div>

<style>
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 0;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease;
    color: var(--text-primary);
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .btn:active {
    transform: scale(0.95);
  }

  .btn-primary {
    width: 72px;
    height: 72px;
    background: var(--accent);
    color: #fff;
    box-shadow: 0 4px 15px var(--accent-shadow);
  }

  .btn-primary:hover {
    box-shadow: 0 6px 20px var(--accent-shadow);
  }

  .btn-secondary {
    width: 48px;
    height: 48px;
    background: var(--surface-secondary);
    color: var(--text-secondary);
  }

  .btn-secondary:hover {
    background: var(--surface-hover);
    color: var(--text-primary);
  }
</style>
