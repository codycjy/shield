import React from 'react';

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000000] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-bounce-in">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-800 text-lg mb-2">
            Threshold Not Reached
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            A small amount of negative content has been detected, but the automatic crisis
            threshold has not been reached. We recommend continued observation.
            <br />
            <span className="text-xs text-slate-400 mt-2 block">
              (Forcing activation will consume 1 claim)
            </span>
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-red-500 rounded-lg text-sm font-bold text-white hover:bg-red-600 shadow-lg shadow-red-500/30 transition-colors"
            >
              Force Activate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
