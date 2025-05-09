import React from 'react';
import { twMerge } from 'tailwind-merge';

type StyleObject = {
  [key: string]: string;
};

type NestedStyles = {
  [selector: string]: string;
};

type ElementConfig = {
  root?: string;
  hover?: string;
  active?: string;
  focus?: string;
  disabled?: string;
  nested?: NestedStyles;
};

type TailorProps = {
  className?: string;
  [key: string]: any;
};

type ReactElementWithProps = React.ReactElement<{
  className?: string;
  [key: string]: any;
}>;

export function createNested(styles: NestedStyles) {
  return styles;
}

function buildClassName(config: ElementConfig): string {
  const classes: string[] = [];

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

  return classes.join(' ');
}

export function createElement(tag: keyof JSX.IntrinsicElements) {
  return (config: ElementConfig = {}) => {
    return React.forwardRef<HTMLElement, TailorProps>((props, ref) => {
      const { className, children, ...rest } = props;
      const generatedClassName = buildClassName(config);
      const finalClassName = twMerge(generatedClassName, className);

      // Se tiver estilos aninhados, aplicar aos filhos
      if (config.nested && children) {
        const styledChildren = React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child;

          // Encontrar estilos correspondentes para o elemento filho
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

// Função auxiliar para criar componentes com estilos pré-definidos
export function createStyledElement(tag: keyof JSX.IntrinsicElements, defaultConfig: ElementConfig = {}) {
  return createElement(tag)(defaultConfig);
}

// Exportar funções principais
export default {
  createElement,
  createNested,
  createStyledElement
}; 