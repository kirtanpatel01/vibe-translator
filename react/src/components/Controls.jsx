import { PlayIcon, PauseIcon, ArrowPathIcon } from './Icons';

export default function Controls({ isRunning, onToggle, onReset }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onReset}
        className="btn-ghost rounded-full p-3"
        aria-label="Reset timer"
      >
        <ArrowPathIcon className="h-5 w-5" />
      </button>

      <button
        onClick={onToggle}
        className="btn-primary rounded-full p-5"
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? (
          <PauseIcon className="h-7 w-7" />
        ) : (
          <PlayIcon className="h-7 w-7" />
        )}
      </button>

      {/* Spacer to balance layout */}
      <div className="w-[52px]" />
    </div>
  );
}
