import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { BottomNav } from '../components/BottomNav';

interface AlertModeProps {
  onActivateCrisis: () => void;
  onDismiss: () => void;
  claimsRemaining: number;
}

export function AlertMode({ onActivateCrisis, onDismiss, claimsRemaining }: AlertModeProps) {
  return (
    <div className="flex flex-col h-full">
      <Header title="DEFENSE MONITOR" mode="alert" />

      {/* Alert Banner */}
      <div className="bg-red-50 border-l-4 border-red-600 px-6 py-3 mb-4">
        <p className="text-sm text-red-800 font-medium flex items-center gap-2">
          <span>⚠</span>
          <span>Detected 500+ negative comments</span>
        </p>
      </div>

      <div className="flex-1 px-6">
        {/* Warning Triangle */}
        <div className="flex items-center justify-center my-8">
          <div className="relative">
            <div className="absolute w-32 h-32 rounded-full bg-red-50 animate-pulse" />
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              className="relative z-10"
            >
              <path
                d="M48 8L88 80H8L48 8Z"
                fill="#dc2626"
                stroke="#dc2626"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M48 32V52M48 64H48.02"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Recommend Activating Crisis Mode
          </h2>
          <p className="text-sm text-gray-500">
            Current threat level: <span className="text-red-600 font-bold">HIGH</span>
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <StatCard label="Instant Surge" value="50+ comments" />
          <StatCard label="Claims Remaining" value={claimsRemaining} />
        </div>

        <button
          onClick={onActivateCrisis}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg mb-3"
        >
          <span className="text-xl">⚡</span>
          <span>Activate Crisis Mode</span>
        </button>

        <button
          onClick={onDismiss}
          className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium py-2 transition-colors"
        >
          Dismiss this alert
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
