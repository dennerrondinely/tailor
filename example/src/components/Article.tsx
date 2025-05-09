import React from 'react';
import { createElement, createNested } from '../../../src';

const articleNested = createNested({
  h1: 'font-bold mb-4',
  h2: 'font-semibold mb-3',
  p: 'mb-2',
  'p>a': 'text-blue-500 hover:text-blue-600',
});

export const Article = createElement('article')({
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