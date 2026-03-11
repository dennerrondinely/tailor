import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { craft } from '../../src/helpers/craft';

// ---------------------------------------------------------------------------
// A simple styled button – the *default* element is <button>
// ---------------------------------------------------------------------------
const Button = craft('button')({
  base: 'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    intent: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    },
  },
  defaultVariants: { intent: 'primary' },
});

const meta = {
  title: 'Polymorphic/Button as …',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    as: {
      description: 'Override the rendered HTML element or React component.',
      control: { type: 'text' },
    },
    intent: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ------------------------------------------------------------------
// 1. Default — renders as <button>
// ------------------------------------------------------------------
export const AsButton: Story = {
  name: 'Default (button)',
  args: { children: 'Click me', intent: 'primary' },
};

// ------------------------------------------------------------------
// 2. Override to <a> — gains href, rel, target …
// ------------------------------------------------------------------
export const AsAnchor: Story = {
  name: 'As <a> anchor',
  render: (args) => (
    <Button {...args} as="a" href="https://github.com" target="_blank" rel="noopener noreferrer">
      Open GitHub ↗
    </Button>
  ),
  args: { intent: 'secondary' },
};

// ------------------------------------------------------------------
// 3. Override to <span>
// ------------------------------------------------------------------
export const AsSpan: Story = {
  name: 'As <span>',
  render: (args) => (
    <Button {...args} as="span" role="button" tabIndex={0}>
      I am a span
    </Button>
  ),
  args: { intent: 'danger' },
};

// ------------------------------------------------------------------
// 4. Override to a custom React component
// ------------------------------------------------------------------
const RouterLink: React.FC<{
  children?: React.ReactNode;
  to?: string;
  className?: string;
}> = ({ children, to, className }) => (
  /* Simulating a router link without a real router */
  <a href={to} className={className} data-router-link="true">
    {children}
  </a>
);
RouterLink.displayName = 'RouterLink';

export const AsCustomComponent: Story = {
  name: 'As custom RouterLink',
  render: (args) => (
    <Button {...args} as={RouterLink} to="/dashboard">
      Go to Dashboard
    </Button>
  ),
  args: { intent: 'primary' },
};

// ------------------------------------------------------------------
// 5. Side-by-side showcase
// ------------------------------------------------------------------
export const Showcase: Story = {
  name: 'Side-by-side showcase',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
      <Button intent="primary">button (default)</Button>
      <Button as="a" href="#" intent="secondary">
        a (anchor)
      </Button>
      <Button as="span" role="button" tabIndex={0} intent="danger">
        span
      </Button>
      <Button as={RouterLink} to="/x" intent="primary">
        RouterLink
      </Button>
    </div>
  ),
};
