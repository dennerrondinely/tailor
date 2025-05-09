import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createElement } from '../../src';

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

const meta = {
  title: 'Example/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: Array(6).fill(null).map((_, i) => (
      <div key={i} className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Item {i + 1}</h3>
        <p>This is a grid item that demonstrates responsive behavior.</p>
      </div>
    )),
  },
};

export const WithCards: Story = {
  args: {
    children: Array(4).fill(null).map((_, i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
        <h3 className="text-xl font-bold mb-2">Card {i + 1}</h3>
        <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Learn More
        </button>
      </div>
    )),
  },
};

export const WithDifferentSizes: Story = {
  args: {
    className: 'grid-cols-6 auto-rows-auto',
    children: (
      <>
        <div className="col-span-2 row-span-2 bg-blue-500 p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold mb-2">Featured Item</h3>
          <p>This item spans 2x2 in the grid.</p>
        </div>
        {Array(5).fill(null).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Regular Item</h3>
            <p>Standard 1x1 grid item.</p>
          </div>
        ))}
      </>
    ),
  },
}; 