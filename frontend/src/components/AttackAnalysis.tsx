export default function AttackAnalysis() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-bold text-slate-800 mb-4 border-l-4 border-red-500 pl-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Real-time Attack Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Comfort Message */}
        <div className="flex flex-col justify-center bg-gray-50 rounded-lg p-5">
          <div className="text-3xl text-brand-green mb-2">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="font-bold text-slate-700 mb-2">Take a deep breath.</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            ZenShield has blocked <span className="font-bold text-red-500">842</span> attacks for you.
          </p>
        </div>

        {/* Attack Type Breakdown */}
        <div className="flex items-center gap-4">
          <div
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg shrink-0"
            style={{
              background: 'conic-gradient(#EF4444 0% 60%, #F59E0B 60% 85%, #3B82F6 85% 100%)',
            }}
          ></div>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
              <span className="text-slate-700">Personal Attacks (60%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-sm"></span>
              <span className="text-slate-700">Spam (25%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
              <span className="text-slate-700">Other (15%)</span>
            </div>
          </div>
        </div>

        {/* High-frequency Keywords */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">
            High-frequency Attack Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded">scammer</span>
            <span className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded">garbage</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">fake</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">worst</span>
          </div>
        </div>
      </div>
    </div>
  );
}
