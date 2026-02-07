import { useState } from 'react';

// Types for log entries
interface LogEntry {
  id: string;
  time: string;
  platform: 'Instagram' | 'Twitter';
  user: {
    avatar: string;
    username: string;
    timestamp: string;
  };
  content: string;
  reason: 'Threat' | 'Hate' | 'Distortion' | 'Toxic' | 'Traffic Hijacking' | 'Scam & Spam';
  state: 'Pending' | 'Auto-deleted' | 'Hidden by platform' | 'Masked on platform';
}

// Mock data for demo
const mockLogs: LogEntry[] = [
  {
    id: '1',
    time: '14:20',
    platform: 'Twitter',
    user: {
      avatar: 'https://ui-avatars.com/api/?name=User+One&background=random',
      username: '@unknown_hater',
      timestamp: '2m',
    },
    content: "You're such a terrible person, why don't you just disappear...",
    reason: 'Toxic',
    state: 'Pending',
  },
  {
    id: '2',
    time: '13:45',
    platform: 'Instagram',
    user: {
      avatar: 'https://ui-avatars.com/api/?name=Scam+Bot&background=000&color=fff',
      username: '@crypto_king99',
      timestamp: '1h',
    },
    content: 'Free BTC!! Click link in bio to claim your prize now! Limited time...',
    reason: 'Scam & Spam',
    state: 'Auto-deleted',
  },
  {
    id: '3',
    time: '12:10',
    platform: 'Twitter',
    user: {
      avatar: 'https://ui-avatars.com/api/?name=Angry+Man&background=ef4444&color=fff',
      username: '@real_threat',
      timestamp: '2h',
    },
    content: 'I know where you live. Watch your back...',
    reason: 'Threat',
    state: 'Hidden by platform',
  },
  {
    id: '4',
    time: '10:30',
    platform: 'Instagram',
    user: {
      avatar: 'https://ui-avatars.com/api/?name=Lisa+M&background=random',
      username: '@lisa_m88',
      timestamp: '4h',
    },
    content: 'Buy my course to gain 10k followers instantly! #ad #promo',
    reason: 'Traffic Hijacking',
    state: 'Masked on platform',
  },
  {
    id: '5',
    time: '09:15',
    platform: 'Twitter',
    user: {
      avatar: 'https://ui-avatars.com/api/?name=Hate+User&background=f97316&color=fff',
      username: '@hatespeech_acc',
      timestamp: '6h',
    },
    content: "People like you don't belong here. Get out of our community!",
    reason: 'Hate',
    state: 'Auto-deleted',
  },
  {
    id: '6',
    time: '08:45',
    platform: 'Instagram',
    user: {
      avatar: 'https://ui-avatars.com/api/?name=Fake+News&background=7c3aed&color=fff',
      username: '@truth_revealer',
      timestamp: '7h',
    },
    content: 'BREAKING: [Celebrity] caught in scandal! Share before it gets deleted!!!',
    reason: 'Distortion',
    state: 'Hidden by platform',
  },
];

// Reason badge styling configuration
const reasonStyles: Record<LogEntry['reason'], string> = {
  Threat: 'bg-red-50 text-red-700 border-red-100',
  Hate: 'bg-orange-50 text-orange-700 border-orange-100',
  Distortion: 'bg-purple-50 text-purple-700 border-purple-100',
  Toxic: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  'Traffic Hijacking': 'bg-purple-50 text-purple-700 border-purple-100',
  'Scam & Spam': 'bg-gray-100 text-slate-600 border-gray-200',
};

// State styling configuration
const stateStyles: Record<LogEntry['state'], { dot: string; text: string }> = {
  Pending: { dot: 'bg-gray-400', text: 'text-slate-500' },
  'Auto-deleted': { dot: 'bg-red-500', text: 'text-slate-700 font-medium' },
  'Hidden by platform': { dot: 'bg-blue-500', text: 'text-slate-700 font-medium' },
  'Masked on platform': { dot: 'bg-yellow-400', text: 'text-slate-700 font-medium' },
};

