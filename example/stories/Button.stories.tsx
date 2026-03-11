import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// ---------------------------------------------------------------------------
// Component definition
// ---------------------------------------------------------------------------

const Button = craft('button')({
  base: 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  variants: {
    intent: {
      primary:   'bg-blue-600   text-white      hover:bg-blue-700   focus:ring-blue-500',
      secondary: 'bg-gray-100   text-gray-900   hover:bg-gray-200   focus:ring-gray-400 border border-gray-300',
      success:   'bg-green-600  text-white      hover:bg-green-700  focus:ring-green-500',
      danger:    'bg-red-600    text-white      hover:bg-red-700    focus:ring-red-500',
      ghost:     'bg-transparent text-gray-700  hover:bg-gray-100   focus:ring-gray-400',
    },
    size: {
      xs: 'text-xs  px-2.5 py-1   gap-1',
      sm: 'text-sm  px-3   py-1.5 gap-1.5',
      md: 'text-sm  px-4   py-2   gap-2',
      lg: 'text-base px-5  py-2.5 gap-2',
      xl: 'text-base px-6  py-3   gap-2.5',
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
  compoundVariants: [
    { intent: 'primary', size: 'xl', className: 'shadow-md' },
    { intent: 'danger',  size: 'xl', className: 'shadow-md font-semibold' },
  ],
});

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Tailor/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      description: 'Visual style / semantic intent of the button.',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'ghost'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description: 'Padding and font-size scale.',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      description: 'Native disabled attribute — reduces opacity and blocks pointer events.',
      control: 'boolean',
    },
    className: {
      description: 'Additional Tailwind classes merged on top of the generated ones.',
      control: 'text',
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Intent stories
// ---------------------------------------------------------------------------

export const Primary: Story = {
  args: { intent: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { intent: 'secondary', children: 'Secondary' },
};

export const Success: Story = {
  args: { intent: 'success', children: 'Success' },
};

export const Danger: Story = {
  args: { intent: 'danger', children: 'Danger' },
};

export const Ghost: Story = {
  args: { intent: 'ghost', children: 'Ghost' },
};

// ---------------------------------------------------------------------------
// Size stories
// ---------------------------------------------------------------------------

export const ExtraSmall: Story = {
  name: 'Size / xs',
  args: { size: 'xs', children: 'Extra Small' },
};

export const Small: Story = {
  name: 'Size / sm',
  args: { size: 'sm', children: 'Small' },
};

export const Large: Story = {
  name: 'Size / lg',
  args: { size: 'lg', children: 'Large' },
};

export const ExtraLarge: Story = {
  name: 'Size / xl (compound → shadow-md)',
  args: { size: 'xl', children: 'Extra Large' },
};

// ---------------------------------------------------------------------------
// State stories
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: { intent: 'primary', children: 'Disabled', disabled: true },
};

export const WithIcon: Story = {
  args: {
    intent: 'primary',
    children: (
      <>
        <span aria-hidden="true">✉</span>
        Send email
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    intent: 'ghost',
    size: 'sm',
    'aria-label': 'Settings',
    children: '⚙',
  },
};

// ---------------------------------------------------------------------------
// className override story
// ---------------------------------------------------------------------------

export const ClassNameOverride: Story = {
  name: 'className override (purple)',
  args: {
    intent: 'primary',
    className: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
    children: 'className wins via twMerge',
  },
};

// ---------------------------------------------------------------------------
// Showcase — all intents × sizes
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  name: 'Showcase — all intents × sizes',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-6">
      {(['primary', 'secondary', 'success', 'danger', 'ghost'] as const).map(intent => (
        <div key={intent} className="flex flex-wrap items-center gap-3">
          <span className="w-24 text-xs text-gray-500 uppercase tracking-wide">{intent}</span>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
            <Button key={size} intent={intent} size={size}>
              {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
