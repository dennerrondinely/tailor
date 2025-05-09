import React from 'react';
import { createElement } from '../../../src';

export const Nav = createElement('nav')({
  root: 'bg-gray-800 text-white',
  responsive: {
    root: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    }
  }
});

export const NavItem = createElement('a')({
  root: 'text-gray-300 hover:text-white',
  hover: 'text-white',
  responsive: {
    root: {
      sm: 'text-sm px-2',
      md: 'text-base px-4',
      lg: 'text-lg px-6',
    }
  }
}); 