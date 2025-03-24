export type Recommendation = {
  type: 'music' | 'movie';
  title: string;
  artist?: string;
  year?: string;
  mood: string;
  genre?: string;
  language?: 'hindi' | 'english' | 'punjabi' | 'bengali' | 'tamil' | 'telugu';
  industry?: 'Hollywood' | 'Bollywood' | 'Tollywood' | 'Punjabi' | 'Tamil' | 'Bengali';
  whereToWatch?: string[];
  imdbRating?: string;
};

export type LanguageOption = 'hindi' | 'english' | 'punjabi' | 'bengali' | 'tamil' | 'telugu';
export type IndustryOption = 'Hollywood' | 'Bollywood' | 'Tollywood' | 'Punjabi' | 'Tamil' | 'Bengali';