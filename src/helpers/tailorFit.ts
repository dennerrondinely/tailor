import { ResponsiveConfig } from '../types';

/**
 * Defines responsive Tailwind classes keyed by Tailwind breakpoint.
 *
 * Each breakpoint maps to a string of space-separated Tailwind utilities.
 * The classes are prefixed with the corresponding breakpoint at render time
 * (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
 *
 * | Key   | Min-width (Tailwind default) | Prefix applied |
 * |-------|------------------------------|----------------|
 * | `sm`  | 640 px                       | `sm:`          |
 * | `md`  | 768 px                       | `md:`          |
 * | `lg`  | 1024 px                      | `lg:`          |
 * | `xl`  | 1280 px                      | `xl:`          |
 * | `2xl` | 1536 px                      | `2xl:`         |
 *
 * @example
 * ```ts
 * tailorFit({ sm: 'text-sm p-2', md: 'text-base p-4', lg: 'text-lg p-6' })
 * // At render time produces: 'sm:text-sm sm:p-2 md:text-base md:p-4 lg:text-lg lg:p-6'
 * ```
 */
export type { ResponsiveConfig };

/**
 * Defines responsive Tailwind styles that adapt to different screen sizes.
 *
 * `tailorFit` is a **configuration helper** — it returns the config object
 * unchanged but provides type-safety and IntelliSense for breakpoint keys.
 * Pass the result (or spread it) into the `responsive` key of {@link craft}.
 *
 * The rendering engine automatically prepends the breakpoint prefix to every
 * class in the value string, so **do not include breakpoint prefixes yourself**.
 *
 * @param config - Breakpoint-to-class-string map.
 * @returns The same object, typed as {@link ResponsiveConfig}.
 *
 * @example
 * ```tsx
 * import { craft, tailorFit } from '@dennerrondinely/tailor';
 *
 * const cardResponsive = tailorFit({
 *   sm:  'p-2 text-sm',
 *   md:  'p-4 text-base',
 *   lg:  'p-6 text-lg',
 *   xl:  'p-8 text-xl',
 *   '2xl': 'p-10 text-2xl',
 * });
 *
 * const Card = craft('div')({
 *   base: 'bg-white rounded shadow',
 *   responsive: cardResponsive,
 * });
 * ```
 *
 * @see {@link craft} for the main component factory.
 * @see {@link embroider} for interactive-state styles.
 * @see {@link stitch} for nested / child styles.
 */
export function tailorFit(config: ResponsiveConfig): ResponsiveConfig {
  return config;
}
