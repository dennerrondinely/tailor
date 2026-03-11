import React from 'react';

export type StyleObject = {
  [key: string]: string;
};

// ---------------------------------------------------------------------------
// Polymorphic "as" prop utilities
// ---------------------------------------------------------------------------

/**
 * The element/component that the Tailor component should render as.
 * Accepts any valid HTML tag string or a React component type.
 */
export type AsProp<C extends React.ElementType> = {
  /** Render the component as a different HTML element or React component. */
  as?: C;
};

/**
 * Extracts the intrinsic or component props for a given element type,
 * omitting any keys already defined by `OwnProps` to avoid conflicts.
 */
export type PropsOf<C extends React.ElementType> =
  React.ComponentPropsWithoutRef<C>;

/**
 * Merges the element's native props with the component's own props.
 * Keys in `OwnProps` take precedence over native props, so custom
 * prop names are never shadowed by HTML attributes.
 *
 * @example
 * // Button rendered as an anchor — gets href, target, rel, etc.
 * type Props = PolymorphicProps<'a', { variant?: 'primary' }>;
 */
export type PolymorphicProps<
  C extends React.ElementType,
  OwnProps = Record<string, unknown>,
> = AsProp<C> &
  Omit<PropsOf<C>, keyof OwnProps | 'as'> &
  OwnProps & {
    className?: string;
    children?: React.ReactNode;
  };

/**
 * A React component that supports the polymorphic `as` prop.
 *
 * `DefaultTag` is the element rendered when `as` is not provided.
 * `OwnProps` are the component's own typed props (variants, etc.).
 *
 * @example
 * const Button: PolymorphicComponent<'button', { intent?: 'primary' | 'danger' }> = ...
 *
 * <Button />                          // renders <button>
 * <Button as="a" href="/go">Go</Button> // renders <a href="/go">
 */
export type PolymorphicComponent<
  DefaultTag extends React.ElementType,
  OwnProps = Record<string, unknown>,
> = <C extends React.ElementType = DefaultTag>(
  props: PolymorphicProps<C, OwnProps> & React.RefAttributes<unknown>,
) => React.ReactElement | null;

/**
 * A `React.ForwardRefExoticComponent` extended with the polymorphic `as` prop.
 *
 * This is used as the concrete return type of `craft()` so consumers can
 * always pass `as`, `ref`, `className`, children and any component-specific
 * props while TypeScript accepts arbitrary HTML-element props too.
 *
 * The index signature of the component's own props (e.g. from variant
 * inference) is deliberately widened to `any` here so that `as` and `ref`
 * are never blocked by an index-signature conflict.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TailorComponent<_OwnProps = Record<string, unknown>> =
  React.ForwardRefExoticComponent<{
    /** Render as a different HTML element or React component. */
    as?: React.ElementType;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<unknown>;
    // Intentionally open — variant props, HTML attrs, and data-* are all valid.
    [key: string]: any;
  }>;

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
  /** Override the rendered element/component at runtime. */
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
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