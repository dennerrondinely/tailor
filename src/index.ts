// ---------------------------------------------------------------------------
// Core API — canonical names
// ---------------------------------------------------------------------------
export * from './types';
export * from './helpers/tailorFit';
export * from './helpers/embroider';
export * from './helpers/spinThread';
export * from './helpers/craft';
export * from './helpers/stitch';
export * from './core/element';

// ---------------------------------------------------------------------------
// Descriptive aliases — friendlier names for onboarding
//
// These are 1-to-1 re-exports of the canonical functions. Both names are
// always available; pick whichever reads better in context.
//
// Canonical → Alias
// ─────────────────────────────────────────────────────────────────────────
//  craft          → styled          (familiar to styled-components users)
//  stitch         → nestedStyles    (communicates intent clearly)
//  tailorFit      → responsive      (plain English)
//  embroider      → interactionStyles (plain English)
//  spinThread     → animation       (plain English)
//  createElement  → createComponent (avoids confusion with React's own API)
// ---------------------------------------------------------------------------

export {
  /** Alias for {@link craft} — familiar to styled-components users. */
  craft as styled,
} from './helpers/craft';

export {
  /** Alias for {@link stitch} — maps CSS-like selectors to Tailwind classes for child elements. */
  stitch as nestedStyles,
} from './helpers/stitch';

export {
  /** Alias for {@link tailorFit} — responsive Tailwind classes per breakpoint. */
  tailorFit as responsive,
} from './helpers/tailorFit';

export {
  /** Alias for {@link embroider} — interaction-state classes (hover / active / focus / disabled). */
  embroider as interactionStyles,
} from './helpers/embroider';

export {
  /** Alias for {@link spinThread} — generates Tailwind animation class strings. */
  spinThread as animation,
} from './helpers/spinThread';

export {
  /**
   * Alias for {@link createElement} — creates a styled component for a given
   * HTML tag or React component without the full `craft()` API surface.
   *
   * Named `createComponent` to avoid confusion with `React.createElement`.
   */
  createElement as createComponent,
} from './core/element';
