export type Theme = 'dark' | 'light' | 'dusk';
export type BackgroundEffect = 'default' | 'clouds';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  backgroundEffect: BackgroundEffect;
  toggleBackgroundEffect: () => void;
  isAnimating: boolean;
  currentTime: string;
  isUserControlled: boolean;
  resetToAutoTheme: () => void;
}

export interface CloudAnimationProps {
  cloudImages?: string[];
  animationSpeeds?: number[];
  customColors?: {
    light: { default: string; clouds: string };
    dark: { default: string; clouds: string };
    dusk: { default: string; clouds: string };
  };
}

export interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export interface CloudToggleButtonProps {
  className?: string;
  showTooltip?: boolean;
  tooltipText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
}
