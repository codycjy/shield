interface StatusBannerProps {
  mode?: 'daily' | 'crisis' | 'ended';
  onActivateCrisis?: () => void;
  onEndCrisis?: () => void;
  crisisDuration?: string;
  predictedEnd?: string;
}

export default function StatusBanner({
  mode = 'daily',
  onActivateCrisis,
  onEndCrisis,
  crisisDuration = '01:24:30',
  predictedEnd = 'today 18:00',
}: StatusBannerProps) {
  // Daily Mode (Green)
  if (mode === 'daily') {
    return (
      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-emerald-800 font-bold">Daily Protection Active</span>
          <span className="text-emerald-600 text-sm">| System continuously monitoring, no abnormal traffic detected.</span>
        </div>
        <button
          onClick={onActivateCrisis}
          className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-red-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Activate Crisis Mode
        </button>
      </div>
    );
  }

  // Crisis Mode (Red)
  if (mode === 'crisis') {
    return (
      <div className="flex items-center justify-between bg-red-50 border border-red-200 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-ping absolute top-0 left-0"></div>
            <div className="w-3 h-3 rounded-full bg-red-600 relative"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-red-700 font-bold text-lg">Crisis Protection Active</span>
              <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 rounded font-mono">
                Duration {crisisDuration}
              </span>
            </div>
            <p className="text-red-600 text-sm mt-0.5">
              AI predicts attack will subside around <strong>{predictedEnd}</strong>.
            </p>
          </div>
        </div>
        <button
          onClick={onEndCrisis}
          className="bg-white text-green-700 border border-green-200 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-green-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          End Crisis
        </button>
      </div>
    );
  }

  // Ended Mode (Gray)
  return (
    <div className="flex items-center gap-4 bg-gray-100 border border-gray-200 p-4 rounded-xl shadow-inner">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <span className="text-slate-700 font-bold text-lg">Protection Service Ended</span>
        <p className="text-slate-500 text-sm">Your subscription or crisis claims have been exhausted. System has stopped filtering new comments.</p>
      </div>
    </div>
  );
}
