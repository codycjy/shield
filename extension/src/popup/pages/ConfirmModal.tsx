interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmModal({ onConfirm, onCancel, loading }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path
              d="M32 8L56 52H8L32 8Z"
              fill="#fbbf24"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 24V36M32 44H32.02"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          Confirm Activate Crisis Mode?
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          This will consume 1 crisis claim
        </p>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-3 shadow-lg"
        >
          {loading ? 'Activating...' : 'Confirm Activation'}
        </button>

        <button
          onClick={onCancel}
          disabled={loading}
          className="w-full text-gray-600 hover:text-gray-800 disabled:text-gray-400 text-sm font-medium py-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
