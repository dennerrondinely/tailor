import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// Definir as props do componente
type DynamicButtonProps = {
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
};

// Usar a tipagem genérica com as props definidas
const DynamicButton = craft<DynamicButtonProps>('button')({
  base: 'px-4 py-2 rounded font-medium text-white transition-colors bg-blue-500',
  dynamic: {
    'bg-green-500': (props) => !!props.isActive,
    'bg-blue-500': (props) => !props.isActive,
  },
});

const meta = {
  title: 'Example/DynamicButton',
  component: DynamicButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof DynamicButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    isActive: true,
    children: 'Ativo (verde)',
  },
};

export const Inactive: Story = {
  args: {
    isActive: false,
    variant: 'inactive',
    children: 'Inativo (azul)',
  },
}; 