import React from 'react';
import { render, screen } from '@testing-library/react';
import { craft } from '../craft';

// ---------------------------------------------------------------------------
// Polymorphic `as` prop
// ---------------------------------------------------------------------------

describe('craft – as prop (polymorphism)', () => {
  // ------------------------------------------------------------------
  // 1. Default rendering (no `as` provided)
  // ------------------------------------------------------------------
  it('renders the default element when `as` is not provided', () => {
    const Box = craft('div')({ base: 'box' });
    render(<Box data-testid="el">content</Box>);
    const el = screen.getByTestId('el');
    expect(el.tagName.toLowerCase()).toBe('div');
  });

  // ------------------------------------------------------------------
  // 2. Override with a different HTML tag
  // ------------------------------------------------------------------
  it('renders as the provided HTML tag', () => {
    const Button = craft('button')({ base: 'btn' });
    render(
      <Button as="a" data-testid="el">
        link
      </Button>,
    );
    const el = screen.getByTestId('el');
    expect(el.tagName.toLowerCase()).toBe('a');
  });

  // ------------------------------------------------------------------
  // 3. Keeps base classes when using `as`
  // ------------------------------------------------------------------
  it('preserves base classes when `as` overrides the element', () => {
    const Button = craft('button')({ base: 'rounded font-bold' });
    render(
      <Button as="a" href="/go" data-testid="el">
        go
      </Button>,
    );
    const el = screen.getByTestId('el');
    expect(el).toHaveClass('rounded');
    expect(el).toHaveClass('font-bold');
  });

  // ------------------------------------------------------------------
  // 4. Native props of the target element are forwarded
  // ------------------------------------------------------------------
  it('forwards native props of the target element (href for <a>)', () => {
    const Button = craft('button')({ base: 'btn' });
    render(
      <Button as="a" href="https://example.com" data-testid="el">
        anchor
      </Button>,
    );
    const el = screen.getByTestId('el') as HTMLAnchorElement;
    expect(el.getAttribute('href')).toBe('https://example.com');
  });

  // ------------------------------------------------------------------
  // 5. className merging still works with `as`
  // ------------------------------------------------------------------
  it('merges className with base classes when `as` is provided', () => {
    const Button = craft('button')({ base: 'bg-blue-500' });
    render(
      <Button as="span" className="text-white" data-testid="el">
        span
      </Button>,
    );
    const el = screen.getByTestId('el');
    expect(el).toHaveClass('bg-blue-500');
    expect(el).toHaveClass('text-white');
  });

  // ------------------------------------------------------------------
  // 6. Override with a React component
  // ------------------------------------------------------------------
  it('renders as a custom React component', () => {
    const CustomLink: React.FC<{ children?: React.ReactNode; href?: string; className?: string }> = ({
      children,
      href,
      className,
    }) => (
      <a data-custom href={href} className={className}>
        {children}
      </a>
    );

    const Button = craft('button')({ base: 'btn' });
    render(
      <Button as={CustomLink} href="/custom" data-testid="el">
        custom
      </Button>,
    );
    // rendered inner <a> carries the data-custom attribute
    const el = document.querySelector('[data-custom]');
    expect(el).not.toBeNull();
    expect(el?.getAttribute('href')).toBe('/custom');
  });

  // ------------------------------------------------------------------
  // 7. Variants still apply when using `as`
  // ------------------------------------------------------------------
  it('applies variant classes alongside `as` override', () => {
    const Button = craft('button')({
      base: 'rounded',
      variants: {
        intent: {
          primary: 'bg-blue-500',
          danger: 'bg-red-500',
        },
      },
      defaultVariants: { intent: 'primary' },
    });
    render(
      <Button as="a" href="/" data-testid="el">
        variant link
      </Button>,
    );
    const el = screen.getByTestId('el');
    expect(el.tagName.toLowerCase()).toBe('a');
    expect(el).toHaveClass('bg-blue-500');
  });

  // ------------------------------------------------------------------
  // 8. `as` prop is not forwarded as a DOM attribute
  // ------------------------------------------------------------------
  it('does not forward `as` as a DOM attribute', () => {
    const Button = craft('button')({ base: 'btn' });
    render(
      <Button as="a" data-testid="el">
        clean
      </Button>,
    );
    const el = screen.getByTestId('el');
    expect(el.getAttribute('as')).toBeNull();
  });

  // ------------------------------------------------------------------
  // 9. Ref forwarding works with `as`
  // ------------------------------------------------------------------
  it('forwards ref to the rendered element when `as` is used', () => {
    const Box = craft('div')({ base: 'box' });
    const ref = React.createRef<HTMLSpanElement>();

    render(
      <Box as="span" ref={ref} data-testid="el">
        ref test
      </Box>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName.toLowerCase()).toBe('span');
  });
});
