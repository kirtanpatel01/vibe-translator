import { useState, useRef, useCallback, useEffect } from 'react';

const TIMER_MODES = {
  work: { label: 'Work', duration: 25 * 60, color: 'red' },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: 'green' },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: 'blue' },
};

const LONG_BREAK_INTERVAL = 4;

export function useTimer() {
  const [mode, setMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.work.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const totalDuration = TIMER_MODES[mode].duration;
  const progress = 1 - timeLeft / totalDuration;

  // Create audio context for notification sound
  const playNotification = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.15);
      oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio not available
    }
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const switchMode = useCallback(
    (newMode) => {
      stop();
      setMode(newMode);
      setTimeLeft(TIMER_MODES[newMode].duration);
    },
    [stop],
  );

  const handleTimerComplete = useCallback(() => {
    stop();
    playNotification();

    if (mode === 'work') {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);

      if (newSessions % LONG_BREAK_INTERVAL === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('work');
    }
  }, [mode, sessionsCompleted, stop, playNotification, switchMode]);

  const start = useCallback(() => {
    if (timeLeft <= 0) return;
    setIsRunning(true);
  }, [timeLeft]);

  const pause = useCallback(() => {
    stop();
  }, [stop]);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(TIMER_MODES[mode].duration);
  }, [stop, mode]);

  const toggle = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }, [isRunning, pause, start]);

  // Timer tick effect
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Handle timer reaching zero
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }
  }, [timeLeft, isRunning, handleTimerComplete]);

  // Update document title
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.title = `${timeStr} - ${TIMER_MODES[mode].label} | Pomodoro`;

    return () => {
      document.title = 'Pomodoro Timer';
    };
  }, [timeLeft, mode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    mode,
    timeLeft,
    isRunning,
    sessionsCompleted,
    progress,
    totalDuration,
    currentMode: TIMER_MODES[mode],
    modes: TIMER_MODES,
    start,
    pause,
    reset,
    toggle,
    switchMode,
  };
}
