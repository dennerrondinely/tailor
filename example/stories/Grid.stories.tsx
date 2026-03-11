import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// ---------------------------------------------------------------------------
// Component definitions — showcases `tailorFit` responsive classes
// ---------------------------------------------------------------------------

const Grid = craft('div')({
  base: 'grid gap-4',
  variants: {
    cols: {
      auto: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      2:    'grid-cols-2',
      3:    'grid-cols-3',
      4:    'grid-cols-4',
    },
    gap: {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: { cols: 'auto', gap: 'md' },
});

const GridItem = craft('div')({
  base: 'bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden',
});

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Tailor/Grid',
  component: Grid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      description: 'Column layout. `auto` is responsive (1→2→3→4 across breakpoints).',
      control: { type: 'select' },
      options: ['auto', '2', '3', '4'],
    },
    gap: {
      description: 'Gap between grid cells.',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

const COLORS = [
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-pink-500',
  'from-green-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-cyan-400 to-blue-500',
  'from-yellow-400 to-orange-500',
];

export const Responsive: Story = {
  name: 'Responsive (auto)',
  args: { cols: 'auto', gap: 'md' },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <GridItem key={i}>
          <div className={`h-24 bg-gradient-to-br ${COLORS[i]}`} />
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1">Item {i + 1}</h3>
            <p className="text-sm text-gray-500">Reflows 1→2→3→4 cols across breakpoints.</p>
          </div>
        </GridItem>
      ))}
    </Grid>
  ),
};

export const TwoColumns: Story = {
  name: 'Fixed 2 columns',
  args: { cols: '2', gap: 'md' },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 4 }, (_, i) => (
        <GridItem key={i}>
          <div className={`h-20 bg-gradient-to-br ${COLORS[i]}`} />
          <div className="p-3">
            <h3 className="font-medium text-gray-800">Card {i + 1}</h3>
          </div>
        </GridItem>
      ))}
    </Grid>
  ),
};

export const GapScale: Story = {
  name: 'Showcase — gap scale',
  render: () => (
    <div className="flex flex-col gap-10">
      {(['sm', 'md', 'lg', 'xl'] as const).map(gap => (
        <div key={gap}>
          <p className="text-xs font-mono text-gray-400 mb-2">gap="{gap}"</p>
          <Grid cols="3" gap={gap}>
            {Array.from({ length: 3 }, (_, i) => (
              <GridItem key={i}>
                <div className={`h-16 bg-gradient-to-br ${COLORS[i]}`} />
              </GridItem>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
