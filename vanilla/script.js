(function () {
  'use strict';

  // ===== Configuration =====
  const MODES = {
    pomodoro: { duration: 25 * 60, label: 'Focus Time' },
    shortBreak: { duration: 5 * 60, label: 'Short Break' },
    longBreak: { duration: 15 * 60, label: 'Long Break' },
  };

  const SESSIONS_BEFORE_LONG_BREAK = 4;
  const RING_CIRCUMFERENCE = 2 * Math.PI * 120; // matches SVG r=120

  // ===== State =====
  let currentMode = 'pomodoro';
  let timeRemaining = MODES.pomodoro.duration;
  let totalTime = MODES.pomodoro.duration;
  let timerInterval = null;
  let isRunning = false;
  let currentSession = 1;

  // ===== DOM Elements =====
  const timerDisplay = document.getElementById('timerDisplay');
  const timerLabel = document.getElementById('timerLabel');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const progressRing = document.getElementById('progressRing');
  const sessionCount = document.getElementById('sessionCount');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const modeTabs = document.querySelectorAll('.mode-tab');

  // ===== Timer Functions =====
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
    document.title = `${formatTime(timeRemaining)} — Pomodoro Timer`;
  }

  function updateProgressRing() {
    const progress = timeRemaining / totalTime;
    const offset = RING_CIRCUMFERENCE * (1 - progress);
    progressRing.style.strokeDashoffset = offset;
  }

  function updateSessionDisplay() {
    sessionCount.textContent = `Session ${currentSession} of ${SESSIONS_BEFORE_LONG_BREAK}`;
  }

  function switchMode(mode) {
    stopTimer();
    currentMode = mode;
    timeRemaining = MODES[mode].duration;
    totalTime = MODES[mode].duration;
    timerLabel.textContent = MODES[mode].label;

    modeTabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    updateDisplay();
    updateProgressRing();
    startBtn.textContent = 'Start';
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.textContent = 'Pause';

    timerInterval = setInterval(function () {
      timeRemaining--;

      if (timeRemaining < 0) {
        stopTimer();
        onTimerComplete();
        return;
      }

      updateDisplay();
      updateProgressRing();
    }, 1000);
  }

  function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.textContent = 'Start';
  }

  function resetTimer() {
    stopTimer();
    timeRemaining = MODES[currentMode].duration;
    totalTime = MODES[currentMode].duration;
    updateDisplay();
    updateProgressRing();
  }

  function onTimerComplete() {
    playNotificationSound();

    if (currentMode === 'pomodoro') {
      if (currentSession >= SESSIONS_BEFORE_LONG_BREAK) {
        currentSession = 1;
        switchMode('longBreak');
      } else {
        currentSession++;
        switchMode('shortBreak');
      }
    } else {
      switchMode('pomodoro');
    }

    updateSessionDisplay();
  }

  function playNotificationSound() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var notes = [523.25, 659.25, 783.99]; // C5, E5, G5

      notes.forEach(function (freq, i) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.15);
        osc.stop(ctx.currentTime + i * 0.15 + 0.4);
      });
    } catch (e) {
      // Audio not supported — fail silently
    }
  }

  // ===== Theme Toggle =====
  function getStoredTheme() {
    return localStorage.getItem('pomodoro-theme') || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('pomodoro-theme', theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // ===== Event Listeners =====
  startBtn.addEventListener('click', function () {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  resetBtn.addEventListener('click', resetTimer);

  modeTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchMode(this.dataset.mode);
    });
  });

  themeToggle.addEventListener('click', toggleTheme);

  // ===== Initialization =====
  setTheme(getStoredTheme());
  updateDisplay();
  updateProgressRing();
  updateSessionDisplay();
})();
