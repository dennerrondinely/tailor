import React from 'react';
import { createElement } from '../../../src';

export const Grid = createElement('div')({
  root: 'grid gap-4',
  responsive: {
    root: {
      sm: 'grid-cols-1',
      md: 'grid-cols-2',
      lg: 'grid-cols-3',
      xl: 'grid-cols-4',
    }
  }
}); 