import React from 'react';
import { createElement, createNested } from './index';

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

// Card with responsive styles
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

// Navigation with responsive styles
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

// Grid with responsive styles
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

// Article with nested and responsive styles
const articleNested = createNested({
  h1: 'font-bold mb-4',
  h2: 'font-semibold mb-3',
  p: 'mb-2',
  'p>a': 'text-blue-500 hover:text-blue-600',
});

const Article = createElement('article')({
  root: 'prose max-w-none',
  nested: articleNested,
  responsive: {
    root: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }
  }
});

// Example usage
export function Example() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav>
        <div className="flex space-x-4">
          <NavItem href="#">Home</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem href="#">Contact</NavItem>
        </div>
      </Nav>

      <main className="container mx-auto p-4">
        <Grid>
          <Card>
            <h2 className="text-xl font-bold mb-4">Card Title</h2>
            <p className="mb-4">This is a responsive card that adapts to different screen sizes.</p>
            <Button>Click me</Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Another Card</h2>
            <p className="mb-4">Cards in the grid will reflow based on screen size.</p>
            <Button disabled>Disabled Button</Button>
          </Card>

          <Article>
            <h1>Article Title</h1>
            <p>This is a paragraph with a <a href="#">link</a>.</p>
            <h2>Subtitle</h2>
            <p>Another paragraph with more content.</p>
          </Article>
        </Grid>
      </main>
    </div>
  );
} 