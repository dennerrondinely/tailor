# <img src="images/icon.png" alt="Tailor" height="40"/>

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dennerrondinely/tailor/ci.yml?branch=main)](https://github.com/dennerrondinely/tailor/actions)
[![npm version](https://img.shields.io/npm/v/tailor.svg)](https://www.npmjs.com/package/tailor)
[![npm downloads](https://img.shields.io/npm/dm/tailor.svg)](https://www.npmjs.com/package/tailor)
[![license](https://img.shields.io/github/license/dennerrondinely/tailor)](https://github.com/dennerrondinely/tailor/blob/main/LICENSE)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/@dennerrondinely/tailor@0.1.0)](https://bundlephobia.com/package/@dennerrondinely/tailor@0.1.0)

<div align="center">
  <img src="images/logo.png" alt="Tailor Logo" width="300" style="margin-bottom: 20px"/>
  <br/>
  <p><strong>A library for creating styled React components with Tailwind CSS in an organized and typed way, with support for nested styles, variants, and responsive design.</strong></p>
  
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/tailor/pulls)
</div>

## Features

- 🎨 Type-safe styling with TypeScript
- 🎯 Smart class merging
- 📱 Responsive design support
- 🎭 Dynamic class generation based on props
- 🎪 Nested styles
- 🎬 Animation support

## Installation

```bash
npm install @dennerrondinely/tailor
# or
yarn add @dennerrondinely/tailor
# or
pnpm add @dennerrondinely/tailor
```

## Quick Start

### Basic Component

```tsx
import { craft } from '@tailor/react';

interface ButtonProps {
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const StyledButton = craft(Button)({
  base: 'px-4 py-2 rounded font-medium transition-colors',
  dynamic: {
    'bg-blue-500 text-white': (props) => !props.isActive,
    'bg-green-500 text-white': (props) => props.isActive,
    'hover:opacity-90': (props) => !props.disabled,
    'active:scale-95': (props) => !props.disabled,
    'disabled:opacity-50 disabled:cursor-not-allowed': (props) => props.disabled
  },
  responsive: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
});

// Usage
<StyledButton isActive={true}>Click me</StyledButton>
```

### Using Dynamic Classes

Dynamic classes allow you to apply styles based on component props. This is particularly useful for managing component states and variants:

```tsx
interface DynamicButtonProps {
  isActive?: boolean;
  disabled?: boolean;
  isPressed?: boolean;
  children: React.ReactNode;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const StyledDynamicButton = craft(DynamicButton)({
  base: 'px-4 py-2 rounded font-medium transition-all',
  dynamic: {
    // Base styles based on active state
    'bg-blue-500 text-white': (props) => !props.isActive,
    'bg-green-500 text-white': (props) => props.isActive,
    
    // Interactive states
    'hover:opacity-90': (props) => !props.disabled,
    'active:scale-95': (props) => !props.disabled,
    
    // Disabled state
    'disabled:opacity-50 disabled:cursor-not-allowed': (props) => props.disabled,
    
    // Additional states
    'shadow-lg': (props) => props.isPressed
  }
});

// Usage examples
<StyledDynamicButton>Default</StyledDynamicButton>
<StyledDynamicButton isActive>Active</StyledDynamicButton>
<StyledDynamicButton disabled>Disabled</StyledDynamicButton>
<StyledDynamicButton isPressed>Pressed</StyledDynamicButton>
```

### Advanced Example with Multiple Conditions

Here's a more complex example showing how to combine multiple conditions and features:

```tsx
interface StatusCardProps {
  status: 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const StyledStatusCard = craft(StatusCard)({
  base: 'p-4 rounded-lg shadow transition-all',
  dynamic: {
    // Status-based styles
    'bg-green-100 text-green-800 border-green-200': (props) => props.status === 'success',
    'bg-red-100 text-red-800 border-red-200': (props) => props.status === 'error',
    'bg-yellow-100 text-yellow-800 border-yellow-200': (props) => props.status === 'warning',
    'bg-blue-100 text-blue-800 border-blue-200': (props) => props.status === 'info',
    
    // Size-based styles
    'p-2 text-sm': (props) => props.size === 'small',
    'p-6 text-lg': (props) => props.size === 'large',
    
    // State-based styles
    'opacity-50 cursor-not-allowed': (props) => props.disabled,
    'animate-pulse': (props) => props.loading
  },
  responsive: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  },
  nested: {
    '.status-icon': 'mr-2',
    '.status-title': 'font-bold mb-1',
    '.status-description': 'text-sm opacity-80'
  }
});

// Usage examples
<StyledStatusCard status="success" size="small">Success</StyledStatusCard>
<StyledStatusCard status="error" loading>Error</StyledStatusCard>
<StyledStatusCard status="warning" disabled>Warning</StyledStatusCard>
<StyledStatusCard status="info" size="large">Info</StyledStatusCard>
```

### Themed Components

You can also use dynamic classes to create themed components:

```tsx
interface ThemedButtonProps {
  theme: 'light' | 'dark';
  variant: 'default' | 'primary' | 'success' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const StyledThemedButton = craft(ThemedButton)({
  base: 'px-4 py-2 rounded font-medium transition-all',
  dynamic: {
    // Light theme variants
    'bg-gray-100 text-gray-900 border border-gray-300': (props) => 
      props.theme === 'light' && props.variant === 'default',
    'bg-blue-100 text-blue-900 border border-blue-300': (props) => 
      props.theme === 'light' && props.variant === 'primary',
    'bg-green-100 text-green-900 border border-green-300': (props) => 
      props.theme === 'light' && props.variant === 'success',
    'bg-red-100 text-red-900 border border-red-300': (props) => 
      props.theme === 'light' && props.variant === 'danger',
    
    // Dark theme variants
    'bg-gray-800 text-gray-100 border border-gray-700': (props) => 
      props.theme === 'dark' && props.variant === 'default',
    'bg-blue-800 text-blue-100 border border-blue-700': (props) => 
      props.theme === 'dark' && props.variant === 'primary',
    'bg-green-800 text-green-100 border border-green-700': (props) => 
      props.theme === 'dark' && props.variant === 'success',
    'bg-red-800 text-red-100 border border-red-700': (props) => 
      props.theme === 'dark' && props.variant === 'danger',
    
    // Interactive states
    'hover:opacity-90': (props) => !props.disabled && !props.loading,
    'active:scale-95': (props) => !props.disabled && !props.loading,
    'disabled:opacity-50 disabled:cursor-not-allowed': (props) => props.disabled,
    'animate-pulse': (props) => props.loading
  }
});

// Usage examples
<StyledThemedButton theme="light" variant="primary">Light Primary</StyledThemedButton>
<StyledThemedButton theme="dark" variant="success">Dark Success</StyledThemedButton>
<StyledThemedButton theme="light" variant="danger" disabled>Light Danger Disabled</StyledThemedButton>
<StyledThemedButton theme="dark" variant="default" loading>Dark Default Loading</StyledThemedButton>
```

## API Reference

### `craft(Component)`

Creates a styled version of a React component with Tailwind CSS classes.

#### Configuration

The `craft` function accepts a configuration object with the following properties:

- `base`: Base classes applied to the component
- `dynamic`: Object mapping class names to functions that receive props and return boolean values
- `responsive`: Object mapping breakpoint names to class names
- `nested`: Object mapping selectors to class names for nested elements
- `animation`: Object mapping animation names to class names

## Helper Functions

Tailor provides several helper functions to make styling components easier and more maintainable.

### `spinThread(config: TailwindAnimationConfig)`

Creates animation classes for your components. Perfect for loading states, transitions, and interactive elements.

```tsx
import { spinThread } from '@dennerrondinely/tailor';

// Basic usage
const spinAnimation = spinThread({ type: 'spin' });
// Result: 'animate-spin'

// Advanced usage with all options
const customAnimation = spinThread({
  type: 'pulse',
  duration: '1000',
  delay: '200',
  iteration: 'infinite',
  direction: 'reverse',
  timing: 'ease-in-out'
});
// Result: 'animate-pulse duration-1000 delay-200 infinite reverse ease-in-out'

// Usage in a component
const LoadingSpinner = craft('div')({
  base: spinThread({ type: 'spin', duration: '1000' }),
  // ... other styles
});
```

### `stitch(styles: NestedStyles)`

Creates nested styles for child elements within your components using Tailwind's nesting pattern. This allows you to style child elements using Tailwind's modifier syntax, group utilities, and arbitrary selectors.

```tsx
import { stitch } from '@dennerrondinely/tailor';

// Example of styling article content - a common use case
const Article = craft('article')({
  base: 'prose prose-lg max-w-3xl mx-auto',
  nested: stitch({
    // Basic typography styles
    'h1': 'font-bold text-3xl mb-4',
    'h2': 'font-semibold text-2xl mb-3',
    'h3': 'font-medium text-xl mb-2',
    'p': 'mb-4 text-gray-700',
    
    // Link styles within paragraphs
    'p > a': 'text-blue-500 hover:text-blue-600 underline',
    
    // List styles
    'ul': 'list-disc list-inside mb-4',
    'ol': 'list-decimal list-inside mb-4',
    'li': 'mb-1',
    
    // Code blocks
    'pre': 'bg-gray-100 p-4 rounded-lg mb-4',
    'code': 'font-mono text-sm',
    
    // Blockquotes
    'blockquote': 'border-l-4 border-gray-300 pl-4 italic my-4',
    
    // Images
    'img': 'rounded-lg my-4',
    'figcaption': 'text-sm text-gray-500 text-center mt-2',
    
    // Tables
    'table': 'w-full border-collapse mb-4',
    'th': 'border border-gray-300 bg-gray-100 p-2',
    'td': 'border border-gray-300 p-2',
    
    // Dark mode support
    'dark': {
      'p': 'text-gray-300',
      'blockquote': 'border-gray-600',
      'pre': 'bg-gray-800',
      'th': 'border-gray-600 bg-gray-700',
      'td': 'border-gray-600'
    }
  })
});

// Usage
<Article>
  <h1>Getting Started with Tailwind CSS</h1>
  <p>
    Tailwind CSS is a utility-first CSS framework that allows you to build custom designs
    without ever leaving your HTML. <a href="#">Learn more about Tailwind</a>.
  </p>
  <h2>Key Features</h2>
  <ul>
    <li>Utility-first approach</li>
    <li>Responsive design</li>
    <li>Customizable</li>
  </ul>
  <blockquote>
    "Tailwind CSS is the only framework that I've seen scale on large teams."
  </blockquote>
  <pre>
    <code>npm install tailwindcss</code>
  </pre>
</Article>

// Example with SVG icon component using arbitrary selectors
const IconButton = craft('button')({
  base: 'p-2 rounded-full transition-colors',
  nested: stitch({
    // Using arbitrary selectors to target SVG elements
    'svg': {
      base: 'w-6 h-6',
      // Target specific SVG elements using [&_selector]
      'hover:[&_path]:fill-white': true,
      'hover:[&_circle]:fill-black': true,
      'hover:[&_circle]:stroke-black': true,
      // You can also use group modifiers
      'group-hover:[&_path]:fill-blue-500': true,
      'group-focus:[&_rect]:stroke-2': true
    }
  })
});

// Example with a more complex component using various nesting patterns
const SocialButton = craft('button')({
  base: 'p-3 rounded-lg transition-all group',
  nested: stitch({
    // Base styles for the icon container
    '.icon-wrapper': 'relative inline-block',
    
    // SVG specific styles with arbitrary selectors
    'svg': {
      base: 'w-6 h-6',
      // Target multiple elements
      'hover:[&_path]:fill-white': true,
      'hover:[&_circle]:fill-black': true,
      'hover:[&_rect]:stroke-2': true,
      // Use with other modifiers
      'dark:[&_path]:fill-gray-200': true,
      'dark:hover:[&_path]:fill-white': true,
      // Complex selectors
      'hover:[&_.icon-path]:fill-blue-500': true,
      'hover:[&_.icon-circle]:stroke-blue-500': true
    },
    
    // Text styles with hover effects
    '.button-text': {
      base: 'ml-2 text-sm font-medium',
      'group-hover:text-white': true,
      'dark:text-gray-200': true
    },
    
    // Background effects
    '&': {
      base: 'bg-gray-100',
      'hover:bg-blue-500': true,
      'dark:bg-gray-800': true,
      'dark:hover:bg-blue-600': true
    }
  })
});

// Usage examples
<IconButton>
  <svg viewBox="0 0 24 24">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
</IconButton>

<SocialButton>
  <div className="icon-wrapper">
    <svg viewBox="0 0 24 24">
      <path className="icon-path" d="M12 2L2 7l10 5 10-5-10-5z"/>
      <circle className="icon-circle" cx="12" cy="12" r="3"/>
    </svg>
  </div>
  <span className="button-text">Follow</span>
</SocialButton>
```

The `stitch` helper supports all Tailwind CSS nesting features:

- Direct child selectors using `>`
- Group modifiers using `group-*`
- State variants (hover, focus, active, etc.)
- Responsive modifiers (sm, md, lg, xl, 2xl)
- Dark mode using `dark:`
- Custom modifiers
- Arbitrary selectors using `[&_selector]` syntax
- Multiple modifiers can be combined

This makes it easy to create complex component styles while maintaining Tailwind's utility-first approach and keeping your styles organized and maintainable. Common use cases include:

- Styling article/blog content
- Creating consistent typography systems
- Styling SVG elements
- Targeting specific elements within complex components
- Creating custom hover/focus states for nested elements
- Applying styles to elements based on parent state

### `tailorFit(config: ResponsiveConfig)`

Creates responsive styles that adapt to different screen sizes.

```tsx
import { tailorFit } from '@dennerrondinely/tailor';

// Create responsive styles
const responsiveStyles = tailorFit({
  sm: 'text-sm p-2',
  md: 'text-base p-4',
  lg: 'text-lg p-6',
  xl: 'text-xl p-8',
  '2xl': 'text-2xl p-10'
});

// Usage in a component
const ResponsiveContainer = craft('div')({
  base: 'bg-white rounded',
  responsive: responsiveStyles
});
```

### `embroider(config: EmbroiderConfig)`

Creates interactive state styles (hover, active, focus, disabled) for your components.

```tsx
import { embroider } from '@dennerrondinely/tailor';

// Create interactive styles
const interactiveStyles = embroider({
  base: 'px-4 py-2 rounded transition-colors',
  hover: 'hover:bg-blue-600',
  active: 'active:bg-blue-700',
  focus: 'focus:ring-2 focus:ring-blue-500 focus:outline-none',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed'
});

// Usage in a component
const InteractiveButton = craft('button')({
  ...interactiveStyles,
  base: 'bg-blue-500 text-white'
});
```

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