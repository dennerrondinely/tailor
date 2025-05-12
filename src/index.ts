export * from './types';
export * from './core/element';
export * from './helpers/tailorFit';
export * from './helpers/embroider';
export * from './helpers/spinThread';
export * from './helpers/craft';
export * from './helpers/stitch';

import { createElement, createStyledElement } from './core/element';
import { tailorFit } from './helpers/tailorFit';
import { embroider } from './helpers/embroider';
import { spinThread } from './helpers/spinThread';
import { craft } from './helpers/craft';
import { stitch } from './helpers/stitch';

export default {
  createElement,
  createStyledElement,
  tailorFit,
  embroider,
  spinThread,
  craft,
  stitch
}; 