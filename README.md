# <img src="images/icon.png" alt="Tailor" height="40"/>

<div align="center">
  <img src="images/logo.png" alt="Tailor Logo" width="300" style="margin-bottom: 20px"/>
  <br/>
  <p><strong>A library for creating styled React components with Tailwind CSS in an organized and typed way, with support for nested styles, variants, and responsive design.</strong></p>
  
  [![npm version](https://img.shields.io/npm/v/tailor.svg)](https://www.npmjs.com/package/tailor)
  [![license](https://img.shields.io/npm/l/tailor.svg)](https://github.com/yourusername/tailor/blob/main/LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/tailor/pulls)
</div>

## ✨ Features

- **Type Safety**: Full TypeScript support with proper type definitions
- **Nested Styles**: Support for styling nested elements with complex selectors
- **Component Variants**: Easy creation of component variants with shared base styles
- **Responsive Design**: Built-in support for responsive styles with Tailwind breakpoints
- **Smart Class Merging**: Uses `tailwind-merge` for intelligent class conflict resolution
- **State Support**: Built-in support for hover, active, focus, and disabled states
- **Animation Support**: Built-in animation utilities with Tailwind
- **React Integration**: Seamless integration with React components and props

## 📦 Installation

```bash
npm install @dennerrondinely/tailor
# or
yarn add @dennerrondinely/tailor
# or
pnpm add @dennerrondinely/tailor
```

## 🚀 Quick Start

### Creating Basic Components

```tsx
import { createElement } from '@dennerrondinely/tailor';

const Button = createElement('button')({
  root: 'px-4 py-2 bg-blue-500 text-white rounded',
  hover: 'hover:bg-blue-600',
  active: 'active:bg-blue-700',
  focus: 'focus:ring-2 focus:ring-blue-500',
  disabled: 'disabled:opacity-50'
});

// Usage
function App() {
  return (
    <Button>
      Click me
    </Button>
  );
}
```

## 📚 Documentation

### Helper Functions

#### tailorFit

Create responsive styles with ease:

```tsx
import { tailorFit } from '@dennerrondinely/tailor';

const responsiveStyles = tailorFit({
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
});

const Card = createElement('div')({
  responsive: {
    root: responsiveStyles,
    hover: tailorFit({
      sm: 'hover:shadow-md',
      md: 'hover:shadow-lg',
      lg: 'hover:shadow-xl'
    })
  }
});
```

#### embroider

Style nested elements within a component:

```tsx
import { embroider } from '@dennerrondinely/tailor';

const cardStyles = embroider({
  'h2': 'text-xl font-bold mb-2',
  'p': 'text-gray-600',
  'button': 'mt-4 bg-blue-500 text-white px-4 py-2 rounded',
  'div > span': 'text-sm text-gray-500'
});

const Card = createElement('div')({
  root: 'bg-white rounded-lg shadow p-6',
  nested: cardStyles
});

// Usage
<Card>
  <h2>Card Title</h2>
  <p>Card content</p>
  <button>Action</button>
  <div>
    <span>Additional info</span>
  </div>
</Card>
```

#### spinThread

Add animations to your components:

```tsx
import { spinThread } from '@dennerrondinely/tailor';

// Loading spinner
const Spinner = createElement('div')({
  root: spinThread({
    type: 'spin',
    duration: '1000',
    iteration: 'infinite'
  })
});

// Pulsing button
const PulseButton = createElement('button')({
  root: twMerge(
    'px-4 py-2 bg-blue-500 text-white rounded',
    spinThread({
      type: 'pulse',
      duration: '500',
      iteration: 'infinite'
    })
  )
});

// Bouncing notification
const Notification = createElement('div')({
  root: spinThread({
    type: 'bounce',
    duration: '1000',
    iteration: 'infinite',
    direction: 'alternate'
  })
});
```

#### craft

A powerful utility that combines all features in a single, intuitive API:

```tsx
import { craft } from '@dennerrondinely/tailor';

const Button = craft('button')({
  // Base styles
  base: 'px-4 py-2 rounded font-medium',
  
  // Variants
  variants: {
    hover: {
      default: 'hover:bg-blue-600',
      outline: 'hover:bg-blue-50'
    },
    active: {
      default: 'active:bg-blue-700',
      outline: 'active:bg-blue-100'
    }
  },
  
  // Responsive styles
  responsive: {
    sm: {
      base: 'text-sm',
      hover: 'hover:bg-blue-500'
    },
    md: {
      base: 'text-base',
      hover: 'hover:bg-blue-600'
    }
  },
  
  // Nested styles
  nested: {
    'span': 'text-sm text-gray-500',
    'div > svg': 'w-4 h-4'
  },
  
  // Animation
  animation: {
    type: 'pulse',
    duration: '500',
    iteration: 'infinite'
  }
});
```

### Combining Helpers

Here's an example of how to combine multiple helpers for a complex component:

```tsx
import { craft, tailorFit, embroider, spinThread } from '@dennerrondinely/tailor';

// Reusable responsive styles
const textSizes = tailorFit({
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
});

// Reusable nested styles
const cardStyles = embroider({
  'h2': 'text-xl font-bold mb-2',
  'p': 'text-gray-600',
  'button': 'mt-4 bg-blue-500 text-white px-4 py-2 rounded'
});

// Complex card component using craft
const Card = craft('div')({
  base: 'bg-white rounded-lg shadow p-6',
  variants: {
    hover: {
      default: 'hover:shadow-lg',
      interactive: 'hover:shadow-xl hover:-translate-y-1'
    }
  },
  responsive: {
    sm: {
      base: 'p-4',
      hover: 'hover:shadow-md'
    },
    md: {
      base: 'p-6',
      hover: 'hover:shadow-lg'
    }
  },
  nested: cardStyles,
  animation: {
    type: 'pulse',
    duration: '1000',
    iteration: 'infinite'
  }
});
```

## 📖 API Reference

### Core Functions

#### createElement(tag)

Creates a styled React component with Tailwind.

- `tag`: HTML element tag (e.g., 'div', 'button', etc.)
- Returns a function that accepts a configuration object:
  - `root`: Base element classes
  - `hover`: Classes applied on hover
  - `active`: Classes applied on active
  - `focus`: Classes applied on focus
  - `disabled`: Classes applied when disabled
  - `nested`: Object with styles for nested elements
  - `responsive`: Object with responsive configurations

### Helper Functions

#### tailorFit(config)

Creates responsive styles configuration.

- `config`: Object with breakpoint keys and class values
- Returns a `ResponsiveConfig` object

#### embroider(styles)

Creates nested styles configuration.

- `styles`: Object with selectors and their classes
- Returns a `NestedStyles` object

#### spinThread(config)

Creates animation configuration.

- `config`: Object with animation properties:
  - `type`: 'spin' | 'ping' | 'pulse' | 'bounce' | 'none'
  - `duration`: Animation duration
  - `delay`: Animation delay
  - `iteration`: 'once' | 'infinite'
  - `direction`: 'normal' | 'reverse'
  - `timing`: Animation timing function

#### craft(tag)

Creates a component with a unified configuration API.

- `tag`: HTML element tag
- Returns a function that accepts a `CraftConfig` object:
  - `base`: Base styles
  - `variants`: Component variants
  - `responsive`: Responsive styles
  - `nested`: Nested styles
  - `animation`: Animation configuration

## 🎯 TypeScript Support

The library is fully typed and provides autocompletion for all available properties.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

<div align="center" style="margin: 60px 0; padding: 40px; background: linear-gradient(to right, #f3f4f6, #e5e7eb, #f3f4f6); border-radius: 16px;">
  <img src="images/icon.png" alt="Tailor" height="150" style="filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));"/>
  <br/>
  <p style="margin-top: 20px; font-size: 1.2em; color: #374151;">Crafted with ❤️ for React developers</p>
</div>

## 📄 License

MIT 