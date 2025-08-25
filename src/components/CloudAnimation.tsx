import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import cloud1 from '../assets/cloud1.png';
import cloud2 from '../assets/cloud2.png';
import cloud3 from '../assets/cloud3.png';
import cloud4 from '../assets/cloud4.png';
import cloud5 from '../assets/cloud5.png';

interface CloudAnimationProps {
  cloudImages?: string[];
  animationSpeeds?: number[];
  customColors?: {
    light: { default: string; clouds: string };
    dark: { default: string; clouds: string };
    dusk: { default: string; clouds: string };
  };
}

const defaultCloudImages = [cloud1, cloud2, cloud3, cloud4, cloud5];

const CloudAnimation: React.FC<CloudAnimationProps> = ({ 
  cloudImages = defaultCloudImages,
  animationSpeeds = [40, 45, 50, 55, 60],
  customColors
}) => {
  const { theme, backgroundEffect, isAnimating } = useTheme();
  
  // Log when the component mounts (animation starts)
  useEffect(() => {
    console.log("Cloud animation started with marquee-like continuous movement");
  }, []);

  // Get background color based on theme and effect
  const getBackgroundColor = () => {
    if (customColors) {
      const themeColors = customColors[theme];
      return backgroundEffect === 'clouds' ? themeColors.clouds : themeColors.default;
    }
    
    if (theme === 'light') {
      return backgroundEffect === 'clouds' ? '#87CEEB' : '#fdf5e0';
    } else if (theme === 'dusk') {
      return backgroundEffect === 'clouds' ? '#d2c4f4' : '#4E5481';
    } else { // dark
      return backgroundEffect === 'clouds' ? '#141852' : '#000000';
    }
  };

  return (
    <>
      {/* Sky background layer - z-index 10 - Always rendered */}
      <div 
        id="background-wrap" 
        style={{
          backgroundColor: getBackgroundColor(),
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10
        }} 
        className={isAnimating ? 'animate-fadeout' : ''}
      />
      
      {/* Clouds layer - z-index 30 (above components) - Only when clouds effect is active */}
      {backgroundEffect === 'clouds' && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 30, pointerEvents: 'none', overflow: 'hidden' }}
          className={isAnimating ? 'animate-fadeout' : ''}
        >
          {cloudImages.map((cloudImage, index) => {
            const cloudClass = `x${index + 1}`;
            const isRightToLeft = index % 2 === 0;
            
            return (
              <div 
                key={index} 
                className={`cloud-container ${cloudClass}`}
                style={{
                  animation: `${isRightToLeft ? 'marqueeRightToLeft' : 'marqueeLeftToRight'} ${animationSpeeds[index]}s linear infinite`
                }}
              >
                <img src={cloudImage} alt={`Cloud ${index + 1}`} className="cloud-img" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CloudAnimation;
