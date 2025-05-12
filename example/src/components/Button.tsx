import React from 'react';
import { craft, embroider } from '../../../src';

const buttonBase = embroider({
  base: 'px-4 py-2 rounded-md font-medium transition-colors',
  hover: 'bg-blue-600',
  active: 'bg-blue-700',
  focus: 'ring-2 ring-offset-2',
  disabled: 'opacity-50 cursor-not-allowed',
});

export const Button = craft('button')({
  ...buttonBase,
  responsive: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
}); 