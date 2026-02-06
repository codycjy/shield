import type { Tweet } from '../../lib/sampleData';
import ToxicOverlay from './ToxicOverlay';

interface TweetCardProps {
  tweet: Tweet;
  isToxic?: boolean;
  isShielded?: boolean;
  category?: string;
  reason?: string;
}

export default function TweetCard({
  tweet,
  isToxic = false,
  isShielded = false,
  category = 'Unknown',
  reason,
}: TweetCardProps) {
  const showOverlay = isToxic && isShielded;

  return (
    <div className="relative border-b border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
      {/* Tweet content */}
      <div className="flex gap-3">
        {/* Avatar */}
        <img
          src={tweet.avatar}
          alt={tweet.author}
          className="w-10 h-10 rounded-full flex-shrink-0 bg-gray-200"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1 mb-0.5">
            <span className="font-bold text-gray-900 text-[15px]">{tweet.author}</span>
            <span className="text-gray-500 text-[15px]">{tweet.handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-[15px]">{tweet.timestamp}</span>
          </div>

          {/* Tweet text */}
          <p className="text-gray-900 text-[15px] leading-5 mb-3 whitespace-pre-wrap">{tweet.text}</p>

          {/* Actions */}
          <div className="flex items-center justify-between max-w-[425px] text-gray-500">
            <button className="flex items-center gap-2 hover:text-sky-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-sky-50 transition-colors">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-[13px]">{tweet.replies || ''}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-green-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-[13px]">{tweet.retweets || ''}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-pink-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-[13px]">{tweet.likes || ''}</span>
            </button>
            <button className="flex items-center hover:text-sky-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-sky-50 transition-colors">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Toxic overlay */}
      {showOverlay && <ToxicOverlay category={category} reason={reason} />}
    </div>
  );
}
