import React from 'react';
import { Send } from 'lucide-react';

interface MoodInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  loading: boolean;
  onAnalyze: () => void;
}

export function MoodInput({ userInput, setUserInput, loading, onAnalyze }: MoodInputProps) {
  return (
    <div className="relative">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="How are you feeling today? Describe your mood in detail..."
        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300/50 focus:border-transparent resize-none h-32"
      />
      <button
        onClick={onAnalyze}
        disabled={loading || !userInput.trim()}
        className="absolute bottom-4 right-4 bg-yellow-300 text-indigo-900 p-3 rounded-xl hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-300"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send size={20} />
        )}
      </button>
    </div>
  );
}