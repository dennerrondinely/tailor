import React from 'react';
import { craft, embroider } from '../../../src';

const navBase = embroider({
  base: 'text-gray-300 hover:text-white',
  hover: 'text-white',
});

export const Nav = craft('nav')({
  base: 'bg-gray-800 text-white',
  responsive: {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  }
});

export const NavItem = craft<{ isActive?: boolean }>('a')({
  ...navBase,
  responsive: {
    sm: 'text-sm px-2',
    md: 'text-base px-4',
    lg: 'text-lg px-6',
  },
  dynamic: {
    'is-active': (props) => !!props.isActive,
  },
});

// Exemplo de componente com props opcionais
type MyComponentProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

// Usar a tipagem genérica com conversão explícita para boolean
const MyComponent = craft<MyComponentProps>('div')({
  base: 'base-class',
  dynamic: {
    'active-class': (props) => !!props.isActive,
    'disabled-class': (props) => !!props.isDisabled,
  },
  variants: {
    hover: 'hover-class',
    active: 'active-class',
    focus: 'focus-class',
    disabled: 'disabled-class',
  },
});

// Exemplo de uso
export const Example = () => (
  <MyComponent isActive={true} isDisabled>
    Home
  </MyComponent>
);