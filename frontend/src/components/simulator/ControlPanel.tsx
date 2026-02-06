interface ControlPanelProps {
  isActive: boolean;
  isAnalyzing: boolean;
  onToggle: () => void;
  stats: {
    intercepted: number;
    clean: number;
    threatLevel: 'Low' | 'Medium' | 'High';
  };
  categoryBreakdown: Record<string, number>;
}

export default function ControlPanel({
  isActive,
  isAnalyzing,
  onToggle,
  stats,
  categoryBreakdown,
}: ControlPanelProps) {
  const threatLevelColors = {
    Low: 'text-green-600 bg-green-100',
    Medium: 'text-yellow-600 bg-yellow-100',
    High: 'text-red-600 bg-red-100',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ZenShield Control</h2>

      {/* Status */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-4 h-4 rounded-full ${
              isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}
          ></div>
          <span className="text-lg font-semibold">
            {isAnalyzing
              ? 'Analyzing...'
              : isActive
              ? 'Protection Active'
              : 'Protection Off'}
          </span>
        </div>

        <button
          onClick={onToggle}
          disabled={isAnalyzing}
          className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
            isAnalyzing
              ? 'bg-gray-400 cursor-not-allowed'
              : isActive
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Analyzing with Gemini...</span>
            </div>
          ) : isActive ? (
            'Deactivate Shield'
          ) : (
            'Activate Shield'
          )}
        </button>
      </div>

      {/* Stats */}
      {isActive && (
        <>
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Real-time Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Intercepted</span>
                <span className="text-2xl font-bold text-red-600">
                  {stats.intercepted}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Clean</span>
                <span className="text-2xl font-bold text-green-600">
                  {stats.clean}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Threat Level</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    threatLevelColors[stats.threatLevel]
                  }`}
                >
                  {stats.threatLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Category Breakdown
            </h3>
            <div className="space-y-2">
              {Object.entries(categoryBreakdown).map(([category, count]) => (
                <div
                  key={category}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600 capitalize">
                    {category.replace('_', ' ')}
                  </span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
