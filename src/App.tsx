import React, { useState, useEffect } from 'react';
import { Sparkles, Info } from 'lucide-react';
import { analyzeMoodWithGemini } from './services/gemini';
import { getMoviesByMood } from './services/api';
import { getPlaylistItems } from './services/youtube';
import { Header } from './components/Header';
import { TabSelector } from './components/TabSelector';
import { MoodInput } from './components/MoodInput';
import { PreferencesSelector } from './components/PreferencesSelector';
import { RecommendationList } from './components/RecommendationList';
import { AboutModal } from './components/modals/AboutModal';
import { AuthorModal } from './components/modals/AuthorModal';
import { LanguageOption, IndustryOption, Recommendation } from './types';

function App() {
  const [userInput, setUserInput] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState<'music' | 'movies'>('music');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moodAnalysis, setMoodAnalysis] = useState<{ mood: string; explanation: string } | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageOption[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryOption[]>([]);
  const [showAbout, setShowAbout] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const musicLanguages: Array<{ value: LanguageOption; label: string }> = [
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
  ];

  const movieIndustries: Array<{ value: IndustryOption; label: string }> = [
    { value: 'Hollywood', label: 'Hollywood' },
    { value: 'Bollywood', label: 'Bollywood' },
    { value: 'Tollywood', label: 'Tollywood' },
    { value: 'Punjabi', label: 'Punjabi' },
    { value: 'Tamil', label: 'Tamil Cinema' },
    { value: 'Bengali', label: 'Bengali Cinema' },
  ];

  const analyzeMood = async () => {
    setLoading(true);
    setError(null);
    setMoodAnalysis(null);
    setShowPreferences(false);
    
    try {
      const analysis = await analyzeMoodWithGemini(userInput);
      
      if (analysis.error) {
        setError(analysis.error);
        return;
      }
      
      setMoodAnalysis({
        mood: analysis.mood,
        explanation: analysis.explanation
      });
      setShowPreferences(true);
    } catch (error) {
      console.error('Error analyzing mood:', error);
      setError('Failed to analyze mood. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!moodAnalysis) {
        throw new Error('Please analyze your mood first');
      }

      if (activeTab === 'music' && selectedLanguages.length === 0) {
        throw new Error('Please select at least one language');
      }

      if (activeTab === 'movies' && selectedIndustries.length === 0) {
        throw new Error('Please select at least one film industry');
      }
      
      if (activeTab === 'music') {
        const videos = await getPlaylistItems(moodAnalysis.mood, selectedLanguages);
        if (videos.length === 0) {
          setError('No music recommendations found. Please try different languages.');
          return;
        }
        setRecommendations(
          videos.map(video => ({
            type: 'music',
            title: video.title,
            artist: video.artist,
            mood: moodAnalysis.mood,
            language: video.language
          }))
        );
      } else {
        const movies = await getMoviesByMood(moodAnalysis.mood, selectedIndustries);
        if (movies.length === 0) {
          setError('No movie recommendations found. Please try different industries.');
          return;
        }
        setRecommendations(
          movies.map(movie => ({
            type: 'movie',
            title: movie.Title,
            year: movie.Year,
            mood: moodAnalysis.mood,
            genre: movie.Genre,
            industry: movie.Industry,
            whereToWatch: movie.WhereToWatch,
            imdbRating: movie.imdbRating,
          }))
        );
      }
      setShowPreferences(false);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setError(error instanceof Error ? error.message : 'Failed to get recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const refreshRecommendations = async () => {
    setIsRefreshing(true);
    await generateRecommendations();
    setIsRefreshing(false);
  };

  const handleTabChange = (tab: 'music' | 'movies') => {
    setActiveTab(tab);
    setShowPreferences(false);
    setSelectedLanguages([]);
    setSelectedIndustries([]);
    setRecommendations([]);
  };

  const toggleOption = (value: string) => {
    if (activeTab === 'music') {
      setSelectedLanguages(prev => 
        prev.includes(value as LanguageOption)
          ? prev.filter(l => l !== value)
          : [...prev, value as LanguageOption]
      );
    } else {
      setSelectedIndustries(prev =>
        prev.includes(value as IndustryOption)
          ? prev.filter(i => i !== value)
          : [...prev, value as IndustryOption]
      );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient'}`}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-transparent' : 'bg-black/30'}`}>
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setShowAbout={setShowAbout}
          setShowAuthor={setShowAuthor}
        />

        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="text-center mb-12 animate-slideDown">
            <div className="inline-flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Mood<span className="text-yellow-300">Match</span>
              </h1>
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
            </div>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-4">
              Experience AI-powered entertainment recommendations tailored to your mood
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
              <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />

              {!showPreferences ? (
                <MoodInput
                  userInput={userInput}
                  setUserInput={setUserInput}
                  loading={loading}
                  onAnalyze={analyzeMood}
                />
              ) : (
                <PreferencesSelector
                  activeTab={activeTab}
                  options={activeTab === 'music' ? musicLanguages : movieIndustries}
                  selectedOptions={activeTab === 'music' ? selectedLanguages : selectedIndustries}
                  onToggleOption={toggleOption}
                  onGenerateRecommendations={generateRecommendations}
                  loading={loading}
                />
              )}

              {error && (
                <div className="mt-6 p-6 bg-white/5 backdrop-blur-xl border border-yellow-300/20 text-white rounded-xl animate-slideDown">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-300/10 rounded-lg">
                      <Info className="w-5 h-5 text-yellow-300" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-yellow-300 mb-1">Friendly Reminder</p>
                      <p className="text-gray-300">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              {moodAnalysis && (
                <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl animate-slideDown">
                  <p className="text-yellow-300 font-medium">
                    Detected Mood: {moodAnalysis.mood}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    {moodAnalysis.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {recommendations.length > 0 && (
            <RecommendationList
              recommendations={recommendations}
              onRefresh={refreshRecommendations}
              isRefreshing={isRefreshing}
            />
          )}

          <footer className="mt-20 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MoodMatch. All rights reserved.
            </p>
          </footer>
        </div>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showAuthor && <AuthorModal onClose={() => setShowAuthor(false)} />}
    </div>
  );
}

export default App;