import { ElementConfig, ResponsiveConfig } from '../types';
import { createElement } from '../core/element';
import { tailorFit } from './tailorFit';
import { spinThread } from './spinThread';
import { stitch } from './stitch';
import React from 'react';

type CraftConfig = {
  base?: string;
  variants?: {
    [key: string]: {
      [key: string]: string;
    };
  };
  responsive?: ResponsiveConfig;
  nested?: {
    [key: string]: string;
  };
  animation?: {
    type: 'spin' | 'ping' | 'pulse' | 'bounce' | 'none';
    duration?: '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';
    delay?: '75' | '100' | '150' | '200' | '300' | '500' | '700' | '1000';
    iteration?: 'once' | 'infinite';
    direction?: 'normal' | 'reverse';
    timing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  };
};

type CraftInput = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export function craft(input: CraftInput) {
  return (config: CraftConfig) => {
    const elementConfig: ElementConfig = {
      base: config.base
    };

    // Add variants
    if (config.variants) {
      Object.entries(config.variants).forEach(([variant, styles]) => {
        Object.entries(styles).forEach(([value, className]) => {
          if (variant === 'hover') elementConfig.hover = className;
          if (variant === 'active') elementConfig.active = className;
          if (variant === 'focus') elementConfig.focus = className;
          if (variant === 'disabled') elementConfig.disabled = className;
        });
      });
    }

    // Add responsive styles
    if (config.responsive) {
      elementConfig.responsive = {
        base: tailorFit(
          Object.entries(config.responsive).reduce((acc, [breakpoint, styles]) => {
            Object.entries(styles).forEach(([variant, className]) => {
              if (variant === 'base') {
                acc[breakpoint as keyof typeof acc] = className;
              }
            });
            return acc;
          }, {} as any)
        )
      };

      // Add responsive variants
      Object.entries(config.responsive).forEach(([breakpoint, styles]) => {
        Object.entries(styles).forEach(([variant, className]) => {
          if (variant !== 'base' && elementConfig.responsive) {
            if (!elementConfig.responsive[variant as keyof typeof elementConfig.responsive]) {
              elementConfig.responsive[variant as keyof typeof elementConfig.responsive] = tailorFit({});
            }
            const responsiveConfig = elementConfig.responsive[variant as keyof typeof elementConfig.responsive];
            if (responsiveConfig) {
              responsiveConfig[breakpoint as keyof typeof responsiveConfig] = className;
            }
          }
        });
      });
    }

    // Add nested styles
    if (config.nested) {
      elementConfig.nested = stitch(config.nested);
    }

    // Add animation
    if (config.animation) {
      const animationClass = spinThread(config.animation);
      elementConfig.base = elementConfig.base 
        ? `${elementConfig.base} ${animationClass}`
        : animationClass;
    }

    return createElement(input)(elementConfig);
  };
} 