import { writable, derived } from 'svelte/store';

export const MODES = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

const DEFAULT_DURATIONS = {
  [MODES.WORK]: 25 * 60,
  [MODES.SHORT_BREAK]: 5 * 60,
  [MODES.LONG_BREAK]: 15 * 60,
};

const LONG_BREAK_INTERVAL = 4;

function createTimerStore() {
  const durations = writable({ ...DEFAULT_DURATIONS });
  const mode = writable(MODES.WORK);
  const timeRemaining = writable(DEFAULT_DURATIONS[MODES.WORK]);
  const isRunning = writable(false);
  const completedSessions = writable(0);

  let intervalId = null;

  function tick() {
    timeRemaining.update((t) => {
      if (t <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        isRunning.set(false);
        playNotification();
        return 0;
      }
      return t - 1;
    });
  }

  function playNotification() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.8);

      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.frequency.setValueAtTime(1000, audioCtx.currentTime);
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        osc2.start(audioCtx.currentTime);
        osc2.stop(audioCtx.currentTime + 0.8);
      }, 300);
    } catch (e) {
      // Audio not available
    }
  }

  function start() {
    if (intervalId) return;
    isRunning.set(true);
    intervalId = setInterval(tick, 1000);
  }

  function pause() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isRunning.set(false);
  }

  function reset() {
    pause();
    let currentMode;
    let currentDurations;
    mode.subscribe((m) => (currentMode = m))();
    durations.subscribe((d) => (currentDurations = d))();
    timeRemaining.set(currentDurations[currentMode]);
  }

  function switchMode(newMode) {
    pause();
    let currentDurations;
    durations.subscribe((d) => (currentDurations = d))();
    mode.set(newMode);
    timeRemaining.set(currentDurations[newMode]);
  }

  function skip() {
    pause();
    let currentMode;
    let sessions;
    let currentDurations;
    mode.subscribe((m) => (currentMode = m))();
    completedSessions.subscribe((s) => (sessions = s))();
    durations.subscribe((d) => (currentDurations = d))();

    if (currentMode === MODES.WORK) {
      const newSessions = sessions + 1;
      completedSessions.set(newSessions);
      if (newSessions % LONG_BREAK_INTERVAL === 0) {
        mode.set(MODES.LONG_BREAK);
        timeRemaining.set(currentDurations[MODES.LONG_BREAK]);
      } else {
        mode.set(MODES.SHORT_BREAK);
        timeRemaining.set(currentDurations[MODES.SHORT_BREAK]);
      }
    } else {
      mode.set(MODES.WORK);
      timeRemaining.set(currentDurations[MODES.WORK]);
    }
  }

  function updateDuration(modeKey, seconds) {
    durations.update((d) => ({ ...d, [modeKey]: seconds }));
    let currentMode;
    let running;
    mode.subscribe((m) => (currentMode = m))();
    isRunning.subscribe((r) => (running = r))();
    if (currentMode === modeKey && !running) {
      timeRemaining.set(seconds);
    }
  }

  const progress = derived(
    [timeRemaining, durations, mode],
    ([$timeRemaining, $durations, $mode]) => {
      const total = $durations[$mode];
      return total > 0 ? 1 - $timeRemaining / total : 0;
    }
  );

  const formattedTime = derived(timeRemaining, ($time) => {
    const mins = Math.floor($time / 60);
    const secs = $time % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  });

  return {
    mode,
    timeRemaining,
    isRunning,
    completedSessions,
    durations,
    progress,
    formattedTime,
    start,
    pause,
    reset,
    switchMode,
    skip,
    updateDuration,
  };
}

export const timer = createTimerStore();
