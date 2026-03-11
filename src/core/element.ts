import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TailorProps, ElementConfig } from '../types';
import { buildClassName } from './utils/classes';
import { applyNestedStyles } from './utils/nested';
import { resolveVariants } from './utils/variants';

type ElementInput = keyof JSX.IntrinsicElements | React.ComponentType<any>;

/**
 * Creates a styled React component for a given tag or component and configuration.
 * @param input - The HTML tag or React component to render.
 * @returns A function that takes an ElementConfig and returns a React component.
 */
export function createElement(input: ElementInput) {
  return (config: ElementConfig = {}) => {
    return React.forwardRef<any, TailorProps>((props, ref) => {
      const { className, children, ...rest } = props;

      // Dynamic classes
      let dynamicClasses = '';
      if (config.dynamic) {
        dynamicClasses = Object.entries(config.dynamic)
          .filter(([, fn]) => typeof fn === 'function' && fn(props))
          .map(([cls]) => cls)
          .join(' ');
      }

      // Semantic variant classes
      let variantClasses = '';
      if (config.variantsConfig) {
        variantClasses = resolveVariants(config.variantsConfig, props as Record<string, unknown>);
      }

      const generatedClassName = buildClassName(config);
      const finalClassName = twMerge(generatedClassName, variantClasses, dynamicClasses, className);

      if (config.nested && children) {
        const styledChildren = applyNestedStyles(children, config.nested);

        return React.createElement(input, {
          ...rest,
          className: finalClassName,
          ref,
          children: styledChildren,
        });
      }

      return React.createElement(input, {
        ...rest,
        className: finalClassName,
        ref,
        children
      });
    });
  };
}

/**
 * Creates a styled React component with a default configuration.
 * @param input - The HTML tag or React component to render.
 * @param defaultConfig - The default ElementConfig to use.
 * @returns A React component with the default styles applied.
 */
export function createStyledElement(input: ElementInput, defaultConfig: ElementConfig = {}) {
  return createElement(input)(defaultConfig);
} 