import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TailorProps, ElementConfig } from '../types';
import { buildClassName } from './utils/classes';
import { applyNestedStyles } from './utils/nested';
import { resolveVariants } from './utils/variants';

type ElementInput = keyof JSX.IntrinsicElements | React.ComponentType<any>;

/**
 * Derives a human-readable display name from the element input.
 *
 * - HTML tag string → capitalised: `'button'` → `'Button'`
 * - React component  → uses `displayName` or `name`: `MyCard` → `'MyCard'`
 *
 * The result is wrapped as `Tailor(Name)` so it is easy to spot in
 * React DevTools and error stack traces.
 *
 * @internal
 */
function deriveDisplayName(input: ElementInput): string {
  if (typeof input === 'string') {
    // Capitalise the HTML tag: 'button' → 'Button'
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  // React component: prefer displayName, fall back to function name
  return (input as React.ComponentType<any>).displayName
    ?? (input as React.ComponentType<any>).name
    ?? 'Component';
}

/**
 * Creates a styled React component for a given tag or component and configuration.
 *
 * The returned component automatically receives a `displayName` of the form
 * `Tailor(InputName)`, making it easy to identify in React DevTools.
 *
 * @param input - The HTML tag string or React component to wrap.
 * @returns A function that accepts an {@link ElementConfig} and returns a
 *   `React.ForwardRefExoticComponent` with the derived display name.
 */
export function createElement(input: ElementInput) {
  return (config: ElementConfig = {}) => {
    const component = React.forwardRef<any, TailorProps>((props, ref) => {
      const { className, children, as: Tag, ...rest } = props;

      // `as` prop overrides the element type at render time
      const ElementTag: ElementInput = (Tag as ElementInput) ?? input;

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

        return React.createElement(ElementTag, {
          ...rest,
          className: finalClassName,
          ref,
          children: styledChildren,
        });
      }

      return React.createElement(ElementTag, {
        ...rest,
        className: finalClassName,
        ref,
        children
      });
    });

    component.displayName = `Tailor(${deriveDisplayName(input)})`;
    return component;
  };
}

/**
 * Creates a styled React component with a default configuration.
 *
 * Shorthand for `createElement(input)(defaultConfig)`.
 *
 * @param input - The HTML tag string or React component to wrap.
 * @param defaultConfig - The {@link ElementConfig} to apply by default.
 * @returns A styled `React.ForwardRefExoticComponent`.
 */
export function createStyledElement(input: ElementInput, defaultConfig: ElementConfig = {}) {
  return createElement(input)(defaultConfig);
} 