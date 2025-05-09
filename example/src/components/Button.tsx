import React from 'react';
import { createElement } from '../../../src';

export const Button = createElement('button')({
  root: 'px-4 py-2 rounded-md font-medium transition-colors',
  hover: 'bg-blue-600',
  active: 'bg-blue-700',
  focus: 'ring-2 ring-offset-2',
  disabled: 'opacity-50 cursor-not-allowed',
  responsive: {
    root: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    hover: {
      sm: 'bg-blue-500',
      md: 'bg-blue-600',
      lg: 'bg-blue-700',
    }
  }
}); 