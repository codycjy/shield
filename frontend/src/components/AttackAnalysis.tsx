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
            MindShield has blocked <span className="font-bold text-red-500">842</span> attacks for you.
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

        {/* Bot Ratio & Attack Organization */}
        <div className="flex flex-col gap-3">
          {/* Human-Bot Ratio */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246A4.535 4.535 0 009 10.908V12H7.5a1 1 0 100 2H9v1a1 1 0 102 0v-1h1.5a1 1 0 100-2H11v-1.092a4.535 4.535 0 001.676-.662C13.398 9.766 14 8.991 14 8c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd" />
              </svg>
              <h4 className="text-xs font-bold text-orange-700 uppercase">Human-Bot Ratio</h4>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-2 bg-orange-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-bold text-orange-600 whitespace-nowrap">85% Bot</span>
            </div>
            <p className="text-xs text-orange-600 leading-relaxed">
              Detected 85% of negative comments from suspected bot/astroturf accounts (registered &lt;7 days, similar content patterns).
            </p>
          </div>

          {/* Attack Organization */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <h4 className="text-xs font-bold text-purple-700 uppercase">Attack Organization</h4>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-purple-200 text-purple-700 text-xs font-bold rounded">Coordinated</span>
              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 text-xs rounded">#FakeInfluencer</span>
            </div>
            <p className="text-xs text-purple-600 leading-relaxed">
              Highly coordinated attack detected — attackers uniformly using #FakeInfluencer tag and identical emoji patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
