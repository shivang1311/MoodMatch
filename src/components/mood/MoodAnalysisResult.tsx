import React from 'react';

interface MoodAnalysisResultProps {
  mood: string;
  explanation: string;
}

export function MoodAnalysisResult({ mood, explanation }: MoodAnalysisResultProps) {
  return (
    <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl animate-slideDown">
      <p className="text-yellow-300 font-medium">
        Detected Mood: {mood}
      </p>
      <p className="text-gray-300 text-sm mt-1">
        {explanation}
      </p>
    </div>
  );
}