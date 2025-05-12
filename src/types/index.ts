import React from 'react';

export type StyleObject = {
  [key: string]: string;
};

export type NestedStyles = {
  [selector: string]: string;
};

export type ResponsiveConfig = {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
};

export type ElementConfig = {
  base?: string;
  hover?: string;
  active?: string;
  focus?: string;
  disabled?: string;
  responsive?: {
    base?: ResponsiveConfig;
    hover?: ResponsiveConfig;
    active?: ResponsiveConfig;
    focus?: ResponsiveConfig;
    disabled?: ResponsiveConfig;
  };
  nested?: NestedStyles;
};

export type TailorProps = {
  className?: string;
  [key: string]: any;
};

export type ReactElementWithProps = React.ReactElement<{
  className?: string;
  [key: string]: any;
}>;

export type TailwindAnimationConfig = {
  type: 'spin' | 'ping' | 'pulse' | 'bounce' | 'none';
  duration?: '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';
  delay?: '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';
  iteration?: 'once' | 'infinite';
  direction?: 'normal' | 'reverse';
  timing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}; 