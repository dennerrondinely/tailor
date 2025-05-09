import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createElement } from '../../src';

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

const meta = {
  title: 'Example/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <h2 className="text-xl font-bold mb-4">Card Title</h2>
        <p className="mb-4">This is a responsive card that adapts to different screen sizes.</p>
      </>
    ),
  },
};

export const WithButton: Story = {
  args: {
    children: (
      <>
        <h2 className="text-xl font-bold mb-4">Card with Button</h2>
        <p className="mb-4">This card includes a button component.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Click me
        </button>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <>
        <h2 className="text-xl font-bold mb-4">Long Content</h2>
        <p className="mb-4">This card has a longer content to demonstrate how it handles larger amounts of text.</p>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </>
    ),
  },
}; 