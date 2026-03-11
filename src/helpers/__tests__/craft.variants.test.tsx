import React from 'react';
import { render, screen } from '@testing-library/react';
import { craft } from '../craft';

// ---------------------------------------------------------------------------
// Component under test
// ---------------------------------------------------------------------------

const Button = craft('button')({
  base: 'rounded font-medium transition-colors',
  variants: {
    intent: {
      primary:   'bg-blue-500 text-white',
      secondary: 'bg-gray-100 text-gray-900',
      danger:    'bg-red-500 text-white',
    },
    size: {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
  compoundVariants: [
    { intent: 'primary', size: 'lg', className: 'shadow-lg' },
  ],
});

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------

function renderButton(props: React.ComponentProps<typeof Button> = {}) {
  return render(<Button {...props}>click</Button>);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('craft – semantic variants (integration)', () => {
  it('applies base classes', () => {
    renderButton();
    expect(screen.getByText('click')).toHaveClass('rounded', 'font-medium');
  });

  it('applies defaultVariant classes when no variant props are passed', () => {
    renderButton();
    const el = screen.getByText('click');
    expect(el).toHaveClass('bg-blue-500', 'text-white');   // intent=primary
    expect(el).toHaveClass('text-base', 'px-4', 'py-2');   // size=md
  });

  it('applies the correct classes for an explicit variant prop', () => {
    renderButton({ intent: 'secondary' });
    const el = screen.getByText('click');
    expect(el).toHaveClass('bg-gray-100', 'text-gray-900');
    expect(el).not.toHaveClass('bg-blue-500');
  });

  it('applies the correct classes for danger intent', () => {
    renderButton({ intent: 'danger' });
    expect(screen.getByText('click')).toHaveClass('bg-red-500');
  });

  it('applies the correct size classes', () => {
    renderButton({ size: 'lg' });
    expect(screen.getByText('click')).toHaveClass('text-lg', 'px-6', 'py-3');
  });

  it('applies compound variant classes when conditions match', () => {
    renderButton({ intent: 'primary', size: 'lg' });
    expect(screen.getByText('click')).toHaveClass('shadow-lg');
  });

  it('does NOT apply compound classes when conditions do not match', () => {
    renderButton({ intent: 'secondary', size: 'lg' });
    expect(screen.getByText('click')).not.toHaveClass('shadow-lg');
  });

  it('allows className override via prop (twMerge wins)', () => {
    renderButton({ className: 'bg-purple-500' });
    const el = screen.getByText('click');
    // className override should win over the default variant bg-blue-500
    expect(el).toHaveClass('bg-purple-500');
    expect(el).not.toHaveClass('bg-blue-500');
  });

  it('works with a component that has no variants', () => {
    const Box = craft('div')({ base: 'p-4' });
    render(<Box>box</Box>);
    expect(screen.getByText('box')).toHaveClass('p-4');
  });
});
