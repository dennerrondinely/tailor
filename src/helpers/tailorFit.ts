import { ResponsiveConfig } from '../types';

/**
 * Creates a responsive styles configuration for use in components.
 * @param config - An object where keys are breakpoints (sm, md, lg, xl, 2xl) and values are Tailwind classes.
 * @returns A ResponsiveConfig object.
 */
export function tailorFit(config: ResponsiveConfig): ResponsiveConfig {
  return config;
} 