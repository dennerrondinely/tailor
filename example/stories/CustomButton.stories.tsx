import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// ---------------------------------------------------------------------------
// Demonstrates wrapping a custom forwardRef component with craft()
// ---------------------------------------------------------------------------

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
};

/**
 * A custom base component that renders an optional icon slot.
 * craft() wraps it and applies all Tailor styling capabilities.
 */
const IconButtonBase = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, icon = '★', ...rest }, ref) => (
    <button ref={ref} {...rest}>
      <span data-slot="icon">{icon}</span>
      {children}
    </button>
  ),
);
IconButtonBase.displayName = 'IconButtonBase';

const IconButton = craft(IconButtonBase)({
  base: 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
  nested: {
    '[data-slot=icon]': 'text-yellow-400 text-base',
  },
  dynamic: {
    'hover:opacity-90 active:scale-95':    (props) => !props.disabled,
    'opacity-50 cursor-not-allowed':       (props) => !!props.disabled,
  },
  variants: {
    variant: {
      blue:   'bg-blue-600   text-white focus:ring-blue-500',
      green:  'bg-green-600  text-white focus:ring-green-500',
      gray:   'bg-gray-700   text-white focus:ring-gray-500',
      ghost:  'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400',
    },
  },
  defaultVariants: { variant: 'blue' },
});

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Tailor/Custom Component',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color variant.',
      control: { type: 'select' },
      options: ['blue', 'green', 'gray', 'ghost'],
    },
    icon: {
      description: 'Icon character rendered in the icon slot.',
      control: 'text',
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { variant: 'blue', icon: '★', children: 'Star Action' },
};

export const Green: Story = {
  args: { variant: 'green', icon: '✓', children: 'Confirm' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', icon: '⚙', children: 'Settings' },
};

export const Disabled: Story = {
  args: { variant: 'blue', icon: '✕', children: 'Disabled', disabled: true },
};

export const CustomIcon: Story = {
  args: { variant: 'gray', icon: '🚀', children: 'Deploy' },
};

export const AllVariants: Story = {
  name: 'Showcase — all variants',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <IconButton variant="blue"  icon="★">Blue</IconButton>
      <IconButton variant="green" icon="✓">Green</IconButton>
      <IconButton variant="gray"  icon="⚙">Gray</IconButton>
      <IconButton variant="ghost" icon="↗">Ghost</IconButton>
      <IconButton variant="blue"  icon="✕" disabled>Disabled</IconButton>
    </div>
  ),
};
