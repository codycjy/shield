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
    <div className="h-full overflow-y-auto bg-gray-100 rounded-lg p-4">
      {/* Twitter header */}
      <div className="bg-white border-b border-gray-200 rounded-t-lg p-4 mb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Home</h2>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">𝕏</span>
          </div>
        </div>
      </div>

      {/* Tweet list */}
      <div className="space-y-3">
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
