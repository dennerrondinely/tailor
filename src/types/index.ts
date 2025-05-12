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

export type DynamicClassConfig = {
  [className: string]: (props: any) => boolean;
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

export type CraftConfig = {
  base?: string;
  responsive?: ResponsiveConfig;
  nested?: {
    [key: string]: string;
  };
  animation?: AnimationConfig;
  dynamic?: DynamicClassConfig;
}; 