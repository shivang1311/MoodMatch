export const getBackgroundClass = (isDarkMode: boolean) => 
  isDarkMode 
    ? 'bg-gray-900' 
    : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient';

export const getOverlayClass = (isDarkMode: boolean) =>
  isDarkMode ? 'bg-transparent' : 'bg-black/30';