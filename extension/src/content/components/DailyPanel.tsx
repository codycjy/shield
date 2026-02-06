import React from 'react';

interface DailyPanelProps {
  receivedCount: number;
  blockedCount: number;
  onActivateCrisis: () => void;
}

const DailyPanel: React.FC<DailyPanelProps> = ({
  receivedCount,
  blockedCount,
  onActivateCrisis,
}) => {
  const percentage = receivedCount > 0 ? ((receivedCount - blockedCount) / receivedCount) * 100 : 100;
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 overflow-hidden mb-2">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-white p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-bold text-slate-800">Daily Protection (Active)</span>
        </div>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      {/* Body */}
      <div className="p-6 text-center">
        <div className="relative w-20 h-20 mx-auto mb-3 flex items-center justify-center">
          {/* Circular Progress */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#f1f5f9"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#10B981"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <svg className="w-8 h-8 text-green-500 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <p className="text-sm text-slate-600">
          Received <span className="font-bold text-slate-800">{receivedCount}</span> today, blocked{' '}
          <span className="font-bold text-green-500">{blockedCount}</span>
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="bg-gray-50 p-3 flex gap-2">
        <button
          onClick={() => window.open(chrome.runtime.getURL('popup.html'), '_blank')}
          className="flex-1 bg-white border border-gray-200 text-slate-600 text-xs font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Details
        </button>
        <button
          onClick={onActivateCrisis}
          className="flex-1 bg-red-50 border border-red-100 text-red-600 text-xs font-bold py-2 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Activate Crisis Mode
        </button>
      </div>
    </div>
  );
};

export default DailyPanel;
