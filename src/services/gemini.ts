import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyCxDlZSRhH94p--WT2E7SGqKW0mSziF-1Q';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

type MoodAnalysis = {
  mood: string;
  confidence: number;
  explanation: string;
  error?: string;
};

type SongRecommendation = {
  title: string;
  artist: string;
  language: 'hindi' | 'english' | 'punjabi' | 'bengali' | 'tamil' | 'telugu';
};

type MovieRecommendation = {
  Title: string;
  Year: string;
  Genre: string;
  Industry: 'Hollywood' | 'Bollywood' | 'Tollywood' | 'Punjabi' | 'Tamil' | 'Bengali';
  WhereToWatch: string[];
  imdbRating?: string;
};

const cleanJsonString = (str: string): string => {
  return str.replace(/```json\n?/g, '')
           .replace(/```\n?/g, '')
           .trim();
};

export const analyzeMoodWithGemini = async (text: string): Promise<MoodAnalysis> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Enhanced content moderation with strict profanity checking
    const moderationPrompt = `You are a content moderator for a mood-based entertainment platform. Your task is to detect inappropriate content in any language and respond appropriately.

    Analyze this text for:
    1. Explicit profanity or swear words in any language (including English and Indian languages)
    2. Offensive slang or derogatory terms
    3. Hate speech or discriminatory language
    4. Sexual content or innuendos
    5. Violent or threatening language
    6. Mixed-language profanity or offensive content

    If ANY inappropriate content is detected, respond with a JSON object containing a personalized, empathetic message that:
    - Acknowledges the user's emotions
    - Explains why we need respectful communication
    - Encourages them to express themselves differently
    - Maintains a helpful and understanding tone
    - Avoids generic or automated-sounding responses

    Response format:
    {
      "isAppropriate": false,
      "message": "your personalized message here"
    }

    If the content is clean, respond with:
    {
      "isAppropriate": true,
      "message": ""
    }

    Text to analyze: "${text}"`;

    const moderationResult = await model.generateContent(moderationPrompt);
    const moderationResponse = await moderationResult.response;
    const moderationJson = JSON.parse(cleanJsonString(moderationResponse.text()));

    if (!moderationJson.isAppropriate) {
      return {
        mood: 'invalid',
        confidence: 0,
        explanation: '',
        error: moderationJson.message
      };
    }

    // If content is appropriate, proceed with mood analysis
    const moodPrompt = `You are an empathetic AI that understands emotions across different languages and cultures. Analyze this text and determine the underlying mood. If you can't determine the mood clearly, provide a gentle, encouraging response asking for more clarity.

    Respond with a JSON object containing:
    {
      "mood": "one of: happy, sad, excited, or relaxed",
      "confidence": "number between 0 and 1",
      "explanation": "brief, empathetic explanation of why you chose this mood",
      "error": "if mood is unclear, provide a friendly message asking for clarification, otherwise leave empty"
    }
    
    Text to analyze: "${text}"`;

    const result = await model.generateContent(moodPrompt);
    const response = await result.response;
    const jsonStr = cleanJsonString(response.text());
    
    try {
      const analysis = JSON.parse(jsonStr);
      
      if (analysis.error) {
        return {
          mood: 'invalid',
          confidence: 0,
          explanation: '',
          error: analysis.error
        };
      }
      
      if (!analysis.mood || !analysis.confidence || !analysis.explanation) {
        throw new Error('Invalid response format');
      }
      
      const validMoods = ['happy', 'sad', 'excited', 'relaxed'];
      const normalizedMood = analysis.mood.toLowerCase();
      if (!validMoods.includes(normalizedMood)) {
        return {
          mood: 'invalid',
          confidence: 0,
          explanation: '',
          error: analysis.error || "Could you share how you're feeling in different words?"
        };
      }
      
      return {
        mood: normalizedMood,
        confidence: Number(analysis.confidence),
        explanation: analysis.explanation
      };
    } catch (error) {
      const clarificationPrompt = `Generate a friendly, conversational message asking the user to express their feelings in a different way. The message should be empathetic and encouraging. Respond with ONLY the message text, no JSON.

      Context: User input was "${text}"`;

      const clarificationResult = await model.generateContent(clarificationPrompt);
      const clarificationResponse = await clarificationResult.response;
      
      return {
        mood: 'invalid',
        confidence: 0,
        explanation: '',
        error: clarificationResponse.text().trim()
      };
    }
  } catch (error) {
    const errorPrompt = `Generate a friendly, apologetic message explaining that we're having trouble understanding the user's mood, asking them to try expressing it differently. Make it conversational and encouraging. Respond with ONLY the message text, no JSON.

    Consider:
    - Be empathetic and understanding
    - Avoid generic responses
    - Encourage honest expression
    - Maintain a helpful tone
    - Make it personal`;

    try {
      const errorResult = await model.generateContent(errorPrompt);
      const errorResponse = await errorResult.response;
      
      return {
        mood: 'invalid',
        confidence: 0,
        explanation: '',
        error: errorResponse.text().trim()
      };
    } catch {
      return {
        mood: 'invalid',
        confidence: 0,
        explanation: '',
        error: "Could you share your feelings in a different way? I'm here to help find entertainment that matches your mood."
      };
    }
  }
};

