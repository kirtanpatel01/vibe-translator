<script>
  import { timer, MODES } from '../stores/timerStore.js';

  const { mode, formattedTime, progress, completedSessions } = timer;

  const modeLabels = {
    [MODES.WORK]: 'Focus',
    [MODES.SHORT_BREAK]: 'Short Break',
    [MODES.LONG_BREAK]: 'Long Break',
  };

  const CIRCUMFERENCE = 2 * Math.PI * 140;

  $: dashOffset = CIRCUMFERENCE - $progress * CIRCUMFERENCE;

  $: modeClass = $mode === MODES.WORK
    ? 'mode-work'
    : $mode === MODES.SHORT_BREAK
      ? 'mode-short-break'
      : 'mode-long-break';
</script>

<div class="timer {modeClass}">
  <div class="timer-ring-container">
    <svg class="timer-ring" viewBox="0 0 300 300">
      <circle
        class="timer-ring-bg"
        cx="150"
        cy="150"
        r="140"
        fill="none"
        stroke-width="6"
      />
      <circle
        class="timer-ring-progress"
        cx="150"
        cy="150"
        r="140"
        fill="none"
        stroke-width="6"
        stroke-dasharray={CIRCUMFERENCE}
        stroke-dashoffset={dashOffset}
        stroke-linecap="round"
        transform="rotate(-90 150 150)"
      />
    </svg>
    <div class="timer-display">
      <span class="timer-mode-label">{modeLabels[$mode]}</span>
      <span class="timer-time">{$formattedTime}</span>
      <span class="timer-sessions">Session {$completedSessions + 1}</span>
    </div>
  </div>
</div>

<style>
  .timer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
  }

  .timer-ring-container {
    position: relative;
    width: 300px;
    height: 300px;
  }

  .timer-ring {
    width: 100%;
    height: 100%;
  }

  .timer-ring-bg {
    stroke: var(--ring-bg);
    transition: stroke 0.3s ease;
  }

  .timer-ring-progress {
    stroke: var(--accent);
    transition: stroke-dashoffset 0.5s ease, stroke 0.3s ease;
  }

  .mode-short-break .timer-ring-progress {
    stroke: var(--accent-break);
  }

  .mode-long-break .timer-ring-progress {
    stroke: var(--accent-long-break);
  }

  .timer-display {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .timer-mode-label {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
  }

  .timer-time {
    font-size: 4rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--text-primary);
    line-height: 1;
  }

  .timer-sessions {
    font-size: 0.8rem;
    color: var(--text-tertiary);
    margin-top: 0.25rem;
  }

  @media (max-width: 400px) {
    .timer-ring-container {
      width: 240px;
      height: 240px;
    }
    .timer-time {
      font-size: 3rem;
    }
  }
</style>
