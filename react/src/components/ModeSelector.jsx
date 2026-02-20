const MODE_CONFIG = [
  { key: 'work', label: 'Work' },
  { key: 'shortBreak', label: 'Short Break' },
  { key: 'longBreak', label: 'Long Break' },
];

const ACTIVE_STYLES = {
  work: 'bg-red-500 text-white shadow-lg shadow-red-500/25',
  shortBreak: 'bg-green-500 text-white shadow-lg shadow-green-500/25',
  longBreak: 'bg-blue-500 text-white shadow-lg shadow-blue-500/25',
};

export default function ModeSelector({ currentMode, onModeChange }) {
  return (
    <div className="flex gap-1 rounded-2xl bg-gray-100 p-1.5 dark:bg-gray-800/80">
      {MODE_CONFIG.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onModeChange(key)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
            currentMode === key
              ? ACTIVE_STYLES[key]
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
