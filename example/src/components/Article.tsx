import React from 'react';
import { craft, stitch } from '../../../src';

const articleNested = stitch({
  h1: 'font-bold mb-4',
  h2: 'font-semibold mb-3',
  p: 'mb-2',
  'p>a': 'text-blue-500 hover:text-blue-600',
});

export const Article = craft('article')({
  base: 'prose max-w-none',
  nested: articleNested,
  responsive: {
    base: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }
  }
}); 