import { useState, useRef, useEffect } from 'react';

type Phase = 'normal' | 'crisis' | 'ended';

interface FloatingBallProps {
  isActive: boolean;
  isAnalyzing: boolean;
  phase: Phase;
  stats: {
    intercepted: number;
    clean: number;
    threatLevel: 'Low' | 'Medium' | 'High';
  };
  categoryBreakdown: Record<string, number>;
}

export default function FloatingBall({
  isActive,
  isAnalyzing,
  phase,
  stats,
  categoryBreakdown,
}: FloatingBallProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  // Initialize position to bottom-right
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 180,
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.panel-content')) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 60, dragRef.current.startPosX + deltaX)),
        y: Math.max(0, Math.min(window.innerHeight - 60, dragRef.current.startPosY + deltaY)),
      });
    };

    const handleMouseUp = () => {
      if (isDragging && dragRef.current) {
        const deltaX = Math.abs(position.x - dragRef.current.startPosX);
        const deltaY = Math.abs(position.y - dragRef.current.startPosY);

        // Only toggle if it wasn't a drag (moved less than 5px)
        if (deltaX < 5 && deltaY < 5) {
          setIsExpanded(!isExpanded);
        }
      }
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isExpanded, position]);

  const threatLevelColors = {
    Low: 'text-green-600 bg-green-100',
    Medium: 'text-yellow-600 bg-yellow-100',
    High: 'text-red-600 bg-red-100',
  };

  // Determine orb state directly from phase
  const getOrbState = () => {
    if (phase === 'ended') return 'gray';
    if (phase === 'crisis') return 'red';
    return 'green'; // normal = active protection
  };

  return (
    <div
      ref={ballRef}
      className="fixed z-50 select-none"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* === Energy Orb === */}
      <div className="shield-orb" data-state={getOrbState()}>
        {/* Ambient glow halo */}
        <div className="shield-orb-glow" />

        {/* Ripple rings */}
        <div className="shield-orb-ripple" />
        <div className="shield-orb-ripple shield-orb-ripple-delay" />

        {/* Rotating conic-gradient trail */}
        <div className="shield-orb-trail" />

        {/* Core ball */}
        <div className="shield-orb-core">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>

          {/* Badge for intercepted count */}
          {isActive && stats.intercepted > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ boxShadow: '0 0 10px rgba(239,68,68,0.6), 0 0 20px rgba(239,68,68,0.3)' }}
            >
              {stats.intercepted > 99 ? '99+' : stats.intercepted}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Panel */}
      {isExpanded && (
        <div
          className="panel-content absolute bottom-[72px] right-0 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden"
          style={{ cursor: 'default' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`px-4 py-3 flex items-center justify-between ${
            phase === 'ended'
              ? 'bg-gradient-to-r from-gray-500 to-gray-600'
              : phase === 'crisis'
              ? 'bg-gradient-to-r from-red-600 to-red-700'
              : 'bg-gradient-to-r from-green-600 to-emerald-700'
          }`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-white font-semibold">MindShield</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  phase === 'ended'
                    ? 'bg-gray-400'
                    : phase === 'crisis'
                    ? 'bg-red-500 animate-pulse'
                    : 'bg-green-500 animate-pulse'
                }`}
                style={
                  phase === 'ended'
                    ? {}
                    : phase === 'crisis'
                    ? { boxShadow: '0 0 8px rgba(239,68,68,0.6)' }
                    : { boxShadow: '0 0 8px rgba(34,197,94,0.6)' }
                }
              />
              <span className="text-sm font-medium text-gray-700">
                {isAnalyzing
                  ? 'Analyzing...'
                  : phase === 'ended'
                  ? 'Protection Ended'
                  : phase === 'crisis'
                  ? 'Crisis Mode — Defending'
                  : 'Protection Active'}
              </span>
            </div>

            {/* Phase indicator */}
            <div className={`w-full py-3 rounded-lg font-semibold text-white text-center ${
              phase === 'ended'
                ? 'bg-gray-400'
                : phase === 'crisis'
                ? 'bg-red-600'
                : 'bg-green-600'
            }`}>
              {isAnalyzing ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Analyzing...</span>
                </div>
              ) : phase === 'ended' ? (
                'Shield Deactivated'
              ) : phase === 'crisis' ? (
                'Crisis Defense Active'
              ) : (
                'Shield Active'
              )}
            </div>

            {/* Stats (when active or ended with results) */}
            {(isActive || phase === 'ended') && stats.intercepted > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xl font-bold text-red-600">{stats.intercepted}</div>
                    <div className="text-xs text-gray-500">Blocked</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">{stats.clean}</div>
                    <div className="text-xs text-gray-500">Clean</div>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold px-2 py-1 rounded-full ${threatLevelColors[stats.threatLevel]}`}>
                      {stats.threatLevel}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Threat</div>
                  </div>
                </div>

                {/* Category breakdown */}
                {Object.keys(categoryBreakdown).length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 mb-2">CATEGORIES</div>
                    <div className="space-y-1">
                      {Object.entries(categoryBreakdown).slice(0, 4).map(([category, count]) => (
                        <div key={category} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 capitalize">{category.replace('_', ' ')}</span>
                          <span className="font-medium text-gray-900">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Link to Dashboard */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <a
                href="/dashboard"
                className="flex items-center justify-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <span>Open Dashboard</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
