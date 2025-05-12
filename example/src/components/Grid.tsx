import React from 'react';
import { createElement } from '../../../src';

export const Grid = createElement('div')({
  base: 'grid gap-4',
  responsive: {
    base: {
      sm: 'grid-cols-1',
      md: 'grid-cols-2',
      lg: 'grid-cols-3',
      xl: 'grid-cols-4',
    }
  }
}); 