import { ElementConfig } from '../types';

/**
 * Embroider a CraftConfig object.
 * @param config - The CraftConfig object to embroider.
 * @returns The embroidered CraftConfig object.
 */

type EmbroiderConfig = Pick<ElementConfig, 'base' | 'hover' | 'active' | 'focus' | 'disabled'>;

export function embroider(config: EmbroiderConfig): EmbroiderConfig {
  return config;
} 