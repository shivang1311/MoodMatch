import React from 'react';
import { Globe } from 'lucide-react';

interface PreferencesSelectorProps {
  activeTab: 'music' | 'movies';
  options: Array<{ value: string; label: string }>;
  selectedOptions: string[];
  onToggleOption: (value: string) => void;
  onGenerateRecommendations: () => void;
  loading: boolean;
}

export function PreferencesSelector({
  activeTab,
  options,
  selectedOptions,
  onToggleOption,
  onGenerateRecommendations,
  loading
}: PreferencesSelectorProps) {
  return (
    <div className="space-y-6 animate-slideDown">
      <div className="flex items-center gap-3 text-lg font-medium text-white">
        <Globe size={24} className="text-yellow-300" />
        <span>Select your preferred {activeTab === 'music' ? 'languages' : 'film industries'}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onToggleOption(option.value)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedOptions.includes(option.value)
                ? 'border-yellow-300 bg-yellow-300/10 text-yellow-300'
                : 'border-white/10 text-white hover:border-white/30'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        onClick={onGenerateRecommendations}
        disabled={loading || selectedOptions.length === 0}
        className="w-full py-4 bg-yellow-300 text-indigo-900 rounded-xl hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-300 font-medium"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin mx-auto" />
        ) : (
          `Get ${activeTab === 'music' ? 'Songs' : 'Movies'}`
        )}
      </button>
    </div>
  );
}