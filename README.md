# <img src="images/icon.png" alt="Tailor" height="40"/>

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dennerrondinely/tailor/ci.yml?branch=main)](https://github.com/dennerrondinely/tailor/actions)
[![npm version](https://img.shields.io/npm/v/tailor.svg)](https://www.npmjs.com/package/tailor)
[![npm downloads](https://img.shields.io/npm/dm/tailor.svg)](https://www.npmjs.com/package/tailor)
[![license](https://img.shields.io/github/license/dennerrondinely/tailor)](https://github.com/dennerrondinely/tailor/blob/main/LICENSE)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/tailor)](https://bundlephobia.com/package/tailor)

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
npm install @tailor/react
# or
yarn add @tailor/react
# or
pnpm add @tailor/react
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