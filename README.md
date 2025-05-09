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
- **React Integration**: Seamless integration with React components and props

## 📦 Installation

```bash
npm install tailor
# or
yarn add tailor
# or
pnpm add tailor
```

## 🚀 Quick Start

### Creating Basic Components

```tsx
import { createElement } from 'tailor';

const Button = createElement('button')({
  root: 'px-4 py-2 rounded-md font-medium',
  hover: 'bg-blue-600',
  active: 'bg-blue-700',
  focus: 'ring-2 ring-offset-2',
  disabled: 'opacity-50 cursor-not-allowed',
});

// Usage
function App() {
  return (
    <Button onClick={() => alert('Clicked!')}>
      Click me
    </Button>
  );
}
```

## 📚 Documentation

### Responsive Design

```tsx
const Card = createElement('div')({
  root: 'p-4 bg-white rounded-lg shadow',
  responsive: {
    root: {
      sm: 'p-2', // Small screens
      md: 'p-4', // Medium screens
      lg: 'p-6', // Large screens
      xl: 'p-8', // Extra large screens
    },
    hover: {
      sm: 'shadow-md',
      md: 'shadow-lg',
      lg: 'shadow-xl',
    }
  }
});
```

### Nested Styles

```tsx
import { createElement, createNested } from 'tailor';

const articleNested = createNested({
  h1: 'text-4xl mb-8',
  h2: 'text-3xl mb-6',
  p: 'text-lg mb-4',
  'p>a': 'text-blue-500 hover:text-blue-600',
  ul: 'list-disc pl-6 mb-4',
  'li>p': 'mb-2',
});

const Article = createElement('article')({
  root: 'prose max-w-none',
  nested: articleNested,
});
```

### Component Variants

```tsx
const buttonBase = {
  root: 'px-4 py-2 rounded-md font-medium transition-colors',
  focus: 'ring-2 ring-offset-2',
};

const PrimaryButton = createElement('button')({
  ...buttonBase,
  root: `${buttonBase.root} bg-blue-500 text-white`,
  hover: 'bg-blue-600',
  active: 'bg-blue-700',
  disabled: 'bg-blue-300 cursor-not-allowed',
});
```

## 📖 API Reference

### createElement(tag)

Creates a styled React component with Tailwind.

- `tag`: HTML element tag (e.g., 'div', 'button', etc.)
- Returns a function that accepts a configuration object:
  - `root`: Base element classes
  - `hover`: Classes applied on hover
  - `active`: Classes applied on active
  - `focus`: Classes applied on focus
  - `disabled`: Classes applied when disabled
  - `nested`: Object with styles for nested elements
  - `responsive`: Object with responsive configurations:
    - `root`: Responsive classes for base element
    - `hover`: Responsive classes for hover state
    - `active`: Responsive classes for active state
    - `focus`: Responsive classes for focus state
    - `disabled`: Responsive classes for disabled state
    - Each state can have breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

### createNested(styles)

Creates a nested styles object.

- `styles`: Object with selectors and their classes
  - Keys can be HTML tags or combined selectors (e.g., 'p>a', 'li>p')
  - Values are strings with Tailwind classes

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