import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// ---------------------------------------------------------------------------
// Component definition — variants fully typed
// ---------------------------------------------------------------------------

const Button = craft('button')({
  base: 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  variants: {
    intent: {
      primary:   'bg-blue-500   text-white hover:bg-blue-600   focus:ring-blue-500',
      secondary: 'bg-gray-100   text-gray-900 hover:bg-gray-200 focus:ring-gray-400 border border-gray-300',
      danger:    'bg-red-500    text-white hover:bg-red-600    focus:ring-red-500',
      ghost:     'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    },
    size: {
      sm: 'text-sm  px-3 py-1.5 gap-1.5',
      md: 'text-base px-4 py-2   gap-2',
      lg: 'text-lg  px-6 py-3   gap-2.5',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
  compoundVariants: [
    // Primary + large gets a stronger shadow
    { intent: 'primary', size: 'lg', className: 'shadow-lg' },
    // Danger + large is even more prominent
    { intent: 'danger',  size: 'lg', className: 'shadow-lg font-bold' },
  ],
});

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Tailor/Variants',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories — one per variant combination
// ---------------------------------------------------------------------------

export const Primary: Story = {
  args: { intent: 'primary', size: 'md', children: 'Primary' },
};

export const Secondary: Story = {
  args: { intent: 'secondary', size: 'md', children: 'Secondary' },
};

export const Danger: Story = {
  args: { intent: 'danger', size: 'md', children: 'Danger' },
};

export const Ghost: Story = {
  args: { intent: 'ghost', size: 'md', children: 'Ghost' },
};

export const Small: Story = {
  args: { intent: 'primary', size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { intent: 'primary', size: 'lg', children: 'Large (compound → shadow-lg)' },
};

export const DangerLarge: Story = {
  args: { intent: 'danger', size: 'lg', children: 'Danger Large (compound → shadow-lg + font-bold)' },
};

export const DefaultsOnly: Story = {
  args: { children: 'No variant props → defaults apply' },
};

export const ClassNameOverride: Story = {
  args: {
    intent: 'primary',
    size: 'md',
    className: 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-500',
    children: 'className override wins',
  },
};

// ---------------------------------------------------------------------------
// All variants at once
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {(['primary', 'secondary', 'danger', 'ghost'] as const).map(intent => (
        <div key={intent} className="flex items-center gap-4">
          {(['sm', 'md', 'lg'] as const).map(size => (
            <Button key={size} intent={intent} size={size}>
              {intent} / {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
