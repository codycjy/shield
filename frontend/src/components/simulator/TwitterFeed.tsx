import type { Tweet } from '../../lib/sampleData';
import TweetCard from './TweetCard';

interface AnalysisResult {
  id: string;
  isToxic: boolean;
  category: string;
  reason?: string;
}

interface TwitterFeedProps {
  tweets: Tweet[];
  analysisResults: Record<string, AnalysisResult>;
  isShielded: boolean;
}

export default function TwitterFeed({
  tweets,
  analysisResults,
  isShielded,
}: TwitterFeedProps) {
  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Twitter header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Home</h2>
        </div>
        {/* Tab bar */}
        <div className="flex mt-3 -mx-4">
          <button className="flex-1 text-center py-3 text-gray-900 font-bold text-[15px] relative hover:bg-gray-50 transition-colors">
            For you
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-sky-500 rounded-full" />
          </button>
          <button className="flex-1 text-center py-3 text-gray-500 text-[15px] hover:bg-gray-50 transition-colors">
            Following
          </button>
        </div>
      </div>

      {/* Compose tweet area */}
      <div className="border-b border-gray-200 p-4 flex gap-3">
        <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold flex-shrink-0">J</div>
        <div className="flex-1">
          <div className="text-gray-400 text-xl py-2">What is happening?!</div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex gap-1">
              {['M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
                'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'].map((path, i) => (
                <button key={i} className="p-2 rounded-full hover:bg-sky-50 text-sky-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                  </svg>
                </button>
              ))}
            </div>
            <button className="bg-sky-500 text-white font-bold rounded-full px-5 py-1.5 text-[15px] opacity-50 cursor-not-allowed">Post</button>
          </div>
        </div>
      </div>

      {/* Tweet list */}
      <div>
        {tweets.map((tweet) => {
          const analysis = analysisResults[tweet.id];
          return (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              isToxic={analysis?.isToxic || false}
              isShielded={isShielded}
              category={analysis?.category || 'Unknown'}
              reason={analysis?.reason}
            />
          );
        })}
      </div>
    </div>
  );
}
