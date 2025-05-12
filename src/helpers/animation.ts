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

  // Adicionar a classe base da animação
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

  // Adicionar duração
  if (duration) {
    classes.push(`duration-${duration}`);
  }

  // Adicionar delay
  if (delay) {
    classes.push(`delay-${delay}`);
  }

  // Adicionar iteração
  if (iteration === 'infinite') {
    classes.push('infinite');
  }

  // Adicionar direção
  if (direction === 'reverse') {
    classes.push('reverse');
  }

  // Adicionar timing
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