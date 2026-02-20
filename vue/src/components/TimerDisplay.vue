<script setup>
import { computed } from 'vue'

const props = defineProps({
  formattedTime: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
})

const radius = 120
const circumference = 2 * Math.PI * radius

const strokeDashoffset = computed(() => {
  return circumference - (props.progress / 100) * circumference
})

const strokeColor = computed(() => {
  switch (props.mode) {
    case 'work':
      return '#ef4444'
    case 'shortBreak':
      return '#22c55e'
    case 'longBreak':
      return '#3b82f6'
    default:
      return '#ef4444'
  }
})
</script>

<template>
  <div class="relative flex items-center justify-center">
    <svg class="transform -rotate-90 w-64 h-64 sm:w-72 sm:h-72" viewBox="0 0 260 260">
      <!-- Background circle -->
      <circle
        cx="130"
        cy="130"
        :r="radius"
        fill="none"
        stroke="currentColor"
        class="text-gray-200 dark:text-gray-700"
        stroke-width="8"
      />
      <!-- Progress circle -->
      <circle
        cx="130"
        cy="130"
        :r="radius"
        fill="none"
        :stroke="strokeColor"
        stroke-width="8"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        class="transition-all duration-1000 ease-linear"
      />
    </svg>
    <!-- Time display -->
    <div class="absolute inset-0 flex items-center justify-center">
      <span
        class="text-6xl sm:text-7xl font-mono font-bold tracking-wider
               text-gray-800 dark:text-gray-100"
      >
        {{ formattedTime }}
      </span>
    </div>
  </div>
</template>
