import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// ---------------------------------------------------------------------------
// Component definitions
// ---------------------------------------------------------------------------

const Card = craft('div')({
  base: 'bg-white rounded-xl shadow border border-gray-100 overflow-hidden transition-shadow',
  variants: {
    padding: {
      none: '',
      sm:   'p-4',
      md:   'p-6',
      lg:   'p-8',
    },
    hoverable: {
      true:  'hover:shadow-lg',
      false: '',
    },
  },
  defaultVariants: { padding: 'md', hoverable: 'false' },
});

const CardHeader = craft('div')({
  base: 'border-b border-gray-100 px-6 py-4',
});

const CardBody = craft('div')({
  base: 'px-6 py-4',
});

const CardFooter = craft('div')({
  base: 'border-t border-gray-100 px-6 py-4 bg-gray-50 flex items-center justify-end gap-2',
});

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const withGrayBg: Decorator = (Story) => (
  <div className="bg-gray-100 p-10 min-h-screen">
    <div className="max-w-sm mx-auto">
      <Story />
    </div>
  </div>
);

const meta = {
  title: 'Tailor/Card',
  component: Card,
  decorators: [withGrayBg],
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      description: 'Internal padding scale.',
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    hoverable: {
      description: 'Adds a hover shadow transition.',
      control: { type: 'select' },
      options: ['true', 'false'],
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Simple: Story = {
  args: {
    padding: 'md',
    children: (
      <>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Card Title</h2>
        <p className="text-sm text-gray-500">A clean card with default padding and no hover effect.</p>
      </>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: 'true',
    children: (
      <>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Hoverable Card</h2>
        <p className="text-sm text-gray-500">Hover over this card to see the shadow deepen.</p>
      </>
    ),
  },
};

export const WithSections: Story = {
  name: 'Composed (Header + Body + Footer)',
  render: () => (
    <Card padding="none">
      <CardHeader>
        <h2 className="text-base font-semibold text-gray-900">Account Settings</h2>
        <p className="text-xs text-gray-500 mt-0.5">Manage your profile and preferences</p>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-gray-600">
          Your account is active and in good standing. Last login was 2 hours ago.
        </p>
      </CardBody>
      <CardFooter>
        <button className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
        <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save changes
        </button>
      </CardFooter>
    </Card>
  ),
};

export const MediaCard: Story = {
  render: () => (
    <Card padding="none" hoverable="true">
      <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-600" />
      <CardBody>
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Design</span>
        <h2 className="text-base font-semibold text-gray-900 mt-1 mb-1">Building with Tailor</h2>
        <p className="text-sm text-gray-500">Learn how to compose styled components with zero runtime overhead.</p>
      </CardBody>
      <CardFooter>
        <span className="text-xs text-gray-400">5 min read</span>
        <button className="ml-auto text-sm text-blue-600 hover:underline">Read →</button>
      </CardFooter>
    </Card>
  ),
};

export const PaddingScale: Story = {
  name: 'Showcase — padding scale',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-10">
        <div className="flex flex-col gap-6 max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
  render: () => (
    <>
      {(['none', 'sm', 'md', 'lg'] as const).map(p => (
        <Card key={p} padding={p}>
          <span className="text-xs font-mono text-gray-400">padding="{p}"</span>
          <p className="text-sm text-gray-700 mt-1">Card content with padding scale <strong>{p}</strong>.</p>
        </Card>
      ))}
    </>
  ),
};
