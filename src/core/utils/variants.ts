import { ResolvedVariantsConfig } from '../../types';

/**
 * Resolves the Tailwind class string for the active semantic variants.
 *
 * Resolution order (later wins via twMerge in element.ts):
 *  1. Base variant classes (one per variant group)
 *  2. Compound variant classes (all conditions must match)
 *
 * @param config - The resolved variants config stored in ElementConfig.
 * @param props  - The current component props (includes variant prop values).
 * @returns A space-separated string of Tailwind classes, or '' if none match.
 *
 * @example
 * resolveVariants(
 *   {
 *     variants: {
 *       intent: { primary: 'bg-blue-500', danger: 'bg-red-500' },
 *       size:   { sm: 'text-sm', lg: 'text-lg' },
 *     },
 *     defaultVariants: { intent: 'primary', size: 'sm' },
 *     compoundVariants: [
 *       { intent: 'primary', size: 'lg', className: 'shadow-lg' },
 *     ],
 *   },
 *   { intent: 'primary', size: 'lg' }
 * )
 * // → 'bg-blue-500 text-lg shadow-lg'
 */
export function resolveVariants(
  config: ResolvedVariantsConfig,
  props: Record<string, unknown>
): string {
  const { variants, defaultVariants = {}, compoundVariants = [] } = config;
  const classes: string[] = [];

  // ------------------------------------------------------------------
  // 1. Per-group variant classes
  // ------------------------------------------------------------------
  for (const [groupName, groupValues] of Object.entries(variants)) {
    // Active value: prop value → defaultVariant fallback → nothing
    const activeValue =
      (props[groupName] as string | undefined) ??
      (defaultVariants[groupName] as string | undefined);

    if (activeValue !== undefined && groupValues[activeValue]) {
      classes.push(groupValues[activeValue]);
    }
  }

  // ------------------------------------------------------------------
  // 2. Compound variant classes
  // ------------------------------------------------------------------
  for (const compound of compoundVariants) {
    const { className, ...conditions } = compound;

    const allMatch = Object.entries(conditions).every(([groupName, expectedValue]) => {
      const activeValue =
        (props[groupName] as string | undefined) ??
        (defaultVariants[groupName] as string | undefined);
      return activeValue === expectedValue;
    });

    if (allMatch) {
      classes.push(className);
    }
  }

  return classes.join(' ');
}
