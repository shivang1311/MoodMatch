import { generateSongRecommendations } from './gemini';

type VideoResult = {
  title: string;
  artist: string;
  language: 'hindi' | 'english' | 'punjabi' | 'bengali' | 'tamil' | 'telugu';
};

export const getPlaylistItems = async (mood: string, languages: string[]): Promise<VideoResult[]> => {
  try {
    // Get song recommendations from Gemini
    const recommendations = await generateSongRecommendations(mood, languages);
    
    // Transform recommendations into VideoResult format
    return recommendations.map(song => ({
      title: song.title,
      artist: song.artist,
      language: song.language
    }));
  } catch (error) {
    console.error('Error getting song recommendations:', error);
    return [];
  }
};