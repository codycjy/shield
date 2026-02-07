import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBanner from '../components/StatusBanner';
import StatCard from '../components/StatCard';
import TrendChart from '../components/TrendChart';
import RecentInterceptions from '../components/RecentInterceptions';
import AttackAnalysis from '../components/AttackAnalysis';
import ClaimsCard from '../components/ClaimsCard';

type Mode = 'daily' | 'crisis' | 'ended';

export default function Overview() {
  const navigate = useNavigate();
  // Demo: Switch between modes for testing
  const [mode, setMode] = useState<Mode>('daily');

  const handleActivateCrisis = () => {
    setMode('crisis');
  };

  const handleEndCrisis = () => {
    setMode('daily');
  };

  const handleRepurchase = () => {
    console.log('Redirect to purchase page');
  };

  const handleExtend = () => {
    console.log('Redirect to extend coverage page');
  };

  const isCrisis = mode === 'crisis';
  const isEnded = mode === 'ended';

  return (
    <div className="space-y-6">
      {/* Dev Mode Switcher - Remove in production */}
      <div className="flex gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <span className="text-sm font-medium text-yellow-800">Demo Mode:</span>
        <button
          onClick={() => setMode('daily')}
          className={`px-3 py-1 text-xs rounded ${mode === 'daily' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
        >
          Daily
        </button>
        <button
          onClick={() => setMode('crisis')}
          className={`px-3 py-1 text-xs rounded ${mode === 'crisis' ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
        >
          Crisis
        </button>
        <button
          onClick={() => setMode('ended')}
          className={`px-3 py-1 text-xs rounded ${mode === 'ended' ? 'bg-gray-500 text-white' : 'bg-white text-gray-700'}`}
        >
          Ended
        </button>
      </div>

      {/* Status Banner */}
      <StatusBanner
        mode={mode}
        onActivateCrisis={handleActivateCrisis}
        onEndCrisis={handleEndCrisis}
        onViewOnX={() => navigate('/dashboard/simulator')}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        <div className="lg:col-span-2">
          <TrendChart mode={mode} />
        </div>
        <div>
          <RecentInterceptions mode={mode} />
        </div>
      </div>

      {/* Crisis Mode: Attack Analysis */}
      {isCrisis && (
        <AttackAnalysis />
      )}

      {/* Ended Mode: Historical Data + Repurchase CTA */}
      {isEnded && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 opacity-75">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-600">Historical Defense Records</h3>
            <button className="text-sm text-blue-600 hover:underline">Export Report</button>
          </div>
          <div className="h-64 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center relative">
            <div className="absolute inset-0 p-4 flex items-end gap-2 px-10">
              <div className="w-full bg-gray-200 h-[20%]"></div>
              <div className="w-full bg-gray-200 h-[30%]"></div>
              <div className="w-full bg-red-200 h-[80%] relative group flex justify-center">
                <span className="absolute -top-6 text-xs text-slate-500 bg-white px-1 border border-gray-200">
                  Attack
                </span>
              </div>
              <div className="w-full bg-gray-200 h-[25%]"></div>
              <div className="w-full bg-gray-200 h-[10%]"></div>
            </div>
            <span className="bg-white px-3 py-1 rounded shadow text-sm text-slate-500 z-10 border border-gray-200">
              View historical data only
            </span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {!isEnded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Blocked"
            value="1,248"
            icon={
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            }
            trend={{ value: '12%', direction: 'up' }}
          />

          <StatCard
            title="Total Comments"
            value="45,201"
            icon={
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            }
            subtitle="Since 2026-01-01"
          />

          <ClaimsCard
            remaining={isCrisis ? 1 : 2}
            total={3}
            mode={mode}
            onExtend={handleExtend}
            onRepurchase={handleRepurchase}
          />
        </div>
      )}

      {/* Ended Mode: Claims Status + Repurchase */}
      {isEnded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center h-48">
            <p className="text-sm text-slate-500 font-medium">Crisis Claims</p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-3xl font-bold text-slate-400">
                0 <span className="text-lg font-normal">/ 3 claims</span>
              </h3>
              <span className="text-sm text-red-500 font-bold">Exhausted</span>
            </div>
          </div>

          <ClaimsCard
            remaining={0}
            total={3}
            mode={mode}
            onRepurchase={handleRepurchase}
          />
        </div>
      )}
    </div>
  );
}