export const generateSongRecommendations = async (mood: string, languages: string[]): Promise<SongRecommendation[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are a music expert who knows songs in multiple languages. Based on the mood "${mood}", suggest songs in the following languages: ${languages.join(', ')}. Provide 5 songs for each selected language. Respond with ONLY a JSON array of objects (no markdown, no extra text) where each object has:
    {
      "title": "song title",
      "artist": "artist name",
      "language": one of: ${languages.map(l => `"${l}"`).join(', ')}
    }
    
    Make sure to:
    1. Include popular and well-known songs that truly reflect the mood
    2. Include a mix of recent and classic songs
    3. Ensure accurate artist names and song titles
    4. Maintain equal distribution among selected languages
    5. Only include family-friendly songs
    6. Avoid songs with explicit content in any language`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonStr = cleanJsonString(response.text());
    
    try {
      const recommendations = JSON.parse(jsonStr);
      
      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error('Invalid recommendations format');
      }
      
      return recommendations.map(rec => ({
        title: rec.title || 'Unknown Song',
        artist: rec.artist || 'Unknown Artist',
        language: rec.language
      }));
    } catch (e) {
      console.error('Failed to parse song recommendations:', jsonStr);
      throw e;
    }
  } catch (error) {
    console.error('Error generating song recommendations:', error);
    throw error;
  }
};

export const getMovieRecommendationsFromGemini = async (mood: string, genre: string, industries: string[]): Promise<MovieRecommendation[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are a movie expert who knows films from multiple industries. Based on the mood "${mood}" and genre "${genre}", suggest movies from the following industries: ${industries.join(', ')}. Provide 5 movies for each selected industry. Respond with ONLY a JSON array of objects (no markdown, no extra text) where each object has:
    {
      "Title": "movie title",
      "Year": "year of release",
      "Genre": "primary genre",
      "Industry": one of: ${industries.map(i => `"${i}"`).join(', ')},
      "WhereToWatch": ["OTT platform names where the movie is available"],
      "imdbRating": "IMDB rating if available"
    }
    
    Make sure to:
    1. Include popular and well-known movies that truly reflect the mood
    2. Include a mix of recent and classic movies
    3. List actual OTT platforms where these movies are commonly available (Netflix, Prime Video, Disney+, etc.)
    4. Provide accurate IMDB ratings if known
    5. Maintain equal distribution among selected industries
    6. Only include family-friendly movies suitable for all ages
    7. Avoid movies with inappropriate content in any language`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonStr = cleanJsonString(response.text());
    
    try {
      const recommendations = JSON.parse(jsonStr);
      
      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error('Invalid recommendations format');
      }
      
      return recommendations.map(rec => ({
        Title: rec.Title || 'Unknown Movie',
        Year: rec.Year || 'N/A',
        Genre: rec.Genre || 'N/A',
        Industry: rec.Industry,
        WhereToWatch: Array.isArray(rec.WhereToWatch) ? rec.WhereToWatch : [],
        imdbRating: rec.imdbRating
      }));
    } catch (e) {
      console.error('Failed to parse movie recommendations:', jsonStr);
      throw e;
    }
  } catch (error) {
    console.error('Error generating movie recommendations:', error);
    throw error;
  }
};