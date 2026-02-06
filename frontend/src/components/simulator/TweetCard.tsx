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
    <div className="relative bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
      {/* Tweet content */}
      <div className="flex gap-3">
        {/* Avatar */}
        <img
          src={tweet.avatar}
          alt={tweet.author}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-900">{tweet.author}</span>
            <span className="text-gray-500">{tweet.handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">{tweet.timestamp}</span>
          </div>

          {/* Tweet text */}
          <p className="text-gray-900 mb-3 whitespace-pre-wrap">{tweet.text}</p>

          {/* Actions */}
          <div className="flex items-center gap-6 text-gray-500">
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">{tweet.replies}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm">{tweet.retweets}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{tweet.likes}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toxic overlay */}
      {showOverlay && <ToxicOverlay category={category} reason={reason} />}
    </div>
  );
}
