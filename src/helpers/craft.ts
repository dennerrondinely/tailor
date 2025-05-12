import {
  ElementConfig,
  ResponsiveConfig,
  CraftConfig,
} from "../types";
import { createElement } from "../core/element";
import { spinThread } from "./spinThread";
import { stitch } from "./stitch";
import React from "react";

type CraftInput = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export function craft<TProps = any>(input: CraftInput) {
  return (config: CraftConfig<TProps>): React.FC<TProps> => {
    const elementConfig: ElementConfig = {
      base: config.base,
    };

    // Add responsive styles
    if (config.responsive) {
      // If config.responsive has any of the breakpoint keys directly, treat as flat ResponsiveConfig
      const isFlat = Object.keys(config.responsive).some(key => ["sm", "md", "lg", "xl", "2xl"].includes(key));
      if (isFlat) {
        elementConfig.responsive = { base: config.responsive as ResponsiveConfig };
      } else {
        // Already in ResponsiveElementConfig shape
        elementConfig.responsive = config.responsive as any;
      }
    }

    // Add nested styles
    if (config.nested) {
      elementConfig.nested = stitch(config.nested);
    }

    // Add animation
    if (config.animation) {
      const animationClass = spinThread(config.animation);
      elementConfig.base = elementConfig.base
        ? `${elementConfig.base} ${animationClass}`
        : animationClass;
    }

    // Add dynamic classes
    if (config.dynamic) {
      elementConfig.dynamic = config.dynamic;
    }

    // Add variants
    if (config.variants) {
      const { hover, active, focus, disabled } = config.variants;
      if (hover) elementConfig.hover = hover;
      if (active) elementConfig.active = active;
      if (focus) elementConfig.focus = focus;
      if (disabled) elementConfig.disabled = disabled;
    }

    // Garantir que o componente retornado é tipado corretamente
    return createElement(input)(elementConfig) as React.FC<TProps>;
  };
}
