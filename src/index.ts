export { default as CloudAnimation } from './components/CloudAnimation';
export { default as ThemeToggle } from './components/ThemeToggle';
export { ThemeProvider, useTheme } from './context/ThemeContext';
export type { 
  Theme, 
  BackgroundEffect, 
  ThemeContextType, 
  CloudAnimationProps, 
  ThemeToggleProps 
} from './types';

// Export CSS for consumers to import
import './styles/animations.css';
