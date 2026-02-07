interface ClaimsCardProps {
  remaining: number;
  total: number;
  mode?: 'daily' | 'crisis' | 'ended';
  onExtend?: () => void;
  onRepurchase?: () => void;
}

export default function ClaimsCard({
  remaining,
  total,
  mode = 'daily',
  onExtend,
  onRepurchase,
}: ClaimsCardProps) {
  const percentage = (remaining / total) * 100;
  const isCrisis = mode === 'crisis';
  const isEnded = mode === 'ended';

  if (isEnded) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center flex flex-col items-center justify-center h-48">
        <h3 className="text-slate-800 font-bold text-lg mb-2">Reactivate MindShield Protection</h3>
        <p className="text-slate-500 text-sm mb-6">
          Purchase a new plan or one-time boost to restore account protection.
        </p>
        <button
          onClick={onRepurchase}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-sm w-full md:w-auto flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Repurchase Service
        </button>
      </div>
    );
  }

  if (isCrisis) {
    return (
      <div className="bg-white p-6 rounded-xl border-2 border-red-200 shadow-sm relative h-36 flex flex-col justify-between">
        <div className="absolute inset-0 bg-red-50/60 animate-pulse rounded-xl"></div>
        <div className="relative z-10 flex justify-between items-center">
          <p className="text-sm text-red-600 font-medium">Crisis Claims</p>
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">IN USE</span>
        </div>
        <div className="relative z-10 text-2xl font-bold text-slate-800">
          {remaining} / {total} claims
        </div>
        <p className="relative z-10 text-xs text-slate-500">
          1 claim will be deducted after crisis ends.
        </p>
      </div>
    );
  }

  // Daily mode
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden h-36 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500 font-medium">Crisis Claims</p>
          <h3 className="text-3xl font-bold mt-1 text-slate-800">
            {remaining} <span className="text-lg font-normal text-slate-400">/ {total} claims</span>
          </h3>
        </div>
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
        </svg>
      </div>
      <div className="w-full">
        <div className="w-full bg-gray-100 h-1.5 rounded-full mb-3">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <button
          onClick={onExtend}
          className="text-xs text-green-600 font-medium hover:text-green-700 transition-colors flex items-center gap-1"
        >
          Extend Coverage
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
