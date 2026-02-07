import React from 'react';

const EndedPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 overflow-hidden mb-2">
      {/* Header */}
      <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <span className="font-bold text-slate-600">Protection Ended</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-bold text-slate-700">No abnormal risks detected</p>
        <p className="text-xs text-slate-400 mt-1">Your crisis coverage has been consumed</p>
      </div>

      {/* Footer / Actions */}
      <div className="bg-gray-50 p-3 flex flex-col gap-2">
        <button
          disabled
          className="w-full bg-gray-100 text-gray-400 text-xs font-bold py-2 rounded-lg cursor-not-allowed flex items-center justify-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          One-Click Protection (Unavailable)
        </button>
        <button
          onClick={() => window.open('https://mindshield.com/pricing', '_blank')}
          className="w-full bg-green-500 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-green-600 shadow-md flex items-center justify-center gap-1 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Renew Protection
        </button>
      </div>
    </div>
  );
};

export default EndedPanel;
