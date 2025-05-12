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

export function craft(input: CraftInput) {
  return (config: CraftConfig) => {
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

    return createElement(input)(elementConfig);
  };
}
