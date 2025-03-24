import React from 'react';
import { Sparkles } from 'lucide-react';

interface PageTitleProps {
  title: string;
  highlightedText: string;
  subtitle: string;
}

export function PageTitle({ title, highlightedText, subtitle }: PageTitleProps) {
  return (
    <div className="text-center mb-12 animate-slideDown">
      <div className="inline-flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          {title}<span className="text-yellow-300">{highlightedText}</span>
        </h1>
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
      </div>
      <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-4">
        {subtitle}
      </p>
    </div>
  );
}