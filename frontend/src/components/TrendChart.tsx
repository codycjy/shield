import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, ReferenceDot } from 'recharts';

interface TrendChartProps {
  mode?: 'daily' | 'crisis' | 'ended';
}

// Daily mode data
const dailyData = [
  { day: 'Mon', total: 80, intercepted: 10 },
  { day: 'Tue', total: 60, intercepted: 8 },
  { day: 'Wed', total: 100, intercepted: 15 },
  { day: 'Thu', total: 120, intercepted: 18 },
  { day: 'Fri', total: 90, intercepted: 12 },
  { day: 'Sat', total: 50, intercepted: 5 },
  { day: 'Sun', total: 70, intercepted: 9 },
];

// Crisis mode data with attack spike
const crisisData = [
  { day: 'Mon', total: 80, intercepted: 10, crisis: false },
  { day: 'Tue', total: 60, intercepted: 8, crisis: false },
  { day: 'Wed', total: 100, intercepted: 15, crisis: false },
  { day: 'Thu', total: 160, intercepted: 120, crisis: true, label: 'Crisis Triggered' },
  { day: 'Fri', total: 150, intercepted: 110, crisis: true },
  { day: 'Sat', total: 100, intercepted: 30, crisis: false, predicted: true },
  { day: 'Sun', total: 70, intercepted: 10, crisis: false, predicted: true, label: 'Predicted End' },
];

export default function TrendChart({ mode = 'daily' }: TrendChartProps) {
  const data = mode === 'crisis' ? crisisData : dailyData;
  const isCrisis = mode === 'crisis';
  const isEnded = mode === 'ended';

  return (
    <div className={`bg-white p-6 rounded-xl border shadow-sm flex flex-col ${isCrisis ? 'border-red-100 relative overflow-hidden' : 'border-gray-200'}`}>
      {isCrisis && <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className={`font-bold ${isCrisis ? 'text-red-700' : isEnded ? 'text-slate-600' : 'text-slate-800'}`}>
            {isCrisis ? 'Real-time Attack Traffic & Prediction' : isEnded ? 'Historical Defense Data' : 'Interception Trend'}
          </h3>
          <div className="flex items-center gap-4 mt-1 text-xs">
            <div className={`flex items-center gap-1.5 ${isCrisis ? 'text-slate-500' : 'text-slate-500'}`}>
              <span className="w-3 h-3 rounded-sm bg-indigo-50 border border-indigo-100"></span>
              Total Comments
            </div>
            <div className={`flex items-center gap-1.5 font-bold ${isCrisis ? 'text-red-500' : 'text-brand-blue'}`}>
              <span className={`w-3 h-1 rounded-full ${isCrisis ? 'bg-red-500' : 'bg-brand-blue'}`}></span>
              {isCrisis ? 'Attack Curve' : 'Interceptions'}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <select className={`bg-gray-50 border text-slate-600 text-xs rounded px-2 py-1 ${isCrisis ? 'border-red-200 bg-red-50 text-red-600' : 'border-gray-200'}`}>
            <option>Instagram</option>
            <option>Twitter</option>
            <option>Facebook</option>
          </select>
          {!isCrisis && (
            <button className="bg-gray-50 border border-gray-200 text-slate-600 text-xs rounded px-2 py-1 flex items-center gap-1">
              Last 7 Days
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar
              dataKey="total"
              fill={isCrisis ? '#fee2e2' : '#e0e7ff'}
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="intercepted"
              stroke={isCrisis ? '#EF4444' : '#3B82F6'}
              strokeWidth={3}
              dot={{ fill: '#fff', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5 }}
            />
            {isCrisis && (
              <>
                <ReferenceDot x="Thu" y={120} r={5} fill="#EF4444" stroke="#fff" strokeWidth={2} />
                <ReferenceDot x="Sun" y={10} r={5} fill="#10B981" stroke="#fff" strokeWidth={2} />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {isEnded && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
            <span className="text-sm text-slate-500">Historical data view only</span>
          </div>
        </div>
      )}
    </div>
  );
}
