export default function SessionCounter({ count }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span className="font-medium">Sessions</span>
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
              i < (count % 4)
                ? 'bg-red-500 shadow-sm shadow-red-500/50'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
      <span className="font-bold tabular-nums text-gray-700 dark:text-gray-300">
        {count}
      </span>
    </div>
  );
}
