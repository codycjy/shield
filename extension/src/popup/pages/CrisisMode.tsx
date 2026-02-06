import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ShieldIcon } from '../components/ShieldIcon';
import { StatCard } from '../components/StatCard';
import { BottomNav } from '../components/BottomNav';

interface CrisisModeProps {
  blockedCount: number;
  activatedAt: string | null;
}

export function CrisisMode({ blockedCount, activatedAt }: CrisisModeProps) {
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (!activatedAt) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - new Date(activatedAt).getTime()) / 1000);
      const remaining = Math.max(0, 300 - elapsed);
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [activatedAt]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progressPercent = ((300 - timeRemaining) / 300) * 100;

  return (
    <div className="flex flex-col h-full">
      <Header title="Deep Defense" mode="crisis" />

      <div className="flex-1 px-6">
        <ShieldIcon mode="crisis" />

        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Active Protection</h2>
          <p className="text-sm text-red-600 font-medium">
            High-risk traffic filtering active
          </p>
        </div>

        {/* Cooling Down Bar */}
        <div className="mb-6 bg-gray-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
              Cooling Down
            </span>
            <span className="text-sm font-mono font-bold text-gray-800">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <StatCard label="BLOCKED" value={blockedCount.toLocaleString()} valueColor="#dc2626" />
          <StatCard label="TUNNEL" value="SECURE" icon="🔒" />
        </div>

        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <span className="text-xl">🛡</span>
          <span>Protecting (Cooling Down)</span>
        </button>
      </div>

      <BottomNav isActive />
    </div>
  );
}
