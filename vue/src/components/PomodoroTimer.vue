<script setup>
import { useTimer } from '../composables/useTimer.js'
import TimerDisplay from './TimerDisplay.vue'
import TimerControls from './TimerControls.vue'

const {
  mode,
  currentMode,
  isRunning,
  completedSessions,
  progress,
  formattedTime,
  start,
  pause,
  reset,
  switchMode,
  skip,
} = useTimer()

const modes = [
  { key: 'work', label: 'Work' },
  { key: 'shortBreak', label: 'Short Break' },
  { key: 'longBreak', label: 'Long Break' },
]
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <!-- Mode selector tabs -->
    <div
      class="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <button
        v-for="m in modes"
        :key="m.key"
        @click="switchMode(m.key)"
        class="px-4 py-2 text-sm font-medium transition-colors duration-200"
        :class="
          mode === m.key
            ? 'bg-gray-800 dark:bg-white text-white dark:text-gray-800'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        "
      >
        {{ m.label }}
      </button>
    </div>

    <!-- Current mode label -->
    <p class="text-lg font-medium text-gray-500 dark:text-gray-400">
      {{ currentMode.label }}
    </p>

    <!-- Timer display -->
    <TimerDisplay
      :formatted-time="formattedTime"
      :progress="progress"
      :mode="mode"
    />

    <!-- Controls -->
    <TimerControls
      :is-running="isRunning"
      @start="start"
      @pause="pause"
      @reset="reset"
      @skip="skip"
    />

    <!-- Session counter -->
    <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <div class="flex gap-1.5">
        <span
          v-for="i in 4"
          :key="i"
          class="w-3 h-3 rounded-full transition-colors duration-300"
          :class="
            i <= completedSessions % 4
              ? 'bg-red-500 dark:bg-red-400'
              : 'bg-gray-300 dark:bg-gray-600'
          "
        />
      </div>
      <span>{{ completedSessions }} sessions completed</span>
    </div>
  </div>
</template>
