import { writable } from 'svelte/store';

function createThemeStore() {
  const storedTheme =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('pomodoro-theme')
      : null;
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = storedTheme || (prefersDark ? 'dark' : 'light');

  const { subscribe, update, set } = writable(initial);

  return {
    subscribe,
    toggle() {
      update((current) => {
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('pomodoro-theme', next);
        return next;
      });
    },
    set(value) {
      localStorage.setItem('pomodoro-theme', value);
      set(value);
    },
  };
}

export const theme = createThemeStore();
