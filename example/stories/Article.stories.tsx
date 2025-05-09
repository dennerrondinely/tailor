import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createElement, createNested } from '../../src';

const articleNested = createNested({
  h1: 'font-bold mb-4',
  h2: 'font-semibold mb-3',
  p: 'mb-2',
  'p>a': 'text-blue-500 hover:text-blue-600',
});

const Article = createElement('article')({
  root: 'prose max-w-none',
  nested: articleNested,
  responsive: {
    root: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }
  }
});

const meta = {
  title: 'Example/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <h1>Article Title</h1>
        <p>This is a paragraph with a <a href="#">link</a>.</p>
        <h2>Subtitle</h2>
        <p>Another paragraph with more content.</p>
      </>
    ),
  },
};

export const LongForm: Story = {
  args: {
    children: (
      <>
        <h1>A Complete Guide to Web Development</h1>
        <p>Web development is a vast and exciting field. In this article, we'll explore the fundamentals and best practices. Check out our <a href="#">resources</a> for more information.</p>
        
        <h2>Frontend Development</h2>
        <p>Frontend development focuses on what users see and interact with. It involves HTML, CSS, and JavaScript.</p>
        
        <h2>Backend Development</h2>
        <p>Backend development deals with server-side logic and databases. Learn more about our <a href="#">backend courses</a>.</p>
        
        <h2>Best Practices</h2>
        <p>Following best practices ensures maintainable and scalable code. Here are some key principles to follow.</p>
      </>
    ),
  },
};

export const WithList: Story = {
  args: {
    children: (
      <>
        <h1>Getting Started with React</h1>
        <p>React is a popular JavaScript library for building user interfaces. Here's what you need to know:</p>
        
        <h2>Prerequisites</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Basic HTML and CSS knowledge</li>
          <li>JavaScript fundamentals</li>
          <li>Node.js installed on your computer</li>
        </ul>
        
        <h2>Next Steps</h2>
        <p>Ready to start? Check out our <a href="#">beginner's tutorial</a> or join our community.</p>
      </>
    ),
  },
}; 