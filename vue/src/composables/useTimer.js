import { ref, computed, onUnmounted } from 'vue'

const MODES = {
  work: { label: 'Work', duration: 25 * 60, color: 'pomodoro-work' },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: 'pomodoro-short-break' },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: 'pomodoro-long-break' },
}

export function useTimer() {
  const mode = ref('work')
  const timeRemaining = ref(MODES.work.duration)
  const isRunning = ref(false)
  const completedSessions = ref(0)
  let intervalId = null

  const currentMode = computed(() => MODES[mode.value])
  const totalDuration = computed(() => MODES[mode.value].duration)

  const progress = computed(() => {
    return ((totalDuration.value - timeRemaining.value) / totalDuration.value) * 100
  })

  const formattedTime = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60)
    const seconds = timeRemaining.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })

  function tick() {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      complete()
    }
  }

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    intervalId = setInterval(tick, 1000)
  }

  function pause() {
    isRunning.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function reset() {
    pause()
    timeRemaining.value = MODES[mode.value].duration
  }

  function complete() {
    pause()

    if (mode.value === 'work') {
      completedSessions.value++
      if (completedSessions.value % 4 === 0) {
        switchMode('longBreak')
      } else {
        switchMode('shortBreak')
      }
    } else {
      switchMode('work')
    }

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: `${MODES[mode.value].label} session started!`,
        icon: '🍅',
      })
    }
  }

  function switchMode(newMode) {
    pause()
    mode.value = newMode
    timeRemaining.value = MODES[newMode].duration
  }

  function skip() {
    complete()
  }

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return {
    mode,
    currentMode,
    timeRemaining,
    totalDuration,
    isRunning,
    completedSessions,
    progress,
    formattedTime,
    start,
    pause,
    reset,
    switchMode,
    skip,
  }
}
