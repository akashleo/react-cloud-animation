import React from 'react';
import { Sun, Moon, SunMoon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', size = 5 }) => {
  const { theme, setTheme, resetToAutoTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dusk');
    } else {
      setTheme('dark');
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    resetToAutoTheme();
  };

  return (
    <button 
      onClick={cycleTheme}
      onContextMenu={handleContextMenu}
      className={`theme-toggle-btn ${className}`}
      aria-label="Toggle theme"
      title={`Current theme: ${theme}. Right-click to reset to auto`}
    >
      <div className="theme-toggle-icon-container">
        {theme === 'dark' && (
          <Moon className={`theme-icon w-${size} h-${size}`} />
        )}
        {theme === 'light' && (
          <Sun className={`theme-icon w-${size} h-${size}`} />
        )}
        {theme === 'dusk' && (
          <SunMoon className={`theme-icon w-${size} h-${size}`} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
