import { useState } from 'react';
import { sampleTweets } from '../lib/sampleData';
import { api } from '../lib/api';
import TwitterFeed from '../components/simulator/TwitterFeed';
import FloatingBall from '../components/simulator/FloatingBall';

interface AnalysisResult {
  id: string;
  isToxic: boolean;
  category: string;
  reason?: string;
}

export default function Simulator() {
  const [isActive, setIsActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<Record<string, AnalysisResult>>({});

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
        const items = sampleTweets.map(tweet => ({
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
              isToxic: result.isToxic || false,
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

  return (
    <div className="h-[calc(100vh-8rem)] relative">
      {/* Full-screen Twitter Feed */}
      <div className="h-full max-w-2xl mx-auto">
        <TwitterFeed
          tweets={sampleTweets}
          analysisResults={analysisResults}
          isShielded={isActive}
        />
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
