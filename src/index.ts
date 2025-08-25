export { default as CloudAnimation } from './components/CloudAnimation';
export { default as ThemeToggle } from './components/ThemeToggle';
export { default as CloudToggleButton } from './components/CloudToggleButton';
export { ThemeProvider, useTheme } from './context/ThemeContext';
export type { 
  Theme, 
  BackgroundEffect, 
  ThemeContextType, 
  CloudAnimationProps, 
  ThemeToggleProps,
  CloudToggleButtonProps
} from './types';

// Export CSS for consumers to import
import './styles/animations.css';
