import React from 'react';
import { render } from '@testing-library/react';
import tailor from './index';

describe('tailor', () => {
  it('should create a component with basic styles', () => {
    const Button = tailor('button', {
      spacing: {
        padding: '4',
      },
      background: {
        color: 'blue-500',
      },
    });

    const { container } = render(<Button>Test Button</Button>);
    const button = container.firstChild as HTMLElement;

    expect(button.tagName.toLowerCase()).toBe('button');
    expect(button.className).toContain('p-4');
    expect(button.className).toContain('bg-blue-500');
  });

  it('should merge custom className with generated styles', () => {
    const Div = tailor('div', {
      spacing: {
        margin: '4',
      },
    });

    const { container } = render(<Div className="custom-class">Test Div</Div>);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain('m-4');
    expect(div.className).toContain('custom-class');
  });

  it('should handle all style categories', () => {
    const ComplexComponent = tailor('div', {
      spacing: {
        padding: '4',
        margin: '2',
      },
      layout: {
        display: 'flex',
        width: 'full',
      },
      typography: {
        fontSize: 'lg',
        fontWeight: 'bold',
        textColor: 'gray-800',
      },
      background: {
        color: 'white',
        opacity: '90',
      },
      border: {
        width: '1',
        color: 'gray-200',
        radius: 'md',
      },
      flex: {
        direction: 'row',
        justify: 'between',
        align: 'center',
      },
      grid: {
        cols: '3',
        gap: '4',
      },
    });

    const { container } = render(<ComplexComponent>Complex Component</ComplexComponent>);
    const component = container.firstChild as HTMLElement;

    expect(component.className).toContain('p-4');
    expect(component.className).toContain('m-2');
    expect(component.className).toContain('flex');
    expect(component.className).toContain('w-full');
    expect(component.className).toContain('text-lg');
    expect(component.className).toContain('font-bold');
    expect(component.className).toContain('text-gray-800');
    expect(component.className).toContain('bg-white');
    expect(component.className).toContain('opacity-90');
    expect(component.className).toContain('border-1');
    expect(component.className).toContain('border-gray-200');
    expect(component.className).toContain('rounded-md');
    expect(component.className).toContain('flex-row');
    expect(component.className).toContain('justify-between');
    expect(component.className).toContain('items-center');
    expect(component.className).toContain('grid-cols-3');
    expect(component.className).toContain('gap-4');
  });

  it('should forward refs correctly', () => {
    const Button = tailor('button', {
      spacing: {
        padding: '4',
      },
    });

    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Test Button</Button>);

    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName.toLowerCase()).toBe('button');
  });
}); 