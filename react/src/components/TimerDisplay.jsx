import ProgressRing from './ProgressRing';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function TimerDisplay({ timeLeft, progress, color, label }) {
  return (
    <ProgressRing progress={progress} color={color}>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <span className="text-6xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white">
          {formatTime(timeLeft)}
        </span>
      </div>
    </ProgressRing>
  );
}
