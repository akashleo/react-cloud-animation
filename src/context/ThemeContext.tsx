import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'dusk';
type BackgroundEffect = 'default' | 'clouds';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  backgroundEffect: BackgroundEffect;
  toggleBackgroundEffect: () => void;
  isAnimating: boolean;
  currentTime: string;
  isUserControlled: boolean;
  resetToAutoTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Function to determine theme based on current time
const getThemeByTime = (): Theme => {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 6 && hour < 14) {
    return 'light'; // 6am to 2pm
  } else if (hour >= 14 && hour < 20) {
    return 'dusk'; // 2pm to 8pm
  } else {
    return 'dark'; // 8pm to 6am
  }
};

// Function to format current time
const getCurrentTimeString = (): string => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem('userTheme') as Theme | null;
  const hasUserPreference = savedTheme !== null;
  
  // Use saved theme if available, otherwise use time-based theme
  const [theme, setThemeState] = useState<Theme>(savedTheme || getThemeByTime());
  const [backgroundEffect, setBackgroundEffect] = useState<BackgroundEffect>('default');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTimeString);
  const [isUserControlled, setIsUserControlled] = useState<boolean>(hasUserPreference);

  // Custom setTheme that marks the theme as user-controlled
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setIsUserControlled(true);
    localStorage.setItem('userTheme', newTheme);
  };

  // Reset to automatic time-based theme
  const resetToAutoTheme = () => {
    localStorage.removeItem('userTheme');
    setIsUserControlled(false);
    setThemeState(getThemeByTime());
  };

  const toggleBackgroundEffect = () => {
    if (backgroundEffect === 'default') {
      // Switching to clouds - immediate transition
      setBackgroundEffect('clouds');
    } else {
      // Switching to default - start fadeout animation
      setIsAnimating(true);
      // After fadeout animation completes, change the background effect
      setTimeout(() => {
        setBackgroundEffect('default');
        setIsAnimating(false);
      }, 1000); // Match the fadeout duration in CSS
    }
  };

  // Update time every second (but not theme if user has manually set it)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'dusk');
    root.classList.add(theme);
  }, [theme, backgroundEffect]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      backgroundEffect, 
      toggleBackgroundEffect, 
      isAnimating, 
      currentTime,
      isUserControlled,
      resetToAutoTheme
    }}>
      {children}
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
