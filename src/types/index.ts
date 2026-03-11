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

// ---------------------------------------------------------------------------
// Semantic variants (CVA-style)
// ---------------------------------------------------------------------------

/**
 * Map of variant group name → { variant value → Tailwind classes }.
 *
 * @example
 * {
 *   intent: { primary: 'bg-blue-500 text-white', danger: 'bg-red-500 text-white' },
 *   size:   { sm: 'text-sm px-2', md: 'text-base px-4', lg: 'text-lg px-6' },
 * }
 */
export type VariantDefinition = {
  [variantGroup: string]: {
    [variantValue: string]: string;
  };
};

/**
 * Infers the prop type for a given VariantDefinition.
 * Each variant group becomes an optional prop whose type is
 * the union of its keys.
 *
 * @example
 * type V = { intent: { primary: '...'; danger: '...' } }
 * InferVariantProps<V> → { intent?: 'primary' | 'danger' }
 */
export type InferVariantProps<V extends VariantDefinition> = {
  [K in keyof V]?: keyof V[K];
};

/**
 * A single compound variant rule.
 * When ALL specified variant conditions match the current props,
 * `className` is appended to the resolved class string.
 *
 * @example
 * { intent: 'primary', size: 'lg', className: 'shadow-lg uppercase' }
 */
export type CompoundVariant<V extends VariantDefinition> = {
  [K in keyof V]?: keyof V[K];
} & { className: string };

/**
 * Resolved variants config stored inside ElementConfig (post-compilation).
 * The generic is dropped so ElementConfig stays simple internally.
 */
export type ResolvedVariantsConfig = {
  variants: VariantDefinition;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<Record<string, string> & { className: string }>;
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
  /** Resolved semantic variants — populated by craft() */
  variantsConfig?: ResolvedVariantsConfig;
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

/**
 * Configuration object for `craft()`.
 *
 * `TProps` are the component's own props (e.g. from a custom interface).
 * `V` are the variant definitions inferred from the `variants` key.
 *
 * The final component will accept both `TProps` and `InferVariantProps<V>`.
 *
 * @example
 * ```tsx
 * craft<{ disabled?: boolean }>('button')({
 *   base: 'rounded font-medium transition-colors',
 *   variants: {
 *     intent: {
 *       primary:   'bg-blue-500 text-white',
 *       secondary: 'bg-gray-100 text-gray-900',
 *       danger:    'bg-red-500 text-white',
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
 * // Props: { disabled?: boolean; intent?: 'primary'|'secondary'|'danger'; size?: 'sm'|'md'|'lg' }
 * ```
 */
export type CraftConfig<TProps = Record<string, unknown>, V extends VariantDefinition = VariantDefinition> = {
  base?: string;
  responsive?: ResponsiveConfig;
  nested?: NestedStyles;
  animation?: AnimationConfig;
  dynamic?: DynamicClassConfig<TProps & InferVariantProps<V>>;
  /**
   * Semantic variant groups. Each key becomes a typed prop on the component.
   * Values are objects mapping variant names to Tailwind class strings.
   */
  variants?: V;
  /**
   * Default value for each variant group when the prop is not provided.
   */
  defaultVariants?: { [K in keyof V]?: keyof V[K] };
  /**
   * Extra classes applied when a specific combination of variants matches.
   */
  compoundVariants?: CompoundVariant<V>[];
  /** @deprecated Use `variants` with interaction keys instead */
  interactionVariants?: {
    hover?: string;
    active?: string;
    focus?: string;
    disabled?: string;
  };
};