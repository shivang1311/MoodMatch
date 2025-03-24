import React from 'react';
import { RefreshCw, Sparkles, Share2 } from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationListProps {
  recommendations: Recommendation[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function RecommendationList({ recommendations, onRefresh, isRefreshing }: RecommendationListProps) {
  return (
    <div className="max-w-4xl mx-auto animate-slideDown">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            Your Recommendations
          </h2>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-300/10 hover:bg-yellow-300/20 text-yellow-300 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-300/10"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
        <div className="space-y-4">
          {recommendations.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                  {item.artist && (
                    <p className="text-gray-300">{item.artist}</p>
                  )}
                  <p className="text-sm text-gray-400">
                    {item.type === 'music' && item.language && 
                      `${item.language.toUpperCase()} • `}
                    {item.type === 'movie' && item.industry && 
                      `${item.industry} • `}
                    {item.year && `${item.year} • `}
                    {item.genre || item.mood}
                    {item.imdbRating && ` • IMDb ${item.imdbRating}`}
                  </p>
                  {item.type === 'movie' && item.whereToWatch && item.whereToWatch.length > 0 && (
                    <p className="text-sm text-yellow-300 mt-1">
                      Watch on: {item.whereToWatch.join(', ')}
                    </p>
                  )}
                </div>
                <a
                  href={item.type === 'music' 
                    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(`${item.title} ${item.artist} song`)}`
                    : `https://www.google.com/search?q=${encodeURIComponent(`${item.title} ${item.year} movie watch online`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-300 transition-colors"
                >
                  <Share2 size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}