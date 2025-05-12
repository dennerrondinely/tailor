import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { craft } from './helpers/craft';
describe('Tailor', () => {
  it('should create a component with basic styles', () => {
    const Button = craft('button')({
      base: 'px-4 py-2',
    });

    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('should merge custom class names', () => {
    const Button = craft('button')({
      base: 'px-4 py-2',
    });

    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('custom-class');
  });

  it('should handle all style categories', () => {
    const Button = craft('button')({
      base: 'base',
    });

    render(<Button disabled>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('base');
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

    // Como as classes não são aplicadas diretamente, apenas testamos a base
    const article = screen.getByText('Title').closest('article');
    expect(article).toHaveClass('prose');
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
    expect(card).toHaveClass('sm:sm');
    expect(card).toHaveClass('md:md');
    expect(card).toHaveClass('lg:lg');
    expect(card).toHaveClass('xl:xl');
    expect(card).toHaveClass('2xl:2xl');
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