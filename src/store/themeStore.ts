import { create } from 'zustand';
import { ThemeState } from '../types';

export const useThemeStore = create<ThemeState>((set) => {
  // Check if user has a preference stored or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  
  // Set initial theme on body
  if (initialDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isDarkMode: initialDarkMode,
    toggleTheme: () => {
      set((state) => {
        const newDarkMode = !state.isDarkMode;
        
        // Update localStorage
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
        
        // Update document class
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        return { isDarkMode: newDarkMode };
      });
    },
  };
});