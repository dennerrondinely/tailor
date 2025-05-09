import React from 'react';
import { createElement } from '../../../src';

export const Card = createElement('div')({
  root: 'bg-white rounded-lg shadow',
  responsive: {
    root: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    hover: {
      sm: 'shadow-md',
      md: 'shadow-lg',
      lg: 'shadow-xl',
    }
  }
}); 