const COLOR_MAP = {
  red: {
    stroke: 'stroke-red-500',
    track: 'stroke-red-500/10 dark:stroke-red-500/20',
    glow: 'drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]',
  },
  green: {
    stroke: 'stroke-green-500',
    track: 'stroke-green-500/10 dark:stroke-green-500/20',
    glow: 'drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]',
  },
  blue: {
    stroke: 'stroke-blue-500',
    track: 'stroke-blue-500/10 dark:stroke-blue-500/20',
    glow: 'drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]',
  },
};

export default function ProgressRing({
  progress,
  color = 'red',
  size = 280,
  strokeWidth = 8,
  children,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;
  const colors = COLOR_MAP[color] || COLOR_MAP.red;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className={`-rotate-90 ${progress > 0 ? colors.glow : ''} transition-[filter] duration-500`}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={`${colors.track} transition-colors duration-500`}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${colors.stroke} transition-all duration-500 ease-linear`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
