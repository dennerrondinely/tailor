import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createStyledElement } from '../../src';

const Button = createStyledElement('button', {
  root: 'px-4 py-2 rounded font-medium transition-colors',
  hover: 'hover:opacity-90',
  active: 'active:scale-95',
  focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  responsive: {
    root: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  nested: {
    'button > span': 'ml-2',
  },
});

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    className: 'bg-blue-500 text-white hover:bg-blue-600',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    className: 'bg-gray-500 text-white hover:bg-gray-600',
  },
};

export const Success: Story = {
  args: {
    children: 'Button',
    className: 'bg-green-500 text-white hover:bg-green-600',
  },
};

export const Danger: Story = {
  args: {
    children: 'Button',
    className: 'bg-red-500 text-white hover:bg-red-600',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span>Button</span>
        <span>→</span>
      </>
    ),
    className: 'bg-blue-500 text-white hover:bg-blue-600',
  },
}; 