import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft } from '../../src';

// Custom button component
const CustomButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <button ref={ref} {...rest}>
        <span className="custom-icon">★</span>
        {children}
      </button>
    );
  }
);

// Styled version of the custom button
const StyledCustomButton = craft(CustomButton)({
  base: 'px-4 py-2 rounded font-medium transition-colors',
  dynamic: {
    'hover:opacity-90': (props) => !props.disabled,
    'active:scale-95': (props) => !props.disabled,
    'focus:outline-none focus:ring-2 focus:ring-offset-2': (props) => !props.disabled,
    'disabled:opacity-50 disabled:cursor-not-allowed': (props) => props.disabled
  },
  responsive: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  },
  nested: {
    '.custom-icon': 'mr-2 text-yellow-400'
  }
});

const meta = {
  title: 'Example/CustomButton',
  component: StyledCustomButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof StyledCustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Custom Button',
    className: 'bg-blue-500 text-white hover:bg-blue-600',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Custom Button',
    className: 'bg-gray-500 text-white hover:bg-gray-600',
  },
};

export const WithLongText: Story = {
  args: {
    children: 'Custom Button with a very long text that might wrap',
    className: 'bg-green-500 text-white hover:bg-green-600 max-w-xs',
  },
}; 