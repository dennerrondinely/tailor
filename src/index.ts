export * from './types';
export * from './core/element';
export * from './helpers/responsive';
export * from './helpers/nested';
export * from './helpers/animation';

import { createElement, createStyledElement } from './core/element';
import { tailorFit } from './helpers/responsive';
import { embroider } from './helpers/nested';
import { spinThread } from './helpers/animation';

export default {
  createElement,
  createStyledElement,
  tailorFit,
  embroider,
  spinThread
}; 