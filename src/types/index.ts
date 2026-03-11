import React from 'react';

export type StyleObject = {
  [key: string]: string;
};

/**
 * Maps CSS-like selectors to Tailwind class strings.
 *
 * Supported selector patterns:
 * - HTML tag:             `'h1'`, `'p'`, `'a'`
 * - CSS class:            `'.icon'`, `'.btn-label'`
 * - Data attribute:       `'[data-slot=icon]'`, `'[data-active]'`
 * - Direct child (`>`):   `'p>a'`, `'ul > li'`
 * - Descendant (space):   `'ul li'`, `'article p'`
 * - Combinations:         `'ul > li.active'`, `'div [data-slot=icon]'`
 *
 * @example
 * stitch({
 *   'h1':                'text-2xl font-bold',
 *   'p>a':               'text-blue-500 underline',
 *   '.icon':             'w-5 h-5',
 *   '[data-slot=icon]':  'text-primary',
 *   'ul li':             'mb-1',
 * })
 */
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

export type ResponsiveElementConfig = {
  base?: ResponsiveConfig;
  hover?: ResponsiveConfig;
  active?: ResponsiveConfig;
  focus?: ResponsiveConfig;
  disabled?: ResponsiveConfig;
};

export type AnimationConfig = {
  type: 'spin' | 'ping' | 'pulse' | 'bounce' | 'none';
  duration?: '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';
  delay?: '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';
  iteration?: 'once' | 'infinite';
  direction?: 'normal' | 'reverse';
};

// Type to validate Tailwind classes
export type TailwindClass = string;

// Utility type to convert optional values to boolean
export type ToBoolean<T> = T extends undefined ? false : boolean;

// Type for the dynamic condition function
export type DynamicCondition<TProps = any> = (props: TProps) => ToBoolean<TProps[keyof TProps]>;

// Type for the dynamic class object
export type DynamicClassConfig<TProps = any> = {
  [className: TailwindClass]: DynamicCondition<TProps>;
};

export type ElementConfig = {
  base?: string;
  hover?: string;
  active?: string;
  focus?: string;
  disabled?: string;
  responsive?: ResponsiveElementConfig;
  nested?: NestedStyles;
  animation?: AnimationConfig;
  dynamic?: DynamicClassConfig;
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

// Update CraftConfig to be generic
export type CraftConfig<TProps = any> = {
  base?: string;
  responsive?: ResponsiveConfig;
  nested?: {
    [key: string]: string;
  };
  animation?: AnimationConfig;
  dynamic?: DynamicClassConfig<TProps>;
  variants?: {
    hover?: string;
    active?: string;
    focus?: string;
    disabled?: string;
  };
}; 