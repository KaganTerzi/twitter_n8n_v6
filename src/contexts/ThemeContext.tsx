import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  getThemeColors: () => {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
    cardBg: string;
    border: string;
    glassBg: string;
    glassBorder: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Always start with dark mode - ignore system preferences
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    } else {
      setCurrentTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update HTML class for CSS variables
    if (newTheme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  };

  // Apply theme class on mount
  React.useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  const getThemeColors = () => {
    if (theme === 'light') {
      return {
        primary: 'from-gray-50 via-blue-50 to-indigo-50',
        secondary: 'from-blue-600 to-indigo-600',
        accent: 'from-blue-600 via-indigo-600 to-purple-600',
        background: 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50',
        text: 'text-gray-900',
        textSecondary: 'text-gray-700',
        cardBg: 'bg-white/95',
        border: 'border-gray-300',
        glassBg: 'bg-white/95',
        glassBorder: 'border-gray-300/80'
      };
    }
    
    // Dark theme
    return {
      primary: 'from-slate-900 via-blue-900 to-indigo-900',
      secondary: 'from-blue-600 to-indigo-600',
      accent: 'from-cyan-400 via-blue-400 to-indigo-400',
      background: 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900',
      text: 'text-white',
      textSecondary: 'text-slate-300',
      cardBg: 'bg-white/10',
      border: 'border-white/20',
      glassBg: 'bg-white/10',
      glassBorder: 'border-white/20'
    };
  };

  const themeColors = getThemeColors();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, getThemeColors }}>
      <div className={`${theme === 'light' ? 'light' : 'dark'} ${themeColors.background} min-h-screen transition-all duration-500`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};