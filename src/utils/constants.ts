import { LanguageOption, IndustryOption } from '../types';

export const MUSIC_LANGUAGES: Array<{ value: LanguageOption; label: string }> = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'english', label: 'English' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'bengali', label: 'Bengali' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'telugu', label: 'Telugu' },
];

export const MOVIE_INDUSTRIES: Array<{ value: IndustryOption; label: string }> = [
  { value: 'Hollywood', label: 'Hollywood' },
  { value: 'Bollywood', label: 'Bollywood' },
  { value: 'Tollywood', label: 'Tollywood' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Tamil', label: 'Tamil Cinema' },
  { value: 'Bengali', label: 'Bengali Cinema' },
];