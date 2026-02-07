import { useState, useCallback } from 'react';
import { sampleTweets, type Tweet } from '../lib/sampleData';
import { api } from '../lib/api';
import TwitterFeed from '../components/simulator/TwitterFeed';
import FloatingBall from '../components/simulator/FloatingBall';

interface AnalysisResult {
  id: string;
  isToxic: boolean;
  category: string;
  reason?: string;
  severity?: string;
  llmAnalysis?: any;
}

export default function Simulator() {
  const [isActive, setIsActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<Record<string, AnalysisResult>>({});
  const [userTweets, setUserTweets] = useState<Tweet[]>([]);

  const stats = {
    intercepted: Object.values(analysisResults).filter(r => r.isToxic).length,
    clean: Object.values(analysisResults).filter(r => !r.isToxic).length,
    threatLevel: (Object.values(analysisResults).filter(r => r.isToxic).length > 5
      ? 'High'
      : Object.values(analysisResults).filter(r => r.isToxic).length > 2
      ? 'Medium'
      : 'Low') as 'Low' | 'Medium' | 'High',
  };

  const categoryBreakdown = Object.values(analysisResults)
    .filter(r => r.isToxic)
    .reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const handleToggle = async () => {
    if (isActive) {
      // Deactivate
      setIsActive(false);
      setAnalysisResults({});
    } else {
      // Activate - analyze tweets
      setIsAnalyzing(true);

      try {
        // Prepare items for analysis
        const items = [...userTweets, ...sampleTweets].map(tweet => ({
          id: tweet.id,
          text: tweet.text,
        }));

        // Call API
        const response = await api.analyzeBatch(items);

        // Process results
        const results: Record<string, AnalysisResult> = {};

        if (response.results) {
          response.results.forEach((result: any) => {
            results[result.id] = {
              id: result.id,
              isToxic: result.toxic || false,
              category: result.category || 'Unknown',
              reason: result.reason,
            };
          });
        }

        setAnalysisResults(results);
        setIsActive(true);
      } catch (error) {
        console.error('Analysis failed:', error);

        // Fallback to mock results if API fails
        const mockResults: Record<string, AnalysisResult> = {};

        // Toxic tweet IDs based on sampleData
        const toxicTweets = [
          { id: '3', category: 'Harassment', reason: 'Contains aggressive insults and demands for account deletion' },
          { id: '4', category: 'Harassment', reason: 'Dismissive and insulting language' },
          { id: '5', category: 'Sarcasm', reason: 'Heavy sarcasm and mockery' },
          { id: '6', category: 'Sarcasm', reason: 'Sarcastic criticism' },
          { id: '7', category: 'Threat', reason: 'Contains physical threat and intimidation' },
          { id: '8', category: 'Hate Speech', reason: 'Dehumanizing language suggesting lack of right to exist' },
          { id: '10', category: 'Harassment', reason: 'Chinese text containing insults and demands to leave' },
          { id: '12', category: 'Harassment', reason: 'Harsh criticism calling content garbage' },
          { id: '13', category: 'Spam', reason: 'All caps promotional spam' },
          { id: '14', category: 'Hate Speech', reason: 'Dehumanizing language and wishes for non-existence' },
        ];

        sampleTweets.forEach(tweet => {
          const toxicMatch = toxicTweets.find(t => t.id === tweet.id);
          mockResults[tweet.id] = {
            id: tweet.id,
            isToxic: !!toxicMatch,
            category: toxicMatch?.category || 'Clean',
            reason: toxicMatch?.reason,
          };
        });

        setAnalysisResults(mockResults);
        setIsActive(true);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  // Handle user posting a comment — analyze it in real time
  const handlePost = useCallback(async (text: string) => {
    setIsPosting(true);
    const tweetId = `user_${Date.now()}`;

    // Create tweet object
    const newTweet: Tweet = {
      id: tweetId,
      author: 'You',
      handle: '@you',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
      text,
      timestamp: 'just now',
      likes: 0,
      retweets: 0,
      replies: 0,
    };

    // Add to feed immediately
    setUserTweets(prev => [newTweet, ...prev]);

    try {
      // Call backend → AI service
      const result = await api.analyze(text);

      setAnalysisResults(prev => ({
        ...prev,
        [tweetId]: {
          id: tweetId,
          isToxic: result.toxic || false,
          category: result.category || 'clean',
          reason: result.reason,
          severity: result.severity,
          llmAnalysis: result.llmAnalysis,
        },
      }));
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setIsPosting(false);
    }
  }, []);

  // Combined tweets: user-posted first, then sample data
  const allTweets = [...userTweets, ...sampleTweets];

  // Get list of intercepted tweets for the log
  const interceptedTweets = Object.entries(analysisResults)
    .filter(([, r]) => r.isToxic)
    .map(([id, r]) => {
      const tweet = allTweets.find(t => t.id === id);
      return { ...r, author: tweet?.author || 'Unknown', handle: tweet?.handle || '' };
    });

  return (
    <div className="h-[calc(100vh-8rem)] relative flex gap-5">
      {/* Left Panel - Real-time Stats */}
      <div className="w-[280px] h-full flex-shrink-0 overflow-y-auto space-y-4">
        {/* Shield Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-sm font-semibold text-gray-700">
              {isAnalyzing ? 'Analyzing...' : isActive ? 'Shield Active' : 'Shield Inactive'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-900">{allTweets.length}</div>
              <div className="text-xs text-gray-500 mt-0.5">Total Scanned</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.intercepted}</div>
              <div className="text-xs text-gray-500 mt-0.5">Blocked</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.clean}</div>
              <div className="text-xs text-gray-500 mt-0.5">Clean</div>
            </div>
            <div className={`rounded-lg p-3 text-center ${
              stats.threatLevel === 'High' ? 'bg-red-50' : stats.threatLevel === 'Medium' ? 'bg-yellow-50' : 'bg-green-50'
            }`}>
              <div className={`text-2xl font-bold ${
                stats.threatLevel === 'High' ? 'text-red-600' : stats.threatLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>{stats.threatLevel}</div>
              <div className="text-xs text-gray-500 mt-0.5">Threat Level</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        {Object.keys(categoryBreakdown).length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Category Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(categoryBreakdown).map(([category, count]) => {
                const total = stats.intercepted || 1;
                const pct = Math.round((count / total) * 100);
                const colorMap: Record<string, string> = {
                  'Harassment': 'bg-red-500',
                  'Threat': 'bg-orange-500',
                  'Hate Speech': 'bg-purple-500',
                  'Sarcasm': 'bg-yellow-500',
                  'Spam': 'bg-gray-500',
                };
                const barColor = colorMap[category] || 'bg-blue-500';
                return (
                  <div key={category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{category}</span>
                      <span className="text-gray-500 font-medium">{count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Interception Log */}
        {interceptedTweets.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Interception Log</h3>
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {interceptedTweets.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-gray-800 truncate">{item.author} <span className="text-gray-400 font-normal">{item.handle}</span></div>
                    <div className="text-gray-500 flex items-center gap-1.5">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        item.category === 'Harassment' ? 'bg-red-100 text-red-700' :
                        item.category === 'Threat' ? 'bg-orange-100 text-orange-700' :
                        item.category === 'Hate Speech' ? 'bg-purple-100 text-purple-700' :
                        item.category === 'Sarcasm' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{item.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state when not active */}
        {!isActive && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl mb-2">🛡</div>
            <div className="text-sm font-medium text-gray-700 mb-1">Click the floating shield</div>
            <div className="text-xs text-gray-400">Activate protection to start scanning comments in real-time</div>
          </div>
        )}
      </div>

      {/* Twitter Page with border */}
      <div className="flex-1 h-full rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
        <div className="h-full flex">
        {/* Left Sidebar - Narrow Twitter icon nav */}
        <div className="w-[60px] h-full border-r border-gray-200 flex flex-col items-center py-3 px-1.5 flex-shrink-0">
          {/* X Logo */}
          <div className="p-2.5 rounded-full hover:bg-gray-100 cursor-pointer mb-1">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-900 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>

          {/* Nav Icons only */}
          {[
            { icon: <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z" />, active: true },
            { icon: <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" /> },
            { icon: <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.435-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.858 16H5.134z" /> },
            { icon: <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z" /> },
            { icon: <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 4h8v-2H8v2z" /> },
            { icon: <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.328-1.658-.328-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.138-.107-.377-.345-.502-.504-.907-.975-1.157-1.665-1.157-2.766C12.724 4.056 14.278 2.5 16.5 2.5S20.276 4.056 20.276 6c0 1.101-.25 1.791-1.157 2.766-.125.16-.364.397-.502.504-.589.451-1.317.73-2.116.73zm-7.5-4c-.799 0-1.527-.279-2.116-.73-.138-.107-.377-.345-.502-.504C5.474 3.791 5.224 3.101 5.224 2c0-1.944 1.554-3.5 3.776-3.5s3.776 1.556 3.776 3.5c0 1.101-.25 1.791-1.157 2.766-.125.16-.364.397-.502.504-.589.451-1.317.73-2.116.73z" /> },
          ].map((item, i) => (
            <a
              key={i}
              className={`p-2.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors ${item.active ? 'font-bold' : ''}`}
            >
              <svg viewBox="0 0 24 24" className={`w-[26px] h-[26px] ${item.active ? 'text-gray-900' : 'text-gray-600'} fill-current`}>
                {item.icon}
              </svg>
            </a>
          ))}

          {/* Post Button */}
          <button className="mt-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full w-11 h-11 transition-colors flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M23 3c-6.62-.1-10.38 2.421-13.424 6.054C7.593 11.72 6.747 14.704 6.04 18H4.02c-.553-.577-2.236-2.003-3.72-2.41-.29-.08-.613.07-.74.35-.13.28-.035.62.22.78 2.18 1.36 3.16 3.04 3.39 3.42.16.26.44.42.75.42H8.3c1.073 0 2.16-.19 3.04-.57 3.42-1.47 6.58-5.56 7.57-9.1.59-2.11.78-4.23.63-6.33-.02-.3-.26-.55-.56-.55z" />
            </svg>
          </button>

          {/* Profile at bottom */}
          <div className="mt-auto p-1.5 rounded-full hover:bg-gray-100 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">J</div>
          </div>
        </div>

        {/* Center Feed */}
        <div className="h-full flex-1 min-w-0 border-r border-gray-200">
          <TwitterFeed
            tweets={allTweets}
            analysisResults={analysisResults}
            isShielded={isActive}
            onPost={handlePost}
            isPosting={isPosting}
          />
        </div>

        {/* Right Sidebar - Trending */}
        <div className="hidden xl:block w-[280px] h-full py-3 px-4 overflow-y-auto flex-shrink-0">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="bg-gray-100 rounded-full flex items-center px-4 py-2.5 border border-transparent focus-within:border-sky-500 focus-within:bg-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400 fill-current mr-3 flex-shrink-0">
                <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
              </svg>
              <input type="text" placeholder="Search" className="bg-transparent text-gray-900 outline-none w-full placeholder-gray-500 text-[15px]" />
            </div>
          </div>

          {/* Trending Section */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 px-4 pt-3 pb-2">Trends for you</h2>
            {[
              { category: 'Technology', topic: 'AI Safety', posts: '125K' },
              { category: 'Entertainment', topic: 'Content Creator', posts: '89.2K' },
              { category: 'Trending', topic: '#StopCyberbullying', posts: '52.1K' },
              { category: 'Technology', topic: 'Browser Extension', posts: '18.7K' },
              { category: 'Social', topic: '#OnlineSafety', posts: '34.5K' },
            ].map((trend, i) => (
              <div key={i} className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors">
                <div className="text-[13px] text-gray-500">{trend.category} · Trending</div>
                <div className="text-[15px] font-bold text-gray-900">{trend.topic}</div>
                <div className="text-[13px] text-gray-500">{trend.posts} posts</div>
              </div>
            ))}
            <div className="px-4 py-3 text-sky-500 hover:bg-gray-100 cursor-pointer text-[15px] transition-colors">Show more</div>
          </div>

          {/* Who to follow */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 px-4 pt-3 pb-2">Who to follow</h2>
            {[
              { name: 'MindShield Official', handle: '@mindshield_app', verified: true },
              { name: 'Online Safety Org', handle: '@onlinesafety', verified: true },
              { name: 'Anti-Bully Alliance', handle: '@antibully_org', verified: false },
            ].map((user, i) => (
              <div key={i} className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm flex-shrink-0">{user.name[0]}</div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[15px] font-bold text-gray-900">{user.name}</span>
                      {user.verified && (
                        <svg viewBox="0 0 22 22" className="w-[18px] h-[18px] text-sky-500 fill-current">
                          <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438s1.167.551 1.813.568c.645-.016 1.27-.213 1.81-.567s.97-.854 1.244-1.44c.607.222 1.264.272 1.897.143.634-.131 1.217-.437 1.687-.883.445-.47.75-1.055.882-1.69.13-.634.083-1.29-.14-1.897.587-.273 1.084-.704 1.438-1.246.355-.54.552-1.17.57-1.817zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                        </svg>
                      )}
                    </div>
                    <div className="text-[13px] text-gray-500">{user.handle}</div>
                  </div>
                </div>
                <button className="bg-gray-900 text-white font-bold text-sm rounded-full px-4 py-1.5 hover:bg-gray-800 transition-colors">Follow</button>
              </div>
            ))}
            <div className="px-4 py-3 text-sky-500 hover:bg-gray-100 cursor-pointer text-[15px] transition-colors">Show more</div>
          </div>

          {/* Footer links */}
          <div className="mt-4 px-4 text-[13px] text-gray-600 flex flex-wrap gap-x-3 gap-y-1">
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Cookie Policy</span>
            <span className="hover:underline cursor-pointer">Accessibility</span>
          </div>
        </div>
        </div>
      </div>

      {/* Floating Ball Control */}
      <FloatingBall
        isActive={isActive}
        isAnalyzing={isAnalyzing}
        onToggle={handleToggle}
        stats={stats}
        categoryBreakdown={categoryBreakdown}
      />
    </div>
  );
}
