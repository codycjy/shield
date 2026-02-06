import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3000';

interface ProtectionState {
  mode: 'off' | 'daily' | 'crisis';
  interceptedCount: number;
  activatedAt: string | null;
  blockedCount?: number;
  claimsRemaining?: number;
  coverageMonths?: number;
  threatLevel?: 'normal' | 'high';
  anomalyDetected?: boolean;
}

export function useProtection() {
  const [state, setState] = useState<ProtectionState>({
    mode: 'daily',
    interceptedCount: 5,
    activatedAt: null,
    blockedCount: 0,
    claimsRemaining: 2,
    coverageMonths: 5,
    threatLevel: 'normal',
    anomalyDetected: false,
  });
  const [loading, setLoading] = useState(false);

  // Load from chrome.storage on mount
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['protectionState'], (result) => {
        if (result.protectionState) {
          setState(result.protectionState);
        }
      });
    }
    // Also fetch from backend
    fetchStatus();
  }, []);

  // Persist to chrome.storage whenever state changes
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ protectionState: state });
    }
  }, [state]);

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/protection/status`, {
        headers: { 'X-Demo-Mode': 'true' },
      });
      const data = await res.json();
      setState((prev) => ({ ...prev, ...data }));
    } catch (e) {
      console.error('Failed to fetch status', e);
    }
  };

  const activate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/protection/activate`, {
        method: 'POST',
        headers: { 'X-Demo-Mode': 'true' },
      });
      const data = await res.json();
      setState((prev) => ({ ...prev, ...data }));
    } finally {
      setLoading(false);
    }
  };

  const deactivate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/protection/deactivate`, {
        method: 'POST',
        headers: { 'X-Demo-Mode': 'true' },
      });
      const data = await res.json();
      setState((prev) => ({ ...prev, ...data }));
    } finally {
      setLoading(false);
    }
  };

  const dismissAlert = () => {
    setState((prev) => ({ ...prev, anomalyDetected: false }));
  };

  return { state, loading, activate, deactivate, fetchStatus, dismissAlert };
}
