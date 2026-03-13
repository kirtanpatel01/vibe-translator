<script setup>
defineProps({
  isRunning: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['start', 'pause', 'reset', 'skip'])
</script>

<template>
  <div class="flex items-center justify-center gap-3">
    <!-- Reset -->
    <button
      @click="$emit('reset')"
      class="p-3 rounded-full transition-colors duration-200
             bg-gray-200 dark:bg-gray-700
             hover:bg-gray-300 dark:hover:bg-gray-600
             text-gray-600 dark:text-gray-300"
      aria-label="Reset timer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Start / Pause -->
    <button
      @click="isRunning ? $emit('pause') : $emit('start')"
      class="p-4 rounded-full transition-all duration-200 transform hover:scale-105
             bg-gray-800 dark:bg-white
             hover:bg-gray-700 dark:hover:bg-gray-100
             text-white dark:text-gray-800
             shadow-lg"
      :aria-label="isRunning ? 'Pause timer' : 'Start timer'"
    >
      <!-- Pause icon -->
      <svg
        v-if="isRunning"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <!-- Play icon -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Skip -->
    <button
      @click="$emit('skip')"
      class="p-3 rounded-full transition-colors duration-200
             bg-gray-200 dark:bg-gray-700
             hover:bg-gray-300 dark:hover:bg-gray-600
             text-gray-600 dark:text-gray-300"
      aria-label="Skip to next session"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
      </svg>
    </button>
  </div>
</template>