export default function Logs() {
  const [platformFilter, setPlatformFilter] = useState('All Platforms');
  const [dateFilter, setDateFilter] = useState('Past 24 Hours');
  const [reasonFilter, setReasonFilter] = useState('All Reasons');

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-30">
        <h2 className="text-xl font-bold text-slate-800">Interception Logs</h2>
        <div className="flex gap-3">
          <button className="text-slate-500 hover:text-slate-800 text-sm font-medium flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Records
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="px-8 py-6 bg-white border-b border-gray-100 flex flex-wrap gap-4 items-center shrink-0">
        {/* Platform Filter */}
        <div className="relative">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer"
          >
            <option>All Platforms</option>
            <option>Instagram</option>
            <option>Twitter / X</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Date Filter */}
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 text-slate-700 text-sm rounded-lg pl-9 pr-8 py-2 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer"
          >
            <option>Past 24 Hours</option>
            <option>Past 7 Days</option>
            <option>Past Month</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Reason Filter */}
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 text-slate-700 text-sm rounded-lg pl-9 pr-8 py-2 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer"
          >
            <option>All Reasons</option>
            <option>Threat</option>
            <option>Hate</option>
            <option>Distortion</option>
            <option>Toxic</option>
            <option>Traffic Hijacking</option>
            <option>Scam & Spam</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-slate-500 tracking-wider">
                <th className="px-6 py-4 font-semibold w-24">Time</th>
                <th className="px-6 py-4 font-semibold w-32">Platform</th>
                <th className="px-6 py-4 font-semibold">Content</th>
                <th className="px-6 py-4 font-semibold w-40">Reason</th>
                <th className="px-6 py-4 font-semibold w-40">State</th>
                <th className="px-6 py-4 font-semibold w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{log.time}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {log.platform === 'Instagram' ? (
                        <>
                          <div className="w-5 h-5 rounded bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-[10px] text-white">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </div>
                          <span className="font-bold text-slate-700">Instagram</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span className="font-bold text-slate-700">Twitter</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3 max-w-lg">
                      <img
                        src={log.user.avatar}
                        alt={log.user.username}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-800">{log.user.username}</span>
                          <span className="text-xs text-slate-400">· {log.user.timestamp}</span>
                        </div>
                        <div className="group/blur relative cursor-pointer inline-block">
                          <p className="blur-[5px] text-slate-600 transition-all group-hover/blur:blur-none">
                            {log.content}
                          </p>
                          <div className="eye-icon absolute inset-0 flex items-center justify-center text-green-500 bg-white/50 opacity-100 transition-opacity group-hover/blur:opacity-0 pointer-events-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${reasonStyles[log.reason]}`}>
                      {log.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${stateStyles[log.state].dot}`}></span>
                      <span className={`text-xs ${stateStyles[log.state].text}`}>{log.state}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button className="hover:text-green-500 transition-colors" title="Restore">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                      <button className="hover:text-red-500 transition-colors" title="Block User">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
          <span>
            Showing <span className="font-bold text-slate-800">1-6</span> of{' '}
            <span className="font-bold text-slate-800">84</span> intercepted items
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
              Next
            </button>
          </div>
        </div>

        {/* Mental Health Insight Card */}
        <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-5 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-lg flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Mental Health First Insight</h4>
              <p className="text-slate-600 mt-1">
                Today, MindShield has saved you from approximately{' '}
                <span className="font-bold text-green-500">45 minutes</span> of potential exposure to
                toxic content. You're doing great!
              </p>
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-bold text-green-500 underline decoration-2 underline-offset-4 hover:text-green-700 whitespace-nowrap mt-2"
          >
            View Full Analytics
          </a>
        </div>
      </div>

    </div>
  );
}
