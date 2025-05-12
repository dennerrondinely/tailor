import {
  ElementConfig,
  ResponsiveConfig,
  VariantConfig,
  AnimationConfig,
} from "../types";
import { createElement } from "../core/element";
import { tailorFit } from "./tailorFit";
import { spinThread } from "./spinThread";
import { stitch } from "./stitch";
import React from "react";

type CraftConfig = {
  base?: string;
  variants?: VariantConfig;
  responsive?: ResponsiveConfig;
  nested?: {
    [key: string]: string;
  };
  animation?: AnimationConfig;
};

type CraftInput = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export function craft(input: CraftInput) {
  return (config: CraftConfig) => {
    const elementConfig: ElementConfig = {
      base: config.base,
    };

    // Add variants
    if (config.variants) {
      Object.entries(config.variants).forEach(([variant, styles]) => {
        Object.entries(styles).forEach(([value, className]) => {
          if (variant === "hover") elementConfig.hover = className;
          if (variant === "active") elementConfig.active = className;
          if (variant === "focus") elementConfig.focus = className;
          if (variant === "disabled") elementConfig.disabled = className;
        });
      });
    }

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

    return createElement(input)(elementConfig);
  };
}
