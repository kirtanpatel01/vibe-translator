/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pomodoro: {
          work: '#ef4444',
          'short-break': '#22c55e',
          'long-break': '#3b82f6',
        },
      },
    },
  },
  plugins: [],
}
