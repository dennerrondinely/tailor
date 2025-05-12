import React from 'react';
import { createElement } from '../../../src';

export const Card = createElement('div')({
  base: 'bg-white rounded-lg shadow',
  responsive: {
    base: {
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