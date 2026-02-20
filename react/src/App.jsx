import { useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';
import SessionCounter from './components/SessionCounter';
import DarkModeToggle from './components/DarkModeToggle';

export default function App() {
  const {
    mode,
    timeLeft,
    isRunning,
    sessionsCompleted,
    progress,
    currentMode,
    toggle,
    reset,
    switchMode,
  } = useTimer();

  // Keyboard shortcut: Space to toggle timer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          🍅 Pomodoro
        </h1>
        <DarkModeToggle />
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center gap-10">
        <ModeSelector currentMode={mode} onModeChange={switchMode} />

        <TimerDisplay
          timeLeft={timeLeft}
          progress={progress}
          color={currentMode.color}
          label={currentMode.label}
        />

        <Controls
          isRunning={isRunning}
          onToggle={toggle}
          onReset={reset}
        />

        <SessionCounter count={sessionsCompleted} />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-xs text-gray-400 dark:text-gray-600">
        Press Space to start/pause • Stay focused!
      </footer>
    </div>
  );
}
