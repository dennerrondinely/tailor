import { ResponsiveConfig } from '../../types';

/**
 * Builds an array of responsive Tailwind classes for a given config and prefix.
 * @param config - ResponsiveConfig object with breakpoint keys and class values.
 * @param prefix - Optional prefix for the class (e.g., 'hover:').
 * @returns An array of responsive class strings.
 */
export function buildResponsiveClasses(config: ResponsiveConfig | undefined, prefix: string = ''): string[] {
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