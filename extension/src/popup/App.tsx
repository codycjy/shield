import { useState } from 'react';
import { useProtection } from './hooks/useProtection';
import { DailyMode } from './pages/DailyMode';
import { AlertMode } from './pages/AlertMode';
import { CrisisMode } from './pages/CrisisMode';
import { ConfirmModal } from './pages/ConfirmModal';

export function App() {
  const { state, loading, activate, dismissAlert } = useProtection();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleActivateClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    await activate();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Crisis mode active
  if (state.mode === 'crisis') {
    return (
      <div className="w-[360px] min-h-[500px] bg-gray-50 flex flex-col">
        <CrisisMode
          blockedCount={state.blockedCount || 1248}
          activatedAt={state.activatedAt}
        />
      </div>
    );
  }

  // Alert mode - anomaly detected
  if (state.anomalyDetected || state.threatLevel === 'high') {
    return (
      <div className="w-[360px] min-h-[500px] bg-gray-50 flex flex-col">
        <AlertMode
          onActivateCrisis={handleActivateClick}
          onDismiss={dismissAlert}
          claimsRemaining={state.claimsRemaining || 2}
        />
        {showConfirm && (
          <ConfirmModal
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            loading={loading}
          />
        )}
      </div>
    );
  }

  // Daily mode - normal state
  return (
    <div className="w-[360px] min-h-[500px] bg-gray-50 flex flex-col">
      <DailyMode
        onActivateCrisis={handleActivateClick}
        interceptedCount={state.interceptedCount}
        claimsRemaining={state.claimsRemaining || 2}
        coverageMonths={state.coverageMonths || 5}
      />
      {showConfirm && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          loading={loading}
        />
      )}
    </div>
  );
}
