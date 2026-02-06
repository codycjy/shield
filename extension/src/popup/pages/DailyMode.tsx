import { Header } from '../components/Header';
import { ShieldIcon } from '../components/ShieldIcon';
import { StatCard } from '../components/StatCard';
import { BottomNav } from '../components/BottomNav';

interface DailyModeProps {
  onActivateCrisis: () => void;
  interceptedCount: number;
  claimsRemaining: number;
  coverageMonths: number;
}

export function DailyMode({
  onActivateCrisis,
  interceptedCount,
  claimsRemaining,
  coverageMonths,
}: DailyModeProps) {
  return (
    <div className="flex flex-col h-full">
      <Header title="ZenShield" mode="daily" />

      <div className="flex-1 px-6">
        <ShieldIcon mode="daily" />

        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Daily Protection <span className="text-green-500">(Active)</span>
          </h2>
          <p className="text-sm text-gray-500">
            Today: 35 received, {interceptedCount} intercepted
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <StatCard label="Claims Remaining" value={claimsRemaining} />
          <StatCard label="Coverage Left" value={`${coverageMonths} months`} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-600">System Normal</span>
        </div>

        <button
          onClick={onActivateCrisis}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <span className="text-xl">⚡</span>
          <span>Activate Crisis Mode</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
