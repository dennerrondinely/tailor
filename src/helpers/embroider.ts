import { ElementConfig } from '../types';

/**
 * The subset of {@link ElementConfig} that `embroider` accepts.
 *
 * | Key        | Tailwind prefix applied | Description                        |
 * |------------|-------------------------|------------------------------------|
 * | `base`     | —                       | Classes always present             |
 * | `hover`    | `hover:`                | Classes on `:hover`                |
 * | `active`   | `active:`               | Classes on `:active`               |
 * | `focus`    | `focus:`                | Classes on `:focus`                |
 * | `disabled` | `disabled:`             | Classes when the element is disabled |
 */
export type EmbroiderConfig = Pick<
  ElementConfig,
  'base' | 'hover' | 'active' | 'focus' | 'disabled'
>;

/**
 * Defines interactive-state styles (hover, active, focus, disabled) for a
 * component in a readable, organised way.
 *
 * `embroider` is a **configuration helper** — it returns the config object
 * unchanged but gives you a typed, documented structure to work with.
 * Spread the result directly into {@link craft} or compose it with other
 * config keys.
 *
 * Prefixes (`hover:`, `active:`, `focus:`, `disabled:`) are applied
 * automatically by the rendering engine — **do not include them in the
 * values you pass here**.
 *
 * @param config - Interactive-state style configuration.
 * @returns The same object, typed as {@link EmbroiderConfig}.
 *
 * @example
 * ```tsx
 * import { craft, embroider } from '@dennerrondinely/tailor';
 *
 * const buttonStates = embroider({
 *   base:     'px-4 py-2 rounded transition-colors',
 *   hover:    'bg-blue-600',          // → hover:bg-blue-600
 *   active:   'bg-blue-700',          // → active:bg-blue-700
 *   focus:    'ring-2 ring-blue-400', // → focus:ring-2 focus:ring-blue-400
 *   disabled: 'opacity-50 cursor-not-allowed', // → disabled:opacity-50 …
 * });
 *
 * const Button = craft('button')({
 *   ...buttonStates,
 *   base: `${buttonStates.base} bg-blue-500 text-white`,
 * });
 * ```
 *
 * @see {@link craft} for the main component factory.
 * @see {@link tailorFit} for responsive styles.
 * @see {@link stitch} for nested / child styles.
 */
export function embroider(config: EmbroiderConfig): EmbroiderConfig {
  return config;
}
