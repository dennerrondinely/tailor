import { TailwindAnimationConfig } from '../types';

export function spinThread(config: TailwindAnimationConfig): string {
  const {
    type,
    duration = '500',
    delay,
    iteration = 'once',
    direction,
    timing
  } = config;

  const classes: string[] = [];

  // Add base animation class
  switch (type) {
    case 'spin':
      classes.push('animate-spin');
      break;
    case 'ping':
      classes.push('animate-ping');
      break;
    case 'pulse':
      classes.push('animate-pulse');
      break;
    case 'bounce':
      classes.push('animate-bounce');
      break;
    case 'none':
      classes.push('animate-none');
      break;
  }

  // Add duration
  if (duration) {
    classes.push(`duration-${duration}`);
  }

  // Add delay
  if (delay) {
    classes.push(`delay-${delay}`);
  }

  // Add iteration
  if (iteration === 'infinite') {
    classes.push('infinite');
  }

  // Add direction
  if (direction === 'reverse') {
    classes.push('reverse');
  }

  // Add timing
  if (timing) {
    switch (timing) {
      case 'linear':
        classes.push('ease-linear');
        break;
      case 'ease-in':
        classes.push('ease-in');
        break;
      case 'ease-out':
        classes.push('ease-out');
        break;
      case 'ease-in-out':
        classes.push('ease-in-out');
        break;
    }
  }

  return classes.join(' ');
} 