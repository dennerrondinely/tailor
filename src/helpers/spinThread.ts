import { TailwindAnimationConfig } from '../types';

/**
 * Generates valid Tailwind CSS animation classes based on the provided configuration.
 *
 * @param config - Animation configuration.
 * @returns A string with space-separated Tailwind classes ready to be applied.
 *
 * @example
 * // Basic spin
 * spinThread({ type: 'spin' })
 * // → 'animate-spin duration-500'
 *
 * @example
 * // Full configuration
 * spinThread({ type: 'pulse', duration: '1000', delay: '200', iteration: 'infinite', direction: 'reverse', timing: 'ease-in-out' })
 * // → 'animate-pulse duration-1000 delay-200 [animation-iteration-count:infinite] [animation-direction:reverse] ease-in-out'
 */
export function spinThread(config: TailwindAnimationConfig): string {
  const {
    type,
    duration = '500',
    delay,
    iteration = 'once',
    direction,
    timing,
  } = config;

  const classes: string[] = [];

  // Base animation class
  switch (type) {
    case 'spin':   classes.push('animate-spin');   break;
    case 'ping':   classes.push('animate-ping');   break;
    case 'pulse':  classes.push('animate-pulse');  break;
    case 'bounce': classes.push('animate-bounce'); break;
    case 'none':   classes.push('animate-none');   break;
  }

  // animation-duration — Tailwind's duration-* utility
  if (duration) {
    classes.push(`duration-${duration}`);
  }

  // animation-delay — Tailwind's delay-* utility
  if (delay) {
    classes.push(`delay-${delay}`);
  }

  // animation-iteration-count
  // 'infinite' has no dedicated Tailwind class → use an arbitrary value
  if (iteration === 'infinite') {
    classes.push('[animation-iteration-count:infinite]');
  }

  // animation-direction
  // 'normal' is the CSS default, no class needed.
  // 'reverse' has no dedicated Tailwind class → use an arbitrary value.
  if (direction === 'reverse') {
    classes.push('[animation-direction:reverse]');
  }

  // animation-timing-function — Tailwind's ease-* utilities
  if (timing) {
    switch (timing) {
      case 'linear':      classes.push('ease-linear');   break;
      case 'ease-in':     classes.push('ease-in');       break;
      case 'ease-out':    classes.push('ease-out');      break;
      case 'ease-in-out': classes.push('ease-in-out');   break;
    }
  }

  return classes.join(' ');
}
