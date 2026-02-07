import { useState } from 'react';

interface SocialAccount {
  platform: 'instagram' | 'youtube' | 'twitter';
  connected: boolean;
  username?: string;
  icon: string;
  color: string;
}

const initialSocialAccounts: SocialAccount[] = [
  {
    platform: 'instagram',
    connected: true,
    username: '@jennifer_blog',
    icon: 'fa-brands fa-instagram',
    color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500',
  },
  {
    platform: 'youtube',
    connected: true,
    username: 'JenniferVlogs',
    icon: 'fa-brands fa-youtube',
    color: 'bg-red-600',
  },
  {
    platform: 'twitter',
    connected: false,
    icon: 'fa-brands fa-x-twitter',
    color: 'bg-black',
  },
];

export default function SocialConnections() {
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(initialSocialAccounts);

  const handleUnbind = (platform: string) => {
    setSocialAccounts(prev => prev.map(acc =>
      acc.platform === platform ? { ...acc, connected: false, username: undefined } : acc
    ));
  };

  const handleAuthorize = (platform: string) => {
    const defaultUsernames: Record<string, string> = {
      instagram: '@jennifer_blog',
      youtube: 'JenniferVlogs',
      twitter: '@jennifer_k',
    };
    setSocialAccounts(prev => prev.map(acc =>
      acc.platform === platform
        ? { ...acc, connected: true, username: defaultUsernames[platform] || `@${platform}_user` }
        : acc
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Social Connections</h2>
      <div className="space-y-4">
        {socialAccounts.map((acc) => (
          <div
            key={acc.platform}
            className={`flex items-center justify-between p-4 rounded-xl ${
              acc.connected
                ? 'border border-green-200 bg-green-50/50'
                : 'border border-gray-200 opacity-80 hover:opacity-100'
            } transition-opacity`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${acc.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-sm`}>
                <i className={acc.icon}></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm capitalize">
                  {acc.platform === 'twitter' ? 'Twitter / X' : acc.platform}
                </h4>
                {acc.connected ? (
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Connected: {acc.username}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 mt-0.5">Not connected</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {acc.connected && (
                <a
                  href="/simulator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <i className={`${acc.icon} text-[10px]`}></i> View on {acc.platform === 'twitter' ? 'X' : acc.platform.charAt(0).toUpperCase() + acc.platform.slice(1)}
                </a>
              )}
              {acc.connected ? (
                <button
                  onClick={() => handleUnbind(acc.platform)}
                  className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors border border-transparent hover:border-red-100 hover:bg-red-50 px-3 py-1.5 rounded-lg"
                >
                  Unbind
                </button>
              ) : (
                <button
                  onClick={() => handleAuthorize(acc.platform)}
                  className="bg-slate-900 text-white text-xs px-5 py-2 rounded-lg hover:bg-slate-800 shadow-md transition-transform active:scale-95"
                >
                  Authorize
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
    </div>
  );
}
