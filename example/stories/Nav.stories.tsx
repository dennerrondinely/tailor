import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// ---------------------------------------------------------------------------
// Component definitions
// ---------------------------------------------------------------------------

const Nav = craft('nav')({
  base: 'bg-gray-900 text-white px-4 py-3',
});

const NavBrand = craft('a')({
  base: 'text-white font-bold text-lg tracking-tight hover:text-gray-200 transition-colors',
});

const NavLink = craft('a')({
  base: 'text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded-md hover:bg-gray-800',
  variants: {
    active: {
      true: 'text-white bg-gray-800',
      false: '',
    },
  },
  defaultVariants: { active: 'false' },
});

const NavCta = craft('a')({
  base: 'text-sm font-medium px-4 py-1.5 rounded-md transition-colors',
  variants: {
    variant: {
      outline: 'border border-gray-600 text-gray-200 hover:border-white hover:text-white',
      filled:  'bg-blue-600 text-white hover:bg-blue-700',
    },
  },
  defaultVariants: { variant: 'filled' },
});

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Tailor/Nav',
  component: Nav,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Simple: Story = {
  render: () => (
    <Nav>
      <div className="flex items-center gap-1">
        <NavLink href="#" active="true">Home</NavLink>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">Contact</NavLink>
      </div>
    </Nav>
  ),
};

export const WithBrandAndCta: Story = {
  name: 'With brand + CTA',
  render: () => (
    <Nav>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <NavBrand href="#">⚡ Tailor</NavBrand>
          <div className="flex items-center gap-1">
            <NavLink href="#" active="true">Docs</NavLink>
            <NavLink href="#">Components</NavLink>
            <NavLink href="#">Examples</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NavCta href="#" variant="outline">Log in</NavCta>
          <NavCta href="#" variant="filled">Get started</NavCta>
        </div>
      </div>
    </Nav>
  ),
};

export const MobileMenu: Story = {
  name: 'Mobile-style (stacked)',
  render: () => (
    <div className="w-64 bg-gray-900 min-h-screen p-4 flex flex-col gap-1">
      <NavBrand href="#" className="mb-4 block">⚡ Tailor</NavBrand>
      <NavLink href="#" active="true">Home</NavLink>
      <NavLink href="#">Components</NavLink>
      <NavLink href="#">Docs</NavLink>
      <NavLink href="#">Blog</NavLink>
      <div className="mt-auto pt-4 border-t border-gray-800">
        <NavCta href="#" variant="filled" className="block text-center w-full">
          Get started
        </NavCta>
      </div>
    </div>
  ),
};
