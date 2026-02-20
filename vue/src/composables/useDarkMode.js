import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggle() {
    isDark.value = !isDark.value
  }

  watch(isDark, (val) => {
    applyTheme(val)
    localStorage.setItem('pomodoro-dark-mode', JSON.stringify(val))
  })

  onMounted(() => {
    const stored = localStorage.getItem('pomodoro-dark-mode')
    if (stored !== null) {
      isDark.value = JSON.parse(stored)
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme(isDark.value)
  })

  return { isDark, toggle }
}
