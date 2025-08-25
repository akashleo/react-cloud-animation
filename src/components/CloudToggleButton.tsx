import React from 'react';
import { Cloud, CloudOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CloudToggleButtonProps {
  className?: string;
}

const CloudToggleButton: React.FC<CloudToggleButtonProps> = ({
  className = ''
}) => {
  const { backgroundEffect, toggleBackgroundEffect } = useTheme();

  return (
    <button
      onClick={toggleBackgroundEffect}
      className={`p-2 rounded-lg transition-colors ${
        backgroundEffect === 'clouds'
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
      } hover:bg-blue-200 dark:hover:bg-blue-800 ${className}`}
      title={backgroundEffect === 'clouds' ? 'Hide clouds' : 'Show clouds'}
    >
      {backgroundEffect === 'clouds' ? <Cloud className="w-5 h-5" /> : <CloudOff className="w-5 h-5" />}
    </button>
  );
};

export default CloudToggleButton;
