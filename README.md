# Tailor

A library for creating styled React components with Tailwind CSS in an organized and typed way, with support for nested styles and variants.

## Installation

```bash
npm install tailor
# or
yarn add tailor
# or
pnpm add tailor
```

## Usage

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

### Nested Styles

```tsx
import { createElement, createNested } from 'tailor';

// Define styles for nested elements
const articleNested = createNested({
  h1: 'text-4xl mb-8',
  h2: 'text-3xl mb-6',
  p: 'text-lg mb-4',
  'p>a': 'text-blue-500 hover:text-blue-600',
  ul: 'list-disc pl-6 mb-4',
  'li>p': 'mb-2',
});

// Create component with nested styles
const Article = createElement('article')({
  root: 'prose max-w-none',
  nested: articleNested,
});

// Usage
function BlogPost() {
  return (
    <Article>
      <h1>Title</h1>
      <p>Text with <a href="#">link</a></p>
      <ul>
        <li>
          <p>Item with paragraph</p>
        </li>
      </ul>
    </Article>
  );
}
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

const SecondaryButton = createElement('button')({
  ...buttonBase,
  root: `${buttonBase.root} bg-gray-200 text-gray-800`,
  hover: 'bg-gray-300',
  active: 'bg-gray-400',
  disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
});
```

## API

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

### createNested(styles)

Creates a nested styles object.

- `styles`: Object with selectors and their classes
  - Keys can be HTML tags or combined selectors (e.g., 'p>a', 'li>p')
  - Values are strings with Tailwind classes

## Features

- **Type Safety**: Full TypeScript support with proper type definitions
- **Nested Styles**: Support for styling nested elements with complex selectors
- **Component Variants**: Easy creation of component variants with shared base styles
- **Smart Class Merging**: Uses `tailwind-merge` for intelligent class conflict resolution
- **State Support**: Built-in support for hover, active, focus, and disabled states
- **React Integration**: Seamless integration with React components and props

## TypeScript

The library is fully typed and provides autocompletion for all available properties.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 