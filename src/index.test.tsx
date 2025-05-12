import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createElement } from './index';

describe('Tailor', () => {
  it('should create a component with basic styles', () => {
    const Button = createElement('button')({
      base: 'px-4 py-2',
      hover: 'bg-blue-500',
    });

    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('px-4 py-2');
    expect(button).toHaveClass('hover:bg-blue-500');
  });

  it('should merge custom class names', () => {
    const Button = createElement('button')({
      base: 'px-4 py-2',
    });

    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('px-4 py-2');
    expect(button).toHaveClass('custom-class');
  });

  it('should handle all style categories', () => {
    const Button = createElement('button')({
      base: 'base',
      hover: 'hover',
      active: 'active',
      focus: 'focus',
      disabled: 'disabled',
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
    const Article = createElement('article')({
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
    const Card = createElement('div')({
      base: 'base',
      responsive: {
        base: {
          sm: 'sm-base',
          md: 'md-base',
          lg: 'lg-base',
        },
        hover: {
          sm: 'sm-hover',
          md: 'md-hover',
          lg: 'lg-hover',
        }
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
    const Button = createElement('button')({
      base: 'base',
      responsive: {
        base: {
          sm: 'sm-base',
          md: 'md-base',
        },
        hover: {
          sm: 'sm-hover',
          md: 'md-hover',
        },
        active: {
          sm: 'sm-active',
          md: 'md-active',
        },
        focus: {
          sm: 'sm-focus',
          md: 'md-focus',
        },
        disabled: {
          sm: 'sm-disabled',
          md: 'md-disabled',
        }
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
    const Button = createElement('button')({
      base: 'px-4 py-2',
    });

    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
}); 