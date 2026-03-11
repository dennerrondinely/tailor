import React from 'react';
import { render } from '@testing-library/react';
import { applyNestedStyles } from '../nested';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Renders a wrapper div containing the transformed children and returns the container. */
function renderNested(children: React.ReactNode, nested: Record<string, string>) {
  const transformed = applyNestedStyles(children, nested);
  const { container } = render(<div data-testid="root">{transformed}</div>);
  return container;
}

// ---------------------------------------------------------------------------
// Tag selectors
// ---------------------------------------------------------------------------

describe('tag selector', () => {
  it('applies classes to a matching HTML tag', () => {
    const container = renderNested(
      <h1>Title</h1>,
      { h1: 'text-2xl font-bold' }
    );
    expect(container.querySelector('h1')).toHaveClass('text-2xl', 'font-bold');
  });

  it('does not apply classes to non-matching tag', () => {
    const container = renderNested(
      <h2>Subtitle</h2>,
      { h1: 'text-2xl font-bold' }
    );
    expect(container.querySelector('h2')).not.toHaveClass('text-2xl');
  });

  it('applies classes to all matching tags in the subtree', () => {
    const container = renderNested(
      <>
        <p>First</p>
        <p>Second</p>
      </>,
      { p: 'mb-4' }
    );
    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach(p => expect(p).toHaveClass('mb-4'));
  });

  it('merges with existing className', () => {
    const container = renderNested(
      <h1 className="existing-class">Title</h1>,
      { h1: 'text-2xl' }
    );
    const h1 = container.querySelector('h1');
    expect(h1).toHaveClass('existing-class', 'text-2xl');
  });
});

// ---------------------------------------------------------------------------
// Class selectors
// ---------------------------------------------------------------------------

describe('class selector', () => {
  it('applies classes to elements matching a CSS class', () => {
    const container = renderNested(
      <span className="icon">★</span>,
      { '.icon': 'w-5 h-5' }
    );
    expect(container.querySelector('.icon')).toHaveClass('w-5', 'h-5');
  });

  it('applies to element with multiple classes when one matches', () => {
    const container = renderNested(
      <span className="icon primary">★</span>,
      { '.icon': 'w-5 h-5' }
    );
    expect(container.querySelector('span')).toHaveClass('w-5', 'h-5');
  });

  it('does not apply to element missing the class', () => {
    const container = renderNested(
      <span className="badge">★</span>,
      { '.icon': 'w-5 h-5' }
    );
    expect(container.querySelector('span')).not.toHaveClass('w-5');
  });
});

// ---------------------------------------------------------------------------
// Data-attribute selectors
// ---------------------------------------------------------------------------

describe('data-attribute selector', () => {
  it('applies classes when data attribute with value matches', () => {
    const container = renderNested(
      <span data-slot="icon">★</span>,
      { '[data-slot=icon]': 'text-primary' }
    );
    expect(container.querySelector('[data-slot="icon"]')).toHaveClass('text-primary');
  });

  it('does not apply when data attribute value differs', () => {
    const container = renderNested(
      <span data-slot="label">Text</span>,
      { '[data-slot=icon]': 'text-primary' }
    );
    expect(container.querySelector('[data-slot="label"]')).not.toHaveClass('text-primary');
  });

  it('applies classes when data attribute exists (no value check)', () => {
    const container = renderNested(
      <button data-active>Click</button>,
      { '[data-active]': 'ring-2' }
    );
    expect(container.querySelector('button')).toHaveClass('ring-2');
  });

  it('does not apply when data attribute is absent', () => {
    const container = renderNested(
      <button>Click</button>,
      { '[data-active]': 'ring-2' }
    );
    expect(container.querySelector('button')).not.toHaveClass('ring-2');
  });
});

// ---------------------------------------------------------------------------
// Direct child combinator  >
// ---------------------------------------------------------------------------

