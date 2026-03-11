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

// ---------------------------------------------------------------------------
// displayName
// ---------------------------------------------------------------------------

describe('craft – displayName', () => {
  it('sets displayName to Tailor(Tag) for HTML tag inputs', () => {
    const Button = craft('button')({ base: 'btn' });
    expect((Button as any).displayName).toBe('Tailor(Button)');
  });

  it('capitalises single-letter tags correctly', () => {
    const A = craft('a')({ base: 'link' });
    expect((A as any).displayName).toBe('Tailor(A)');
  });

  it('uses the component displayName when wrapping a React component', () => {
    const MyCard: React.FC<{ children?: React.ReactNode }> = ({ children }) => <div>{children}</div>;
    MyCard.displayName = 'MyCard';
    const StyledCard = craft(MyCard)({ base: 'card' });
    expect((StyledCard as any).displayName).toBe('Tailor(MyCard)');
  });

  it('falls back to function name when displayName is not set', () => {
    function NavBar({ children }: { children?: React.ReactNode }) {
      return <nav>{children}</nav>;
    }
    const StyledNav = craft(NavBar)({ base: 'nav' });
    expect((StyledNav as any).displayName).toBe('Tailor(NavBar)');
  });
});
