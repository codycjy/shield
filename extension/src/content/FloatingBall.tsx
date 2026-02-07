import React, { useState, useEffect, useRef } from 'react';
import DailyPanel from './components/DailyPanel';
import CrisisPanel from './components/CrisisPanel';
import EndedPanel from './components/EndedPanel';
import ConfirmModal from './components/ConfirmModal';

type Mode = 'daily' | 'crisis' | 'ended';

interface ProtectionState {
  mode: Mode;
  interceptedCount: number;
  blockedCount: number;
  activatedAt: string | null;
  claimsRemaining: number;
  coverageMonths: number;
  threatLevel?: 'normal' | 'high';
}

const FloatingBall: React.FC = () => {
  const [mode, setMode] = useState<Mode>('daily');
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const dragRef = useRef({ startX: 0, startY: 0, offsetX: 0, offsetY: 0 });

  // State from chrome.storage or backend
  const [state, setState] = useState<ProtectionState>({
    mode: 'daily',
    interceptedCount: 35,
    blockedCount: 5,
    activatedAt: null,
    claimsRemaining: 2,
    coverageMonths: 5,
    threatLevel: 'normal',
  });

  // Load state from chrome.storage on mount
  useEffect(() => {
    chrome.storage.local.get(['protectionState'], (result) => {
      if (result.protectionState) {
        setState(result.protectionState);
        setMode(result.protectionState.mode || 'daily');
      }
    });

    // Listen for storage changes
    const handleStorageChange = (changes: any, area: string) => {
      if (area === 'local' && changes.protectionState) {
        const newState = changes.protectionState.newValue;
        setState(newState);
        setMode(newState.mode || 'daily');
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Listen for state updates from popup
    const handleStateUpdate = ((event: CustomEvent) => {
      setState(event.detail);
      setMode(event.detail.mode || 'daily');
    }) as EventListener;

    window.addEventListener('mindshield:stateUpdate', handleStateUpdate);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
      window.removeEventListener('mindshield:stateUpdate', handleStateUpdate);
    };
  }, []);

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: position.x,
      offsetY: position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    const newX = Math.max(0, Math.min(window.innerWidth - 56, dragRef.current.offsetX + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - 56, dragRef.current.offsetY + deltaY));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Panel toggle
  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  // Activate crisis mode
  const handleActivateCrisis = () => {
    setShowConfirmModal(true);
  };

  const confirmActivateCrisis = () => {
    setShowConfirmModal(false);

    // Update state
    const newState = { ...state, mode: 'crisis' as Mode };
    setState(newState);
    setMode('crisis');

    // Save to chrome.storage
    chrome.storage.local.set({ protectionState: newState });

    // Send message to background script
    chrome.runtime.sendMessage({
      type: 'ACTIVATE_CRISIS',
      data: newState
    });
  };

  // Close floating ball
  const handleClose = () => {
    setIsClosed(true);
  };

  if (isClosed) return null;

  const getBallStyles = () => {
    const baseStyles = 'w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl text-white cursor-move relative transition-transform hover:scale-105';

    switch (mode) {
      case 'crisis':
        return `${baseStyles} bg-red-500 shadow-red-500/30`;
      case 'ended':
        return `${baseStyles} bg-gray-400 shadow-gray-500/30`;
      default:
        return `${baseStyles} bg-green-500 shadow-green-500/30`;
    }
  };

  const getBallIcon = () => {
    switch (mode) {
      case 'crisis':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'ended':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
    }
  };

  const showBadge = mode === 'crisis' && state.blockedCount > 0;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 999999,
      }}
      className="flex flex-col items-end gap-3"
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
    >
      {/* Close button - shows on hover */}
      {showCloseButton && (
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center text-xs z-10 shadow-lg transition-all"
          style={{ cursor: 'pointer' }}
        >
          ✕
        </button>
      )}

      {/* Panel */}
      <div
        className={`transition-all duration-300 ease-out ${
          isPanelVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-5 pointer-events-none'
        }`}
        style={{ transformOrigin: 'bottom right' }}
      >
        {mode === 'daily' && (
          <DailyPanel
            receivedCount={state.interceptedCount}
            blockedCount={state.blockedCount}
            onActivateCrisis={handleActivateCrisis}
          />
        )}
        {mode === 'crisis' && (
          <CrisisPanel
            receivedCount={500}
            blockedCount={300}
          />
        )}
        {mode === 'ended' && (
          <EndedPanel />
        )}
      </div>

      {/* Floating Ball */}
      <button
        className={getBallStyles()}
        onClick={togglePanel}
        onMouseDown={handleMouseDown}
      >
        {getBallIcon()}

        {/* Notification Badge */}
        {showBadge && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm min-w-[20px] text-center">
            {state.blockedCount}
          </span>
        )}
      </button>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={confirmActivateCrisis}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default FloatingBall;
