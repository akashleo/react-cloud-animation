# React Cloud Animation

An interactive cloud animation system with theme-aware backgrounds for React applications. Features smooth marquee-style cloud movements, automatic time-based theming, and customizable animations.

## Features

- 🌤️ **Animated Clouds** - 5 clouds with continuous marquee movement
- 🎨 **Theme System** - Dark, Light, and Dusk themes with automatic time-based switching
- 🌍 **Cloud Toggle Button** - Icon-based toggle button with Cloud/CloudOff icons
- ⚡ **Performance Optimized** - GPU-accelerated animations using CSS transforms
- 🎯 **TypeScript Support** - Full type definitions included
- 📱 **Responsive** - Works on all screen sizes
- 🎨 **Customizable** - Configure colors, speeds, and cloud images
- ♿ **Accessible** - Full keyboard navigation and screen reader support

## Installation

```bash
npm install react-cloud-animation
# or
yarn add react-cloud-animation
```

## Quick Start

```tsx
import { ThemeProvider, CloudAnimation, ThemeToggle, CloudToggleButton } from 'react-cloud-animation';
import 'react-cloud-animation/dist/style.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <CloudAnimation />
        <ThemeToggle />
        <CloudToggleButton />
        {/* Your content */}
      </div>
    </ThemeProvider>
  );
}
```

## API Reference

### Components

#### `<ThemeProvider>`
Wraps your application to provide theme context.

```tsx
<ThemeProvider>
  {children}
</ThemeProvider>
```

#### `<CloudAnimation>`
Renders the animated cloud background.

Props:
- `cloudImages?: string[]` - Array of cloud image paths (default: 5 built-in clouds)
- `animationSpeeds?: number[]` - Animation duration in seconds for each cloud (default: [40, 45, 50, 55, 60])
- `customColors?: object` - Custom color configuration for themes

```tsx
<CloudAnimation
  cloudImages={['/cloud1.png', '/cloud2.png']}
  animationSpeeds={[30, 35]}
  customColors={{
    light: { default: '#f0f0f0', clouds: '#87CEEB' },
    dark: { default: '#000000', clouds: '#141852' },
    dusk: { default: '#4E5481', clouds: '#d2c4f4' }
  }}
/>
```

#### `<ThemeToggle>`
Theme switcher button with icons.

Props:
- `className?: string` - Additional CSS classes
- `size?: number` - Icon size (default: 5)

```tsx
<ThemeToggle className="my-custom-class" size={6} />
```

#### `<CloudToggleButton>`
Icon-based button that toggles cloud animations. Shows Cloud icon when clouds are active, CloudOff when inactive.

Props:
- `className?: string` - Additional CSS classes

```tsx
<CloudToggleButton className="my-custom-class" />
```

**Features:**
- **Theme-Aware**: Adapts colors based on current theme (light/dark mode)
- **Icon Toggle**: Cloud icon when active, CloudOff when inactive
- **Accessibility**: Includes title attribute for screen readers
- **Hover Effects**: Smooth color transitions on hover

### Hooks

#### `useTheme()`
Access theme context within ThemeProvider.

```tsx
const {
  theme,              // Current theme: 'dark' | 'light' | 'dusk'
  setTheme,           // Set theme manually
  backgroundEffect,   // Current effect: 'default' | 'clouds'
  toggleBackgroundEffect, // Toggle between default and clouds
  isAnimating,        // Animation state
  currentTime,        // Current time string
  isUserControlled,   // Whether theme is manually set
  resetToAutoTheme    // Reset to automatic time-based theme
} = useTheme();
```

## Theme System

### Automatic Time-Based Themes
- **Light**: 6:00 AM - 2:00 PM
- **Dusk**: 2:00 PM - 8:00 PM
- **Dark**: 8:00 PM - 6:00 AM

### Manual Theme Control
Users can override automatic themes by clicking the theme toggle. Right-click to reset to automatic mode.

## Customization

### Custom Cloud Images
```tsx
<CloudAnimation
  cloudImages={[
    '/assets/custom-cloud1.png',
    '/assets/custom-cloud2.png',
    '/assets/custom-cloud3.png'
  ]}
/>
```

### Animation Speeds
```tsx
<CloudAnimation
  animationSpeeds={[20, 25, 30, 35, 40]} // Faster animations
/>
```

### Custom Theme Colors
```tsx
<CloudAnimation
  customColors={{
    light: {
      default: '#ffffff',  // Background when clouds are off
      clouds: '#87CEEB'    // Background when clouds are on
    },
    dark: {
      default: '#1a1a1a',
      clouds: '#2c3e50'
    },
    dusk: {
      default: '#4a5568',
      clouds: '#805ad5'
    }
  }}
/>
```

## CSS Classes

The package provides several CSS classes for styling:

- `.cloud-container` - Cloud wrapper element
- `.cloud-img` - Individual cloud image
- `.animate-subtle-glow` - Subtle glow animation
- `.animate-prominent-glow` - Prominent glow animation
- `.theme-toggle-btn` - Theme toggle button

## Z-Index Structure

The animation system uses a layered z-index structure:
- Background: z-index 10
- Your content: z-index 20 (recommended)
- Clouds: z-index 30
- Navigation: z-index 40+ (recommended)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Created with ❤️ by the React Cloud Animation team.
