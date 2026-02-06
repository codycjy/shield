import React from 'react';

interface CrisisPanelProps {
  receivedCount: number;
  blockedCount: number;
}

const CrisisPanel: React.FC<CrisisPanelProps> = ({
  receivedCount,
  blockedCount,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-red-200 w-80 overflow-hidden mb-2 ring-4 ring-red-50">
      {/* Header */}
      <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="font-bold text-red-800">Full Protection (Crisis)</span>
        </div>
        <span className="bg-red-200 text-red-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
          HIGH RISK
        </span>
      </div>

      {/* Body */}
      <div className="p-5 text-center">
        {/* Radar Diffusion UI */}
        <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          {/* Animated Rings */}
          <div className="absolute w-full h-full border-2 border-red-200 rounded-full animate-radar opacity-0"></div>
          <div
            className="absolute w-3/4 h-3/4 border-2 border-red-300 rounded-full animate-radar opacity-0"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute w-1/2 h-1/2 border-2 border-red-400 rounded-full animate-radar opacity-0"
            style={{ animationDelay: '1s' }}
          ></div>
          {/* Center Icon */}
          <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-red-500/40">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Stats Data */}
        <p className="text-xs font-bold text-slate-700 mb-3 bg-red-50 inline-block px-3 py-1.5 rounded-lg border border-red-100">
          Received {receivedCount} today <span className="text-gray-300 mx-1">|</span> Blocked{' '}
          <span className="text-red-600">{blockedCount}</span>
        </p>

        {/* Status Text */}
        <p className="text-sm font-bold text-red-600 mb-1">High risk situation detected</p>
        <p className="text-xs text-slate-500 px-2 leading-relaxed">
          System is using maximum AI power to filter malicious content
        </p>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-3">
        <button
          onClick={() => window.open(chrome.runtime.getURL('popup.html'), '_blank')}
          className="w-full bg-white border border-gray-200 text-slate-500 text-xs font-bold py-2 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 group transition-colors"
        >
          View AI Analysis
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CrisisPanel;
