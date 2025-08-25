import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface CloudToggleButtonProps {
  className?: string;
  showTooltip?: boolean;
  tooltipText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
}

const CloudToggleButton: React.FC<CloudToggleButtonProps> = ({
  className = '',
  showTooltip = true,
  tooltipText = 'This is "আকাশ" in Bangla, meaning "the sky". Click to toggle cloud animation!',
  size = 'md',
  variant = 'default'
}) => {
  const { theme, backgroundEffect, toggleBackgroundEffect } = useTheme();
  const bengaliTextRef = useRef<HTMLSpanElement>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: { text: 'text-lg', font: 'font-mono' },
    md: { text: 'text-xl', font: 'font-mono font-bold' },
    lg: { text: 'text-2xl', font: 'font-mono font-bold' }
  };

  // Theme-based colors for glow effects
  const getThemeColors = () => {
    switch (theme) {
      case 'light':
        return {
          primary: '#4F46E5', // Indigo
          glow: '#87CEEB', // Sky Blue
          text: '#141852'
        };
      case 'dusk':
        return {
          primary: '#A855F7', // Purple
          glow: '#d2c4f4', // Light Purple
          text: '#140B0B'
        };
      case 'dark':
      default:
        return {
          primary: '#06B6D4', // Cyan
          glow: '#87CEEB', // Sky Blue
          text: '#fdf4dc'
        };
    }
  };

  const colors = getThemeColors();

  // Apply glow effect based on backgroundEffect
  useEffect(() => {
    if (!bengaliTextRef.current) return;
    
    if (backgroundEffect === 'clouds') {
      bengaliTextRef.current.style.color = colors.glow;
      bengaliTextRef.current.style.textShadow = `0 0 12px ${colors.glow}, 0 0 24px ${colors.glow}`;
      bengaliTextRef.current.style.transition = 'all 0.5s ease';
    } else {
      bengaliTextRef.current.style.transition = 'all 1s ease';
      bengaliTextRef.current.style.color = colors.text;
      bengaliTextRef.current.style.textShadow = 'none';
    }
  }, [backgroundEffect, colors]);

  // Get tooltip background color based on theme
  const getTooltipStyle = () => {
    const baseStyle = {
      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f9fafb' : '#141852',
      boxShadow: theme === 'dark' 
        ? '0 0 20px rgba(0,0,0,0.8)' 
        : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb'
    };
    return baseStyle;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsTooltipVisible(true);
    if (backgroundEffect === 'default') {
      e.currentTarget.style.color = colors.glow;
      e.currentTarget.style.textShadow = `0 0 8px ${colors.glow}`;
      e.currentTarget.style.transform = 'scale(1.05)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsTooltipVisible(false);
    if (backgroundEffect === 'default') {
      e.currentTarget.style.color = colors.text;
      e.currentTarget.style.textShadow = 'none';
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  const getAnimationClass = () => {
    if (variant === 'minimal') return '';
    
    return backgroundEffect === 'clouds' 
      ? 'animate-pulse' 
      : 'cloud-toggle-glow cloud-toggle-indicator';
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <span
        ref={bengaliTextRef}
        className={`
          ${sizeConfig[size].text} 
          ${sizeConfig[size].font} 
          transition-all duration-300 
          hover:cursor-pointer 
          inline-block 
          select-none
          ${getAnimationClass()}
        `}
        onClick={toggleBackgroundEffect}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleBackgroundEffect();
          }
        }}
        aria-label="Toggle cloud animation"
        style={{
          color: colors.text,
          cursor: 'pointer'
        }}
      >
        আকাশ
      </span>
      
      {/* Tooltip */}
      {showTooltip && isTooltipVisible && (
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50 transition-opacity duration-200"
          style={getTooltipStyle()}
        >
          {tooltipText}
          <div 
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
            style={{ 
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CloudToggleButton;
