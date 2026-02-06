interface HeaderProps {
  title: string;
  mode: 'daily' | 'crisis' | 'alert';
}

export function Header({ title, mode }: HeaderProps) {
  const iconColor = mode === 'daily' ? '#22c55e' : '#dc2626';

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L4 6V12C4 17.5 7.5 22.5 12 24C16.5 22.5 20 17.5 20 12V6L12 2Z"
            fill={iconColor}
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="#6b7280" strokeWidth="2"/>
          <path d="M10 6V10M10 14H10.01" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}
