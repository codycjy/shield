interface ShieldIconProps {
  mode: 'daily' | 'crisis' | 'alert';
  showCheckmark?: boolean;
}

export function ShieldIcon({ mode, showCheckmark = true }: ShieldIconProps) {
  const color = mode === 'daily' ? '#22c55e' : '#dc2626';
  const ringColor = mode === 'daily' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(220, 38, 38, 0.1)';

  return (
    <div className="relative flex items-center justify-center my-8">
      {/* Animated ring */}
      <div
        className="absolute w-40 h-40 rounded-full animate-pulse"
        style={{ backgroundColor: ringColor }}
      />

      {/* Shield */}
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" className="relative z-10">
        <path
          d="M48 8L16 24V48C16 70 30 90 48 96C66 90 80 70 80 48V24L48 8Z"
          fill={color}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {showCheckmark && (
          <path
            d="M36 48L44 56L60 40"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}
