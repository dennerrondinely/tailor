import React from 'react';
import { craft } from '../../../src';

export const Card = craft('div')({
  base: 'bg-white rounded-lg shadow',
  responsive: {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  }
}); 