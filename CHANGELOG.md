# @dennerrondinely/tailor

## 0.2.0

### Minor Changes

- [`e472a9a`](https://github.com/dennerrondinely/tailor/commit/e472a9a0ce702477c8e7324ea1344266707b9c06) - Add test coverage for `element.ts` and `classes.ts` core utilities

## 0.1.0

### Minor Changes

#### `feat(polymorphic)` — Polymorphic `as` prop ([`f9ba6e3`](https://github.com/dennerrondinely/tailor/commit/f9ba6e3))

Components created with `craft()` now accept an `as` prop to render as any HTML element or React component at runtime, with full ref forwarding.

```tsx
const Button = craft('button')({ base: 'rounded px-4 py-2' });

// Render as an anchor — gets href, target, rel…
<Button as="a" href="/go">Go</Button>

// Render as a custom router component
<Button as={Link} to="/dashboard">Dashboard</Button>
```

New exported types: `AsProp<C>`, `PropsOf<C>`, `PolymorphicProps<C, OwnProps>`, `PolymorphicComponent<DefaultTag, OwnProps>`, `TailorComponent<OwnProps>`.

---

#### `feat(variants)` — CVA-style semantic variants ([`0771bd1`](https://github.com/dennerrondinely/tailor/commit/0771bd1))

`craft()` now accepts a `variants` key (plus `defaultVariants` and `compoundVariants`) inspired by [cva](https://cva.style). Variant props are fully inferred by TypeScript.

```tsx
const Button = craft("button")({
  base: "rounded font-medium transition-colors",
  variants: {
    intent: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      danger: "bg-red-600  text-white hover:bg-red-700",
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-5 py-2.5",
    },
  },
  defaultVariants: { intent: "primary", size: "md" },
  compoundVariants: [{ intent: "primary", size: "lg", className: "shadow-md" }],
});

// intent and size are fully typed
<Button intent="danger" size="lg">
  Delete
</Button>;
```

New exported types: `VariantDefinition`, `InferVariantProps<V>`, `CompoundVariant<V>`, `ResolvedVariantsConfig`.

---

#### `feat(nested)` — Real CSS-like selector engine for nested styles ([`fb0cf71`](https://github.com/dennerrondinely/tailor/commit/fb0cf71))

`stitch()` / the `nested` config key now supports a full selector engine that traverses the React children tree at render time.

| Pattern        | Example              | Matches                                      |
| -------------- | -------------------- | -------------------------------------------- |
| HTML tag       | `'h1'`               | Any `<h1>` in the subtree                    |
| CSS class      | `'.icon'`            | Elements whose `className` includes `"icon"` |
| Data attribute | `'[data-slot=icon]'` | `data-slot="icon"` attribute                 |
| Direct child   | `'ul > li'`          | `<li>` that is a direct child of `<ul>`      |
| Descendant     | `'ul li'`            | Any `<li>` inside `<ul>`                     |
| Combination    | `'ul > li.active'`   | Combined tag + class + combinator            |

```tsx
const Article = craft("article")({
  nested: stitch({
    h1: "text-2xl font-bold mb-3",
    "p>a": "text-blue-600 underline",
    "[data-slot=icon]": "w-5 h-5 text-gray-500",
  }),
});
```

---

### Patch Changes

#### `build` — Dual CJS/ESM output via tsup, `sideEffects: false` ([`7475e58`](https://github.com/dennerrondinely/tailor/commit/7475e58))

- Migrated build tooling from raw `tsc` to **tsup** (esbuild-based).
- Now ships **CJS** (`dist/index.js`) + **ESM** (`dist/index.mjs`) + **DTS** (`dist/index.d.ts` / `.d.mts`).
- Added `"sideEffects": false` for full tree-shaking support.
- Added `"exports"` field with `import` / `require` / `types` conditions.

#### `fix(spinThread)` — Correct Tailwind classes for infinite/reverse animation ([`4e42907`](https://github.com/dennerrondinely/tailor/commit/4e42907))

- `iteration: 'infinite'` now emits `[animation-iteration-count:infinite]` (was bare `'infinite'`, which is not a valid Tailwind class).
- `direction: 'reverse'` now emits `[animation-direction:reverse]`.
- `direction: 'normal'` no longer emits any class (CSS default, no override needed).

#### `dx` — Automatic `displayName` + full JSDoc on all helpers ([`cb6a0a6`](https://github.com/dennerrondinely/tailor/commit/cb6a0a6))

- Components created with `craft()` or `createElement()` now automatically receive a `displayName` of the form `Tailor(InputName)`, visible in React DevTools and error stack traces.
- All public helpers (`craft`, `stitch`, `tailorFit`, `embroider`, `spinThread`) have comprehensive JSDoc with usage tables and `@example` blocks.

#### `dx(exports)` — Descriptive export aliases ([`a9a272e`](https://github.com/dennerrondinely/tailor/commit/a9a272e))

All canonical helpers now have plain-English aliases. Both names are exported and tree-shakeable:

| Canonical       | Alias               |
| --------------- | ------------------- |
| `craft`         | `styled`            |
| `stitch`        | `nestedStyles`      |
| `tailorFit`     | `responsive`        |
| `embroider`     | `interactionStyles` |
| `spinThread`    | `animation`         |
| `createElement` | `createComponent`   |

```tsx
// both are valid
import { craft, stitch } from "@dennerrondinely/tailor";
import { styled, nestedStyles } from "@dennerrondinely/tailor";
```
