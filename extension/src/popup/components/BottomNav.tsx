interface BottomNavProps {
  isActive?: boolean;
}

export function BottomNav({ isActive = false }: BottomNavProps) {
  return (
    <div className="border-t border-gray-200 px-6 py-4 mt-auto">
      <div className="flex items-center justify-between text-sm">
        <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Dashboard
        </button>
        <span className="text-gray-300">|</span>
        <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Interception Logs
        </button>
      </div>
      {isActive && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          <span className="text-xs text-red-600 font-semibold uppercase tracking-wide">
            Active
          </span>
        </div>
      )}
    </div>
  );
}
