import { ElementConfig } from '../../types';
import { buildResponsiveClasses } from './responsive';

/**
 * Builds the final className string for a component based on its ElementConfig.
 * @param config - ElementConfig object with all style options.
 * @returns A string with all merged Tailwind classes.
 */
export function buildClassName(config: ElementConfig): string {
  const classes: string[] = [];

  // Root classes
  if (config.base) {
    classes.push(config.base);
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

  if (config.responsive) {
    const { base, hover, active, focus, disabled } = config.responsive;

    classes.push(...buildResponsiveClasses(base));
    classes.push(...buildResponsiveClasses(hover, 'hover:'));
    classes.push(...buildResponsiveClasses(active, 'active:'));
    classes.push(...buildResponsiveClasses(focus, 'focus:'));
    classes.push(...buildResponsiveClasses(disabled, 'disabled:'));
  }

  return classes.join(' ');
} 