describe('direct child combinator (>)', () => {
  it('applies classes to a direct child matching the selector', () => {
    const container = renderNested(
      <p>
        Visit <a href="#">this link</a>
      </p>,
      { 'p>a': 'text-blue-500 underline' }
    );
    expect(container.querySelector('p > a')).toHaveClass('text-blue-500', 'underline');
  });

  it('does NOT apply classes to a deep descendant (not direct child)', () => {
    const container = renderNested(
      <p>
        <span>
          <a href="#">deep link</a>
        </span>
      </p>,
      { 'p>a': 'text-blue-500' }
    );
    // The <a> is NOT a direct child of <p>, so must not receive the class
    expect(container.querySelector('a')).not.toHaveClass('text-blue-500');
  });

  it('works with spaces around >', () => {
    const container = renderNested(
      <ul>
        <li>Item</li>
      </ul>,
      { 'ul > li': 'list-disc' }
    );
    expect(container.querySelector('li')).toHaveClass('list-disc');
  });
});

// ---------------------------------------------------------------------------
// Descendant combinator (space)
// ---------------------------------------------------------------------------

describe('descendant combinator (space)', () => {
  it('applies classes to a deeply nested descendant', () => {
    const container = renderNested(
      <ul>
        <li>
          <a href="#">link</a>
        </li>
      </ul>,
      { 'ul a': 'font-medium' }
    );
    expect(container.querySelector('a')).toHaveClass('font-medium');
  });

  it('applies to multiple matching descendants', () => {
    const container = renderNested(
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>,
      { 'ul li': 'mb-1' }
    );
    const items = container.querySelectorAll('li');
    items.forEach(li => expect(li).toHaveClass('mb-1'));
  });
});

// ---------------------------------------------------------------------------
// Combined selectors
// ---------------------------------------------------------------------------

describe('combined selectors', () => {
  it('handles tag + class combination', () => {
    const container = renderNested(
      <>
        <li className="active">Active</li>
        <li>Inactive</li>
      </>,
      { 'li.active': 'font-bold text-blue-500' }
    );
    const lis = container.querySelectorAll('li');
    expect(lis[0]).toHaveClass('font-bold', 'text-blue-500');
    expect(lis[1]).not.toHaveClass('font-bold');
  });

  it('handles tag + data-attribute combination', () => {
    const container = renderNested(
      <>
        <span data-slot="icon">★</span>
        <span data-slot="label">Label</span>
      </>,
      { 'span[data-slot=icon]': 'w-5 h-5' }
    );
    expect(container.querySelector('[data-slot="icon"]')).toHaveClass('w-5', 'h-5');
    expect(container.querySelector('[data-slot="label"]')).not.toHaveClass('w-5');
  });
});

// ---------------------------------------------------------------------------
// Multiple selectors applied simultaneously
// ---------------------------------------------------------------------------

describe('multiple selectors', () => {
  it('applies multiple selectors to the same tree independently', () => {
    const container = renderNested(
      <>
        <h1>Title</h1>
        <p>
          Text and <a href="#">link</a>
        </p>
      </>,
      {
        h1: 'text-2xl font-bold',
        p: 'mb-4',
        'p>a': 'text-blue-500',
      }
    );

    expect(container.querySelector('h1')).toHaveClass('text-2xl', 'font-bold');
    expect(container.querySelector('p')).toHaveClass('mb-4');
    expect(container.querySelector('a')).toHaveClass('text-blue-500');
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('edge cases', () => {
  it('returns non-element nodes unchanged', () => {
    const container = renderNested(
      <>
        plain text
        <span>span</span>
      </>,
      { span: 'text-sm' }
    );
    expect(container.querySelector('span')).toHaveClass('text-sm');
    // Text nodes are not affected
    expect(container.firstChild?.textContent).toContain('plain text');
  });

  it('does nothing when nested styles object is empty', () => {
    const container = renderNested(<h1>Title</h1>, {});
    expect(container.querySelector('h1')).not.toHaveClass();
  });

  it('does nothing when selector does not match any node', () => {
    const container = renderNested(<h1>Title</h1>, { h2: 'text-xl' });
    expect(container.querySelector('h1')).not.toHaveClass('text-xl');
  });
});
