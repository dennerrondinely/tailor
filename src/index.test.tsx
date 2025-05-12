import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { craft } from './helpers/craft';
describe('Tailor', () => {
  it('should create a component with basic styles', () => {
    const Button = craft('button')({
      base: 'px-4 py-2',
      variants: {
        hover: 'bg-blue-500',
      },
    });

    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('px-4 py-2');
    expect(button).toHaveClass('hover:bg-blue-500');
  });

  it('should merge custom class names', () => {
    const Button = craft('button')({
      base: 'px-4 py-2',
    });

    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('px-4 py-2');
    expect(button).toHaveClass('custom-class');
  });

  it('should handle all style categories', () => {
    const Button = craft('button')({
      base: 'base',
      variants: {
        hover: 'hover',
        active: 'active',
        focus: 'focus',
        disabled: 'disabled',
      },
    });

    render(<Button disabled>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('base');
    expect(button).toHaveClass('hover:hover');
    expect(button).toHaveClass('active:active');
    expect(button).toHaveClass('focus:focus');
    expect(button).toHaveClass('disabled:disabled');
  });

  it('should handle nested styles', () => {
    const Article = craft('article')({
      base: 'prose',
      nested: {
        h1: 'text-4xl',
        p: 'text-lg',
        'p>a': 'text-blue-500',
      }
    });

    render(
      <Article>
        <h1>Title</h1>
        <p>Text with <a href="#">link</a></p>
      </Article>
    );

    const title = screen.getByText('Title');
    const paragraph = screen.getByText('Text with');
    const link = screen.getByText('link');

    expect(title).toHaveClass('text-4xl');
    expect(paragraph).toHaveClass('text-lg');
    expect(link).toHaveClass('text-blue-500');
  });

  it('should handle responsive styles', () => {
    const Card = craft('div')({
      base: 'base',
      responsive: {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
        '2xl': '2xl',
      }
    });

    render(<Card>Content</Card>);
    const card = screen.getByText('Content');

    // Base classes
    expect(card).toHaveClass('base');

    // Responsive classes
    expect(card).toHaveClass('sm:sm-base');
    expect(card).toHaveClass('md:md-base');
    expect(card).toHaveClass('lg:lg-base');

    // Responsive hover classes
    expect(card).toHaveClass('sm:hover:sm-hover');
    expect(card).toHaveClass('md:hover:md-hover');
    expect(card).toHaveClass('lg:hover:lg-hover');
  });

  it('should handle all responsive states', () => {
    const Button = craft('button')({
      base: 'base',
      responsive: {
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xl: 'xl',
        '2xl': '2xl',
      }
    });

    render(<Button disabled>Click me</Button>);
    const button = screen.getByText('Click me');

    // Base classes
    expect(button).toHaveClass('base');

    // Root responsive classes
    expect(button).toHaveClass('sm:sm-base');
    expect(button).toHaveClass('md:md-base');

    // Hover responsive classes
    expect(button).toHaveClass('sm:hover:sm-hover');
    expect(button).toHaveClass('md:hover:md-hover');

    // Active responsive classes
    expect(button).toHaveClass('sm:active:sm-active');
    expect(button).toHaveClass('md:active:md-active');

    // Focus responsive classes
    expect(button).toHaveClass('sm:focus:sm-focus');
    expect(button).toHaveClass('md:focus:md-focus');

    // Disabled responsive classes
    expect(button).toHaveClass('sm:disabled:sm-disabled');
    expect(button).toHaveClass('md:disabled:md-disabled');
  });

  it('should forward refs correctly', () => {
    const Button = craft('button')({
      base: 'px-4 py-2',
    });

    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
}); 