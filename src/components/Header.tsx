import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  setShowAbout: (value: boolean) => void;
  setShowAuthor: (value: boolean) => void;
}

export function Header({ isDarkMode, setIsDarkMode, setShowAbout, setShowAuthor }: HeaderProps) {
  return (
    <nav className="fixed top-0 right-0 w-full flex justify-between items-center p-4 md:p-6 z-40 bg-gradient-to-b from-black/30 to-transparent">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="text-yellow-300" /> : <Moon className="text-white" />}
      </button>
      <div className="flex gap-3">
        <button
          onClick={() => setShowAbout(true)}
          className={`px-4 py-2 md:px-6 md:py-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white/10'} hover:bg-white/20 text-white text-sm md:text-base font-medium transition-colors border border-white/10`}
        >
          About
        </button>
        <button
          onClick={() => setShowAuthor(true)}
          className="px-4 py-2 md:px-6 md:py-2 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-indigo-900 text-sm md:text-base font-medium transition-colors"
        >
          Meet Creator
        </button>
      </div>
    </nav>
  );
}