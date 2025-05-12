import { NestedStyles } from '../types';

/**
 * Creates a nested styles configuration for use in components.
 * @param styles - An object where keys are selectors and values are Tailwind classes.
 * @returns A NestedStyles object.
 */
export function stitch(styles: NestedStyles): NestedStyles {
  return styles;
}

export default stitch; 