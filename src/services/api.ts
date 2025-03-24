import { getMovieRecommendationsFromGemini } from './gemini';

export type MovieResult = {
  Title: string;
  Year: string;
  Genre: string;
  Industry: 'Hollywood' | 'Bollywood' | 'Tollywood' | 'Punjabi' | 'Tamil' | 'Bengali';
  WhereToWatch: string[];
  imdbRating?: string;
};

const MOOD_TO_GENRE_MAPPING: Record<string, string[]> = {
  happy: ['Comedy', 'Adventure'],
  sad: ['Drama', 'Romance'],
  excited: ['Action', 'Thriller'],
  relaxed: ['Animation', 'Family']
};

export const getMoviesByMood = async (mood: string, industries: string[]): Promise<MovieResult[]> => {
  try {
    const normalizedMood = mood.toLowerCase();
    const genres = MOOD_TO_GENRE_MAPPING[normalizedMood] || ['Comedy'];
    return await getMovieRecommendationsFromGemini(normalizedMood, genres[0], industries);
  } catch (error) {
    console.error('Error getting movies by mood:', error);
    return [];
  }
};