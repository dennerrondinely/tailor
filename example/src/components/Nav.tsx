import React from 'react';
import { createElement, embroider } from '../../../src';

const navBase = embroider({
  base: 'text-gray-300 hover:text-white',
  hover: 'text-white',
});

export const Nav = createElement('nav')({
  base: 'bg-gray-800 text-white',
  responsive: {
    base: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    }
  }
});

export const NavItem = createElement('a')({
  ...navBase,
  responsive: {
    base: {
      sm: 'text-sm px-2',
      md: 'text-base px-4',
      lg: 'text-lg px-6',
    }
  }
}); 