import { useState } from 'react';

// Types
type FilterSensitivity = 'loose' | 'standard' | 'strict';
type PostAction = 'notify' | 'mask' | 'hide' | 'delete';

interface FilterType {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface BlacklistKeyword {
  keyword: string;
  context: string;
}

interface TriggerThreshold {
  commentRate: number;
  negativeRatio: number;
  negativeCount: number;
}

interface ExitThreshold {
  trafficFallback: number;
  stableDuration: number;
}

// Initial state
const initialFilterTypes: FilterType[] = [
  {
    id: 'threat',
    name: 'Threat (Violence)',
    description: 'E.g., "I\'ll find you", "Go die" - threats to personal safety',
    enabled: true,
  },
  {
    id: 'hate',
    name: 'Hate (Speech)',
    description: 'Targeted attacks based on race, gender, or region',
    enabled: true,
  },
  {
    id: 'distortion',
    name: 'Distortion (Misinformation)',
    description: 'Spreading false info, e.g., "Photoshopped fake", "They\'re a homewrecker"',
    enabled: true,
  },
  {
    id: 'toxic',
    name: 'Toxic (Sarcasm/Mockery)',
    description: 'Uncomfortable sarcasm without profanity, e.g., "That\'s it?"',
    enabled: false,
  },
  {
    id: 'hijacking',
    name: 'Traffic Hijacking (Ads/Links)',
    description: 'Irrelevant ad links, course selling, MLM promotion',
    enabled: true,
  },
  {
    id: 'scam',
    name: 'Scam & Spam (Fraud)',
    description: 'Pig-butchering scams, fake jobs, repetitive spam',
    enabled: true,
  },
];

export default function Rules() {
  const [activeTab, setActiveTab] = useState<'daily' | 'crisis'>('daily');

  // Daily Mode State
  const [filterSensitivity, setFilterSensitivity] = useState<FilterSensitivity>('standard');
  const [filterTypes, setFilterTypes] = useState<FilterType[]>(initialFilterTypes);
  const [chineseEnabled, setChineseEnabled] = useState(true);
  const [englishEnabled, setEnglishEnabled] = useState(true);
  const [blacklistKeywords, setBlacklistKeywords] = useState<BlacklistKeyword[]>([
    { keyword: '骗子', context: '诈骗话术' },
    { keyword: '退钱', context: '恶意售后' },
    { keyword: '丑八怪', context: '人身攻击' },
  ]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newContext, setNewContext] = useState('');
  const [postAction, setPostAction] = useState<PostAction>('hide');

  // Crisis Mode State
  const [triggerThreshold, setTriggerThreshold] = useState<TriggerThreshold>({
    commentRate: 50,
    negativeRatio: 20,
    negativeCount: 100,
  });
  const [exitThreshold, setExitThreshold] = useState<ExitThreshold>({
    trafficFallback: 80,
    stableDuration: 4,
  });

  // Handlers
  const toggleFilterType = (id: string) => {
    setFilterTypes(prev => prev.map(ft =>
      ft.id === id ? { ...ft, enabled: !ft.enabled } : ft
    ));
  };

  const addBlacklistKeyword = () => {
    if (newKeyword.trim()) {
      setBlacklistKeywords(prev => [...prev, { keyword: newKeyword, context: newContext }]);
      setNewKeyword('');
      setNewContext('');
    }
  };

  const removeBlacklistKeyword = (index: number) => {
    setBlacklistKeywords(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    // TODO: API call to save settings
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="bg-white -mx-6 -mt-6 px-8 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Defense Rules</h2>
        <button
          onClick={handleSaveAll}
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2 transform active:scale-95"
        >
          <i className="fa-solid fa-floppy-disk"></i> Save All Settings
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="bg-white -mx-6 px-8 pt-6 border-b border-gray-200 sticky top-[73px] z-20">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('daily')}
            className={`pb-4 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors outline-none ${
              activeTab === 'daily'
                ? 'border-green-500 text-green-500'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-solid fa-sun"></i> Daily Mode
          </button>
          <button
            onClick={() => setActiveTab('crisis')}
            className={`pb-4 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors outline-none ${
              activeTab === 'crisis'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fa-solid fa-triangle-exclamation"></i> Crisis Mode
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto pt-8 pb-24">
        {activeTab === 'daily' ? (
          <div className="space-y-8">
            {/* 1. Filter Sensitivity */}
            <section>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-500 rounded-full"></span> Filter Sensitivity
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {/* Loose */}
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="filter-sensitivity"
                    checked={filterSensitivity === 'loose'}
                    onChange={() => setFilterSensitivity('loose')}
                    className="peer sr-only"
                  />
                  <div className="p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-green-200 peer-checked:border-green-500 peer-checked:bg-green-50 transition-all h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border ${
                        filterSensitivity === 'loose'
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}></div>
                      <span className="font-bold text-slate-700">Loose</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Only blocks obvious ads and prohibited content. Most emotional speech allowed.
                    </p>
                  </div>
                </label>

                {/* Standard */}
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="filter-sensitivity"
                    checked={filterSensitivity === 'standard'}
                    onChange={() => setFilterSensitivity('standard')}
                    className="peer sr-only"
                  />
                  <div className="p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-green-500 peer-checked:border-green-500 peer-checked:bg-green-50 transition-all h-full peer-checked:shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border ${
                        filterSensitivity === 'standard'
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}></div>
                      <span className="font-bold text-slate-700">Standard</span>
                      <span className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Recommended</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Blocks profanity, personal attacks, external links, and spam.
                    </p>
                  </div>
                </label>

                {/* Strict */}
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="filter-sensitivity"
                    checked={filterSensitivity === 'strict'}
                    onChange={() => setFilterSensitivity('strict')}
                    className="peer sr-only"
                  />
                  <div className="p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-green-200 peer-checked:border-green-500 peer-checked:bg-green-50 transition-all h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border ${
                        filterSensitivity === 'strict'
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}></div>
                      <span className="font-bold text-slate-700">Strict</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Blocks all negative sentiment, no-avatar accounts, and new accounts.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {/* 2. Filter Categories */}
            <section>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-500 rounded-full"></span> Filter Categories
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {filterTypes.map(ft => (
                  <div
                    key={ft.id}
                    className={`bg-white p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                      ft.enabled ? 'border-green-300 bg-green-50/30' : 'border-gray-200 hover:border-green-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={ft.enabled}
                      onChange={() => toggleFilterType(ft.id)}
                      className="mt-1 w-4 h-4 text-green-500 rounded border-gray-300 focus:ring-green-500"
                    />
                    <div>
                      <span className="text-sm font-bold text-slate-800">{ft.name}</span>
                      <p className="text-xs text-slate-500 mt-1">{ft.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Language & Blacklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Language Library */}
              <section className="md:col-span-1">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-500 rounded-full"></span> Language Library
                </h3>
                <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Chinese (CN)</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={chineseEnabled}
                        onChange={(e) => setChineseEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">English (EN)</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={englishEnabled}
                        onChange={(e) => setEnglishEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Custom Blacklist */}
              <section className="md:col-span-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-500 rounded-full"></span> Custom Blacklist Keywords
                </h3>
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  {/* Tags Area */}
                  <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg min-h-[60px] content-start">
                    {blacklistKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-red-200 text-red-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm"
                      >
                        {kw.keyword} {kw.context && `(${kw.context})`}
                        <i
                          onClick={() => removeBlacklistKeyword(idx)}
                          className="fa-solid fa-xmark cursor-pointer hover:text-red-800"
                        ></i>
                      </span>
                    ))}
                  </div>
                  {/* Input Area */}
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <label className="block text-[10px] text-slate-400 mb-1 ml-1">Keyword</label>
                      <input
                        type="text"
                        placeholder="e.g. scammer"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addBlacklistKeyword()}
                        className="w-full bg-white border border-gray-200 text-sm rounded-lg p-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] text-slate-400 mb-1 ml-1">
                        Explanation / Context (optional, helps AI understand slang)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. derogatory term for men"
                          value={newContext}
                          onChange={(e) => setNewContext(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addBlacklistKeyword()}
                          className="flex-1 bg-white border border-gray-200 text-sm rounded-lg p-2.5 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                        <button
                          onClick={addBlacklistKeyword}
                          className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-lg font-medium text-sm transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* 4. Post-Interception Actions */}
            <section>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center">
                <span className="w-1 h-4 bg-green-500 rounded-full mr-2"></span> Post-Interception Actions
                <span className="ml-2 text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  <i className="fa-solid fa-circle-info mr-1"></i>
                  All intercepted content shown in logs, saved for 3 days by default
                </span>
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <label className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="post-action"
                    checked={postAction === 'notify'}
                    onChange={() => setPostAction('notify')}
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-slate-700">Notify Only (No Action)</span>
                    <span className="block text-xs text-slate-500">
                      Mark malicious comments in backend, but take no action on platform.
                    </span>
                  </div>
                </label>
                <label className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="post-action"
                    checked={postAction === 'mask'}
                    onChange={() => setPostAction('mask')}
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-slate-700">Mask & Notify</span>
                    <span className="block text-xs text-slate-500">
                      Apply Gaussian blur to malicious content in browser, click to reveal.
                    </span>
                  </div>
                </label>
                <label className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="post-action"
                    checked={postAction === 'hide'}
                    onChange={() => setPostAction('hide')}
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-slate-700">Hide</span>
                    <span className="block text-xs text-slate-500">
                      Use platform API to set comment as "author only" or collapse (platform dependent).
                    </span>
                  </div>
                </label>
                <label className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="post-action"
                    checked={postAction === 'delete'}
                    onChange={() => setPostAction('delete')}
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-slate-700">Auto-Delete</span>
                    <span className="block text-xs text-slate-500">
                      Directly delete malicious comments. Note: This action is irreversible.
                    </span>
                  </div>
                </label>
              </div>
            </section>
          </div>
        ) : (
          // Crisis Mode Content
          <div className="space-y-8">
            {/* Top Notice */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <i className="fa-solid fa-circle-info text-red-500 mt-1"></i>
              <div>
                <h4 className="font-bold text-red-800 text-sm">Maximum Protection Level Pre-configured</h4>
                <p className="text-xs text-red-600 mt-1">
                  In Crisis Mode, the system defaults to Enterprise-grade AI with higher computing cost and automatically enables "Strict" filtering.
                  The settings below define when the system enters and exits this mode.
                </p>
              </div>
            </div>

            {/* Trigger Thresholds */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Entry Triggers */}
              <div className="bg-white p-6 rounded-xl border-2 border-red-100 shadow-sm">
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-fire"></i> Entry Triggers
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Comment Rate Threshold
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={triggerThreshold.commentRate}
                        onChange={(e) => setTriggerThreshold(prev => ({ ...prev, commentRate: Number(e.target.value) }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm pr-24 font-mono outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300"
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-400">comments/min</span>
                    </div>
                    <p className="text-[10px] text-blue-500 mt-1 flex items-center gap-1">
                      <i className="fa-solid fa-wand-magic-sparkles"></i> AI Suggests: &gt;30 /min
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Negative Comment Ratio
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={triggerThreshold.negativeRatio}
                        onChange={(e) => setTriggerThreshold(prev => ({ ...prev, negativeRatio: Number(e.target.value) }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm pr-8 font-mono outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300"
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-400">%</span>
                    </div>
                    <p className="text-[10px] text-blue-500 mt-1 flex items-center gap-1">
                      <i className="fa-solid fa-wand-magic-sparkles"></i> AI Suggests: &gt;15%
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Negative Comment Absolute Count
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={triggerThreshold.negativeCount}
                        onChange={(e) => setTriggerThreshold(prev => ({ ...prev, negativeCount: Number(e.target.value) }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm pr-16 font-mono outline-none focus:border-red-300 focus:ring-1 focus:ring-red-300"
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-400">comments</span>
                    </div>
                    <p className="text-[10px] text-blue-500 mt-1 flex items-center gap-1">
                      <i className="fa-solid fa-wand-magic-sparkles"></i> AI Suggests: &gt;50 comments
                    </p>
                  </div>
                </div>
              </div>

              {/* Exit Triggers */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-dove"></i> Exit Triggers
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Traffic Fallback Ratio
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={exitThreshold.trafficFallback}
                        onChange={(e) => setExitThreshold(prev => ({ ...prev, trafficFallback: Number(e.target.value) }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm pr-8 font-mono outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300"
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-400">%</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Traffic drops to 20% or below peak
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Stable Duration
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={exitThreshold.stableDuration}
                        onChange={(e) => setExitThreshold(prev => ({ ...prev, stableDuration: Number(e.target.value) }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm pr-12 font-mono outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300"
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-400">hours</span>
                    </div>
                    <p className="text-[10px] text-blue-500 mt-1 flex items-center gap-1">
                      <i className="fa-solid fa-wand-magic-sparkles"></i> AI Suggests: 6 hours
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Locked Base Rules */}
            <section className="opacity-75 pointer-events-none grayscale-[0.5]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1 h-4 bg-gray-400 rounded-full"></span> Base Filter Rules (Uses Daily Config)
                </h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-slate-500">
                  Cannot modify separately in Crisis Mode
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-xl border-2 border-red-500 bg-red-50 text-center">
                  <span className="font-bold text-red-700 text-sm">Strict</span>
                  <p className="text-xs text-red-600 mt-1">System Force-locked</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-language text-slate-400"></i>
                  <span className="text-sm text-slate-500">All Languages Enabled</span>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-ban text-slate-400"></i>
                  <span className="text-sm text-slate-500">Enhanced Blacklist</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* FontAwesome CDN for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
    </div>
  );
}
