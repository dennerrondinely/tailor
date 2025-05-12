import React from 'react';
import { craft } from '../../../src';

export const Grid = craft('div')({
  base: 'grid gap-4',
  responsive: {
    sm: 'grid-cols-1',
    md: 'grid-cols-2',
    lg: 'grid-cols-3',
    xl: 'grid-cols-4',
  }
}); 