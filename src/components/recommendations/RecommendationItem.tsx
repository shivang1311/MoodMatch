import React from 'react';
import { Share2 } from 'lucide-react';
import { Recommendation } from '../../types';

interface RecommendationItemProps {
  item: Recommendation;
}

export function RecommendationItem({ item }: RecommendationItemProps) {
  return (
    <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
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
  );
}