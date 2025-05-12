import { craft } from '../craft';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('craft', () => {
  it('should create a component with base class', () => {
    const Button = craft('button')({ base: 'btn' });
    render(<Button>Test</Button>);
    const el = screen.getByText('Test');
    expect(el).toHaveClass('btn');
  });
}); 