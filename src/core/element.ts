import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TailorProps, ReactElementWithProps, ElementConfig } from '../types';
import { buildClassName } from './utils/classes';

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
      const generatedClassName = buildClassName(config);
      const finalClassName = twMerge(generatedClassName, className);

      if (config.nested && children) {
        const styledChildren = React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child;

          const tagName = (child.type as any)?.displayName || child.type;
          const nestedStyle = config.nested?.[tagName];
          const nestedSelectorStyle = config.nested 
            ? Object.entries(config.nested)
                .filter(([selector]) => selector.includes('>'))
                .find(([selector]) => {
                  const [parent, child] = selector.split('>');
                  return parent.trim() === tagName;
                })
            : undefined;

          if (nestedStyle || nestedSelectorStyle) {
            const childElement = child as ReactElementWithProps;
            const childClassName = twMerge(
              childElement.props.className || '',
              nestedStyle || nestedSelectorStyle?.[1] || ''
            );

            return React.cloneElement(childElement, {
              ...childElement.props,
              className: childClassName
            });
          }

          return child;
        });

        return React.createElement(input, {
          ...rest,
          className: finalClassName,
          ref,
          children: styledChildren
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