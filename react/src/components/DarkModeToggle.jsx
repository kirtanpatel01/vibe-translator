import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-xl p-2.5 text-gray-500 transition-colors duration-200
                 hover:bg-gray-100 hover:text-gray-700
                 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
