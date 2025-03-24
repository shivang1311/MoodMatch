import React from 'react';
import { Music, Film } from 'lucide-react';

interface TabSelectorProps {
  activeTab: 'music' | 'movies';
  onTabChange: (tab: 'music' | 'movies') => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onTabChange('music')}
        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl transition-all ${
          activeTab === 'music'
            ? 'bg-white text-indigo-600 shadow-lg'
            : 'bg-white/5 text-white hover:bg-white/10'
        }`}
      >
        <Music size={20} />
        <span className="font-medium">Music</span>
      </button>
      <button
        onClick={() => onTabChange('movies')}
        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl transition-all ${
          activeTab === 'movies'
            ? 'bg-white text-indigo-600 shadow-lg'
            : 'bg-white/5 text-white hover:bg-white/10'
        }`}
      >
        <Film size={20} />
        <span className="font-medium">Movies</span>
      </button>
    </div>
  );
}