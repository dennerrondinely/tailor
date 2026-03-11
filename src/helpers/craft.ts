import React from 'react';
import {
  CraftConfig,
  ElementConfig,
  InferVariantProps,
  TailorComponent,
  ResponsiveConfig,
  VariantDefinition,
} from '../types';
import { createElement } from '../core/element';
import { spinThread } from './spinThread';
import { stitch } from './stitch';

type CraftInput = keyof JSX.IntrinsicElements | React.ComponentType<any>;

/**
 * Creates a fully-typed styled React component with Tailwind CSS.
 *
 * Accepts an optional type parameter `TProps` for the component's own props,
 * and infers variant prop types automatically from the `variants` config.
 *
 * @example
 * ```tsx
 * const Button = craft('button')({
 *   base: 'rounded font-medium transition-colors',
 *   variants: {
 *     intent: {
 *       primary:   'bg-blue-500 text-white hover:bg-blue-600',
 *       secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
 *       danger:    'bg-red-500 text-white hover:bg-red-600',
 *     },
 *     size: {
 *       sm: 'text-sm px-2 py-1',
 *       md: 'text-base px-4 py-2',
 *       lg: 'text-lg px-6 py-3',
 *     },
 *   },
 *   defaultVariants: { intent: 'primary', size: 'md' },
 *   compoundVariants: [
 *     { intent: 'primary', size: 'lg', className: 'shadow-lg' },
 *   ],
 * });
 *
 * // Variant props are fully typed:
 * <Button intent="primary" size="lg">Click me</Button>
 *
 * // Polymorphic — render as an anchor, get href/target/rel etc.:
 * <Button as="a" href="/go">Go</Button>
 * ```
 */
export function craft<TProps = Record<string, unknown>>(
  input: CraftInput
) {
  return <V extends VariantDefinition = VariantDefinition>(
    config: CraftConfig<TProps, V>
  ): TailorComponent<TProps & InferVariantProps<V>> => {
    const elementConfig: ElementConfig = {
      base: config.base,
    };

    // Responsive styles
    if (config.responsive) {
      const isFlat = Object.keys(config.responsive).some(key =>
        ['sm', 'md', 'lg', 'xl', '2xl'].includes(key)
      );
      elementConfig.responsive = isFlat
        ? { base: config.responsive as ResponsiveConfig }
        : (config.responsive as any);
    }

    // Nested styles
    if (config.nested) {
      elementConfig.nested = stitch(config.nested);
    }

    // Animation
    if (config.animation) {
      const animationClass = spinThread(config.animation);
      elementConfig.base = elementConfig.base
        ? `${elementConfig.base} ${animationClass}`
        : animationClass;
    }

    // Dynamic classes
    if (config.dynamic) {
      elementConfig.dynamic = config.dynamic as any;
    }

    // Semantic variants
    if (config.variants) {
      elementConfig.variantsConfig = {
        variants: config.variants as VariantDefinition,
        defaultVariants: config.defaultVariants as Record<string, string> | undefined,
        compoundVariants: config.compoundVariants as
          | Array<Record<string, string> & { className: string }>
          | undefined,
      };
    }

    // Legacy interaction variants (hover/active/focus/disabled on the root element)
    if (config.interactionVariants) {
      const { hover, active, focus, disabled } = config.interactionVariants;
      if (hover)    elementConfig.hover    = hover;
      if (active)   elementConfig.active   = active;
      if (focus)    elementConfig.focus    = focus;
      if (disabled) elementConfig.disabled = disabled;
    }

    const component = createElement(input)(elementConfig) as unknown as TailorComponent<
      TProps & InferVariantProps<V>
    >;

    // Propagate the display name so the component keeps its identity
    // even when assigned to a variable with a different name.
    // e.g. craft('button')({...}) → displayName: 'Tailor(Button)'
    // e.g. craft(MyCard)({...})   → displayName: 'Tailor(MyCard)'
    const baseName =
      typeof input === 'string'
        ? input.charAt(0).toUpperCase() + input.slice(1)
        : (input as React.ComponentType<any>).displayName
          ?? (input as React.ComponentType<any>).name
          ?? 'Component';

    (component as any).displayName = `Tailor(${baseName})`;

    return component;
  };
}
