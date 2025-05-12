import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ElementConfig, TailorProps, ReactElementWithProps, ResponsiveConfig } from '../types';

function buildResponsiveClasses(config: ResponsiveConfig | undefined, prefix: string = ''): string[] {
  if (!config) return [];
  
  const classes: string[] = [];
  const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

  breakpoints.forEach(breakpoint => {
    if (config[breakpoint]) {
      classes.push(`${breakpoint}:${prefix}${config[breakpoint]}`);
    }
  });

  return classes;
}

function buildClassName(config: ElementConfig): string {
  const classes: string[] = [];

  // Base classes
  if (config.root) {
    classes.push(config.root);
  }

  if (config.hover) {
    classes.push(`hover:${config.hover}`);
  }

  if (config.active) {
    classes.push(`active:${config.active}`);
  }

  if (config.focus) {
    classes.push(`focus:${config.focus}`);
  }

  if (config.disabled) {
    classes.push(`disabled:${config.disabled}`);
  }

  if (config.responsive) {
    const { root, hover, active, focus, disabled } = config.responsive;

    classes.push(...buildResponsiveClasses(root));
    classes.push(...buildResponsiveClasses(hover, 'hover:'));
    classes.push(...buildResponsiveClasses(active, 'active:'));
    classes.push(...buildResponsiveClasses(focus, 'focus:'));
    classes.push(...buildResponsiveClasses(disabled, 'disabled:'));
  }

  return classes.join(' ');
}

export function createElement(tag: keyof JSX.IntrinsicElements) {
  return (config: ElementConfig = {}) => {
    return React.forwardRef<HTMLElement, TailorProps>((props, ref) => {
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

        return React.createElement(tag, {
          ...rest,
          className: finalClassName,
          ref,
          children: styledChildren
        });
      }

      return React.createElement(tag, {
        ...rest,
        className: finalClassName,
        ref,
        children
      });
    });
  };
}

export function createStyledElement(tag: keyof JSX.IntrinsicElements, defaultConfig: ElementConfig = {}) {
  return createElement(tag)(defaultConfig);
} 