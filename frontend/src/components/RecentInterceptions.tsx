interface RecentInterceptionsProps {
  mode?: 'daily' | 'crisis' | 'ended';
}

interface Interception {
  id: string;
  username: string;
  preview: string;
  platform: 'twitter' | 'instagram';
}

const dailyInterceptions: Interception[] = [
  {
    id: '1',
    username: 'user_992',
    preview: 'You should just quit...',
    platform: 'instagram',
  },
  {
    id: '2',
    username: 'angry_bird',
    preview: 'Complete garbage content...',
    platform: 'twitter',
  },
];

const crisisQueue = [
  'Detected mass abusive language...',
  'Detected repeated spam messages...',
  'High-risk account filtering...',
];

export default function RecentInterceptions({ mode = 'daily' }: RecentInterceptionsProps) {
  const isCrisis = mode === 'crisis';

  if (isCrisis) {
    return (
      <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm flex flex-col h-full">
        <h3 className="font-bold text-slate-800 mb-2">Interception Queue</h3>
        <p className="text-xs text-red-500 mb-4 animate-pulse">
          Processing large influx of comments...
        </p>
        <div className="flex-1 space-y-3 opacity-80">
          {crisisQueue.map((item, index) => (
            <div
              key={index}
              className="bg-red-50 p-3 rounded text-xs text-red-800 blur-sm hover:blur-none transition-all cursor-default"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <h3 className="font-bold text-slate-800 mb-4">Recent Interceptions</h3>

      <div className="flex-1 space-y-4">
        {dailyInterceptions.map((item) => (
          <div key={item.id} className="flex gap-3">
            {/* Avatar */}
            <img
              src={`https://ui-avatars.com/api/?name=${item.username}&background=random`}
              alt={item.username}
              className="w-8 h-8 rounded-full"
            />

            {/* Content */}
            <div className="flex-1 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">{item.username}</span>
                {item.platform === 'instagram' ? (
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
              </div>
              <div className="bg-red-50 text-red-800 px-2 py-1 rounded mt-1 blur-sm hover:blur-none transition-all cursor-pointer text-xs">
                {item.preview}
              </div>
              <div className="mt-1 flex gap-2">
                <button className="text-xs text-gray-400 hover:text-gray-600 underline">Restore</button>
                <button className="text-xs text-red-400 hover:text-red-600 underline">Block</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-slate-500 border border-dashed border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors">
        View All Logs
      </button>
    </div>
  );
}
