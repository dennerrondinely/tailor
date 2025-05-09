# Tailor

A library for creating styled React components with Tailwind CSS in an organized and typed way, with support for nested styles, variants, and responsive design.

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

// Usage
function ResponsiveCard() {
  return (
    <Card>
      <h2>Responsive Card</h2>
      <p>This card adapts to different screen sizes</p>
    </Card>
  );
}
```

### Complete Example: Responsive Dashboard

```tsx
import { createElement, createNested } from 'tailor';

// Navigation component with responsive styles
const Nav = createElement('nav')({
  root: 'bg-gray-800 text-white',
  responsive: {
    root: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    }
  }
});

const NavItem = createElement('a')({
  root: 'text-gray-300 hover:text-white',
  hover: 'text-white',
  responsive: {
    root: {
      sm: 'text-sm px-2',
      md: 'text-base px-4',
      lg: 'text-lg px-6',
    }
  }
});

// Grid layout with responsive columns
const Grid = createElement('div')({
  root: 'grid gap-4',
  responsive: {
    root: {
      sm: 'grid-cols-1',
      md: 'grid-cols-2',
      lg: 'grid-cols-3',
      xl: 'grid-cols-4',
    }
  }
});

// Card component with responsive styles
const Card = createElement('div')({
  root: 'bg-white rounded-lg shadow',
  responsive: {
    root: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    hover: {
      sm: 'shadow-md',
      md: 'shadow-lg',
      lg: 'shadow-xl',
    }
  }
});

// Button with responsive styles
const Button = createElement('button')({
  root: 'px-4 py-2 rounded-md font-medium transition-colors',
  hover: 'bg-blue-600',
  active: 'bg-blue-700',
  focus: 'ring-2 ring-offset-2',
  disabled: 'opacity-50 cursor-not-allowed',
  responsive: {
    root: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    hover: {
      sm: 'bg-blue-500',
      md: 'bg-blue-600',
      lg: 'bg-blue-700',
    }
  }
});

// Dashboard component
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav>
        <div className="flex space-x-4">
          <NavItem href="#">Dashboard</NavItem>
          <NavItem href="#">Analytics</NavItem>
          <NavItem href="#">Settings</NavItem>
        </div>
      </Nav>

      <main className="container mx-auto p-4">
        <Grid>
          {/* Stats Card */}
          <Card>
            <h2 className="text-xl font-bold mb-4">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
            <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
            <Button className="mt-4">View Details</Button>
          </Card>

          {/* Activity Card */}
          <Card>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-2">
              <p className="text-sm">User John Doe logged in</p>
              <p className="text-sm">New order #1234 created</p>
              <p className="text-sm">Payment received from Jane Smith</p>
            </div>
            <Button className="mt-4">View All</Button>
          </Card>

          {/* Chart Card */}
          <Card>
            <h2 className="text-xl font-bold mb-4">Revenue Chart</h2>
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
              Chart Placeholder
            </div>
            <Button className="mt-4">Download Report</Button>
          </Card>

          {/* Settings Card */}
          <Card>
            <h2 className="text-xl font-bold mb-4">Quick Settings</h2>
            <div className="space-y-2">
              <Button>Edit Profile</Button>
              <Button>Change Password</Button>
              <Button disabled>Delete Account</Button>
            </div>
          </Card>
        </Grid>
      </main>
    </div>
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

## Features

- **Type Safety**: Full TypeScript support with proper type definitions
- **Nested Styles**: Support for styling nested elements with complex selectors
- **Component Variants**: Easy creation of component variants with shared base styles
- **Responsive Design**: Built-in support for responsive styles with Tailwind breakpoints
- **Smart Class Merging**: Uses `tailwind-merge` for intelligent class conflict resolution
- **State Support**: Built-in support for hover, active, focus, and disabled states
- **React Integration**: Seamless integration with React components and props

## TypeScript

The library is fully typed and provides autocompletion for all available properties.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 