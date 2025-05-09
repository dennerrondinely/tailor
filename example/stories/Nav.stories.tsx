import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createElement } from '../../src';

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

const meta = {
  title: 'Example/Nav',
  component: Nav,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <div className="flex space-x-4">
        <NavItem href="#">Home</NavItem>
        <NavItem href="#">About</NavItem>
        <NavItem href="#">Contact</NavItem>
      </div>
    ),
  },
};

export const WithLogo: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">Logo</div>
        <div className="flex space-x-4">
          <NavItem href="#">Home</NavItem>
          <NavItem href="#">About</NavItem>
          <NavItem href="#">Contact</NavItem>
        </div>
      </div>
    ),
  },
};

export const WithDropdown: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <NavItem href="#">Home</NavItem>
          <NavItem href="#">Products</NavItem>
          <div className="relative group">
            <NavItem href="#" className="flex items-center">
              More <span className="ml-1">▼</span>
            </NavItem>
            <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg hidden group-hover:block">
              <NavItem href="#" className="block py-2">Submenu 1</NavItem>
              <NavItem href="#" className="block py-2">Submenu 2</NavItem>
              <NavItem href="#" className="block py-2">Submenu 3</NavItem>
            </div>
          </div>
        </div>
        <NavItem href="#" className="bg-blue-500 rounded px-4 py-2">Sign In</NavItem>
      </div>
    ),
  },
}; 