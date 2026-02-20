<script setup>
import { useDarkMode } from './composables/useDarkMode.js'
import PomodoroTimer from './components/PomodoroTimer.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'

const { isDark, toggle } = useDarkMode()
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-300
           bg-gray-50 dark:bg-gray-900"
  >
    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-4">
      <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        🍅 Pomodoro
      </h1>
      <DarkModeToggle :is-dark="isDark" @toggle="toggle" />
    </header>

    <!-- Main content -->
    <main class="flex items-center justify-center px-4 pt-8 sm:pt-16">
      <PomodoroTimer />
    </main>

    <!-- Footer -->
    <footer class="fixed bottom-0 inset-x-0 py-4 text-center">
      <p class="text-xs text-gray-400 dark:text-gray-600">
        Stay focused. Take breaks. Repeat.
      </p>
    </footer>
  </div>
</template>
