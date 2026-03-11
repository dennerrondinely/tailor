import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { craft, stitch, tailorFit } from '../../src';

// ---------------------------------------------------------------------------
// Component definition — showcases `stitch` (nested) + `tailorFit` (responsive)
// ---------------------------------------------------------------------------

const Article = craft('article')({
  base: 'text-gray-800 leading-relaxed max-w-prose mx-auto',
  nested: stitch({
    'h1':   'text-2xl font-bold text-gray-900 mb-3 mt-6 first:mt-0',
    'h2':   'text-xl  font-semibold text-gray-800 mb-2 mt-5',
    'h3':   'text-lg  font-medium text-gray-700 mb-2 mt-4',
    'p':    'mb-4 text-gray-600',
    'p>a':  'text-blue-600 underline hover:text-blue-800',
    'ul':   'list-disc pl-6 mb-4 space-y-1 text-gray-600',
    'ol':   'list-decimal pl-6 mb-4 space-y-1 text-gray-600',
    'code': 'font-mono text-sm bg-gray-100 rounded px-1 py-0.5 text-pink-600',
    'blockquote': 'border-l-4 border-blue-300 pl-4 italic text-gray-500 my-4',
  }),
  responsive: tailorFit({
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }),
});

const meta = {
  title: 'Tailor/Article',
  component: Article,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Basic: Story = {
  args: {
    children: (
      <>
        <h1>Article Title</h1>
        <p>This is a paragraph with a <a href="#">link inside a paragraph</a> that gets styled automatically via the nested selector <code>p&gt;a</code>.</p>
        <h2>A Subtitle</h2>
        <p>Another paragraph demonstrating how <code>stitch</code> applies Tailwind classes to child elements without any wrapper divs.</p>
      </>
    ),
  },
};

export const RichContent: Story = {
  name: 'Rich content (headings, lists, code, blockquote)',
  args: {
    children: (
      <>
        <h1>Building with Tailor</h1>
        <p>
          <strong>Tailor</strong> is a utility-first component library built on top of{' '}
          <a href="#">Tailwind CSS</a> and <a href="#">tailwind-merge</a>.
        </p>

        <blockquote>Design tokens via Tailwind. Composition via React.</blockquote>

        <h2>Installation</h2>
        <pre className="bg-gray-100 rounded p-4 text-sm font-mono mb-4 overflow-x-auto">
          <code>pnpm add @dennerrondinely/tailor</code>
        </pre>

        <h2>Key features</h2>
        <ul>
          <li>Zero runtime overhead — pure class string concatenation</li>
          <li>CVA-style <code>variants</code> with full TypeScript inference</li>
          <li>Polymorphic <code>as</code> prop for element composition</li>
          <li>CSS-like nested selectors via <code>stitch()</code></li>
        </ul>

        <h3>Responsive utilities</h3>
        <p>
          Use <code>tailorFit()</code> to apply responsive breakpoint classes and{' '}
          <code>embroider()</code> for interaction states.
        </p>
      </>
    ),
  },
};

export const MinimalPost: Story = {
  render: () => (
    <Article className="bg-white rounded-xl shadow p-8">
      <h1>Getting Started with React</h1>
      <p>
        React is a popular JavaScript library for building user interfaces.
        Check out the <a href="#">official docs</a> to get started.
      </p>
      <h2>Prerequisites</h2>
      <ul>
        <li>Basic HTML and CSS</li>
        <li>JavaScript fundamentals</li>
        <li>Node.js installed</li>
      </ul>
      <h2>Next Steps</h2>
      <p>Ready? Read our <a href="#">beginner tutorial</a> or join the community.</p>
    </Article>
  ),
};
