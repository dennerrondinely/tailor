import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// ---------------------------------------------------------------------------
// Demonstrates `dynamic` — classes conditioned on runtime prop values
// ---------------------------------------------------------------------------

type StatusButtonProps = {
  isActive?: boolean;
  isLoading?: boolean;
};

const StatusButton = craft<StatusButtonProps>('button')({
  base: 'inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white text-sm transition-all',
  dynamic: {
    'bg-blue-600  hover:bg-blue-700':  (props) => !props.isActive && !props.isLoading,
    'bg-green-600 hover:bg-green-700': (props) => !!props.isActive && !props.isLoading,
    'bg-gray-400  cursor-wait':        (props) => !!props.isLoading,
    'opacity-80 scale-95':             (props) => !!props.isLoading,
  },
});

const meta = {
  title: 'Tailor/Dynamic',
  component: StatusButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      description: 'When true, switches the button to the success/active state.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    isLoading: {
      description: 'When true, shows a loading state (muted + scale transform).',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof StatusButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isActive: false, isLoading: false, children: 'Submit' },
};

export const Active: Story = {
  args: { isActive: true, isLoading: false, children: '✓ Saved' },
};

export const Loading: Story = {
  args: { isActive: false, isLoading: true, children: '⏳ Saving…' },
};

export const Showcase: Story = {
  name: 'Showcase — all states',
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <StatusButton isActive={false} isLoading={false}>Submit</StatusButton>
        <span className="text-xs text-gray-400 font-mono">default</span>
      </div>
      <div className="flex items-center gap-3">
        <StatusButton isActive={true} isLoading={false}>✓ Saved</StatusButton>
        <span className="text-xs text-gray-400 font-mono">isActive=true</span>
      </div>
      <div className="flex items-center gap-3">
        <StatusButton isActive={false} isLoading={true}>⏳ Saving…</StatusButton>
        <span className="text-xs text-gray-400 font-mono">isLoading=true</span>
      </div>
    </div>
  ),
};
