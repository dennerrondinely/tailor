# <img src="images/icon.png" alt="Tailor" height="40"/>

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dennerrondinely/tailor/ci.yml?branch=main)](https://github.com/dennerrondinely/tailor/actions)
[![npm version](https://img.shields.io/npm/v/%40dennerrondinely%2Ftailor.svg)](https://www.npmjs.com/package/@dennerrondinely/tailor)
[![npm downloads](https://img.shields.io/npm/dm/%40dennerrondinely%2Ftailor.svg)](https://www.npmjs.com/package/@dennerrondinely/tailor)
[![license](https://img.shields.io/github/license/dennerrondinely/tailor)](https://github.com/dennerrondinely/tailor/blob/main/LICENSE)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/@dennerrondinely/tailor)](https://bundlephobia.com/package/@dennerrondinely/tailor)

<div align="center">
  <img src="images/logo.png" alt="Tailor Logo" width="300" style="margin-bottom: 20px"/>
  <br/>
  <p><strong>Build typed, composable React components with Tailwind CSS — variants, polymorphic <code>as</code>, nested selectors, responsive, and animation. Zero runtime overhead.</strong></p>

  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/dennerrondinely/tailor/pulls)
</div>

---

## Features

- 🎯 **CVA-style semantic variants** with TypeScript inference — `variants`, `defaultVariants`, `compoundVariants`
- 🔀 **Polymorphic `as` prop** — change the rendered element without losing type safety
- 🪆 **CSS-like nested selectors** — target `h1`, `.class`, `[data-attr]`, `>` child, and descendant
- 📱 **Responsive breakpoints** — `sm`, `md`, `lg`, `xl`, `2xl` utilities
- 🎭 **Interactive state styles** — `hover`, `focus`, `active`, `disabled` in one call
- 🎬 **Animation helpers** — `spin`, `ping`, `pulse`, `bounce` with full control
- 💨 **Zero runtime overhead** — pure Tailwind class strings, no CSS-in-JS
- 🌲 **Tree-shakeable** — dual CJS/ESM, `sideEffects: false`
- 🧠 **Automatic `displayName`** — components show up correctly in React DevTools
- 🔷 **Fully typed** — complete TypeScript definitions included

---

## Installation

```bash
npm install @dennerrondinely/tailor
# or
yarn add @dennerrondinely/tailor
# or
pnpm add @dennerrondinely/tailor
```

> **Peer dependencies:** `react ^18.0.0` · `tailwindcss ^3.0.0`

---

## Quick Start

```tsx
import { craft } from '@dennerrondinely/tailor';

const Button = craft('button')({
  base: 'rounded font-medium transition-colors focus:outline-none',
  variants: {
    intent: {
      primary:   'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      danger:    'bg-red-500 text-white hover:bg-red-600',
    },
    size: {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
  compoundVariants: [
    { intent: 'primary', size: 'lg', className: 'shadow-lg' },
  ],
});

// Variant props are fully typed:
<Button intent="primary" size="lg">Save</Button>
<Button intent="danger">Delete</Button>
```

---

## API Reference

| Function | Alias | Description |
|---|---|---|
| `craft` | `styled` | Create a styled React component with full variant support |
| `stitch` | `nestedStyles` | CSS-like nested selectors for child elements |
| `tailorFit` | `responsive` | Responsive breakpoint utilities |
| `embroider` | `interactionStyles` | Hover / focus / active / disabled state styles |
| `spinThread` | `animation` | Animation class builder |
| `createElement` | `createComponent` | Low-level React element factory |

Both the canonical name and its alias are exported — use whichever reads better in your codebase.

---

## Core API

### `craft(input)(config)` · alias `styled`

The main building block. Accepts any HTML tag string or React component and returns a styled, fully-typed component.

```tsx
import { craft } from '@dennerrondinely/tailor';

// From an HTML tag
const Card = craft('div')({
  base: 'rounded-xl border bg-white shadow-sm p-6',
});

// From an existing React component
const StyledCard = craft(Card)({
  base: 'hover:shadow-md transition-shadow',
});
```

#### `config` properties

| Property | Type | Description |
|---|---|---|
| `base` | `string` | Classes always applied |
| `variants` | `Record<string, Record<string, string>>` | Named variant groups |
| `defaultVariants` | `Partial<InferVariantProps<V>>` | Fallback variant values |
| `compoundVariants` | `Array<{ ...keys, className }>` | Classes for specific variant combinations |
| `dynamic` | `Record<string, (props) => boolean>` | Prop-driven class conditions |
| `nested` | `NestedStyles` | Child element selectors (see `stitch`) |
| `responsive` | `ResponsiveConfig` | Breakpoint overrides (see `tailorFit`) |
| `animation` | `AnimationConfig` | Animation classes (see `spinThread`) |

---

### Variants

```tsx
import { craft } from '@dennerrondinely/tailor';

const Badge = craft('span')({
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  variants: {
    status: {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error:   'bg-red-100 text-red-800',
      info:    'bg-blue-100 text-blue-800',
    },
  },
  defaultVariants: { status: 'info' },
});

<Badge status="success">Deployed</Badge>
<Badge status="error">Failed</Badge>
```

#### Compound Variants

Apply extra classes only when a specific combination of variants is active:

```tsx
const Button = craft('button')({
  base: 'rounded font-medium',
  variants: {
    intent: { primary: 'bg-blue-500 text-white', outline: 'border border-blue-500 text-blue-500' },
    size:   { sm: 'px-2 py-1 text-sm', lg: 'px-6 py-3 text-lg' },
  },
  compoundVariants: [
    // Only when intent=primary AND size=lg
    { intent: 'primary', size: 'lg', className: 'shadow-lg tracking-wide' },
  ],
  defaultVariants: { intent: 'primary', size: 'sm' },
});
```

---

### Polymorphic `as` Prop

Every `craft` component accepts an `as` prop that changes the rendered element while keeping props typed correctly.

```tsx
const Button = craft('button')({
  base: 'rounded px-4 py-2 font-medium bg-blue-500 text-white',
});

// Renders a <button>
<Button>Click me</Button>

// Renders an <a> — href, target, rel become available
<Button as="a" href="/dashboard">Go to dashboard</Button>

// Renders a Next.js Link
import Link from 'next/link';
<Button as={Link} href="/about">About</Button>
```

---

### Dynamic Prop-Driven Classes

For fine-grained control when variants aren't enough:

```tsx
interface LoaderProps {
  loading?: boolean;
  disabled?: boolean;
}

const Loader = craft('button')<LoaderProps>()({
  base: 'px-4 py-2 rounded transition-all',
  dynamic: {
    'opacity-50 cursor-not-allowed': (p) => !!p.disabled,
    'animate-pulse':                 (p) => !!p.loading,
    'bg-blue-500 text-white':        (p) => !p.disabled,
  },
});
```

---

### `stitch(styles)` · alias `nestedStyles`

Generates Tailwind classes for child elements using CSS-like selectors:

| Selector | Example | Matches |
|---|---|---|
| HTML tag | `'h1'` | `<h1>` inside the component |
| Class | `'.icon'` | Elements with `class="icon"` |
| Attribute | `'[data-active=true]'` | Elements with that data attribute |
| Direct child | `'> span'` | Immediate `<span>` children only |
| Descendant | `'p a'` | `<a>` anywhere inside a `<p>` |

```tsx
import { stitch } from '@dennerrondinely/tailor';

const Article = craft('article')({
  base: 'prose max-w-3xl mx-auto',
  nested: stitch({
    'h1':         'text-3xl font-bold mb-4',
    'h2':         'text-2xl font-semibold mb-3',
    'p':          'mb-4 text-gray-700 leading-relaxed',
    'p > a':      'text-blue-500 underline hover:text-blue-700',
    'ul':         'list-disc pl-6 mb-4',
    'li':         'mb-1',
    'blockquote': 'border-l-4 border-gray-300 pl-4 italic text-gray-600',
    'pre':        'bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto',
    'code':       'font-mono text-sm',
    '[data-highlighted]': 'bg-yellow-100 rounded px-1',
  }),
});
```

---

### `tailorFit(config)` · alias `responsive`

Generates responsive breakpoint classes:

```tsx
import { tailorFit } from '@dennerrondinely/tailor';

const Container = craft('div')({
  base: 'mx-auto',
  responsive: tailorFit({
    sm:    'max-w-sm px-4',
    md:    'max-w-md px-6',
    lg:    'max-w-4xl px-8',
    xl:    'max-w-6xl',
    '2xl': 'max-w-7xl',
  }),
});
```

Or inline in `craft`:

```tsx
const Grid = craft('div')({
  base: 'grid gap-4',
  responsive: {
    sm: 'grid-cols-1',
    md: 'grid-cols-2',
    lg: 'grid-cols-3',
  },
});
```

---

### `embroider(config)` · alias `interactionStyles`

Groups interaction state classes into a single readable object:

```tsx
import { embroider } from '@dennerrondinely/tailor';

const buttonStates = embroider({
  base:     'transition-colors duration-150',
  hover:    'hover:bg-blue-600',
  active:   'active:bg-blue-700 active:scale-95',
  focus:    'focus:ring-2 focus:ring-blue-400 focus:outline-none',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
});

const Button = craft('button')({
  base: `bg-blue-500 text-white px-4 py-2 rounded ${buttonStates}`,
});
```

---

### `spinThread(config)` · alias `animation`

Builds animation class strings from a structured config:

```tsx
import { spinThread } from '@dennerrondinely/tailor';

// Simple
const spin  = spinThread({ type: 'spin' });   // 'animate-spin'
const pulse = spinThread({ type: 'pulse' });  // 'animate-pulse'

// Full control
const bounce = spinThread({
  type:      'bounce',
  duration:  '700',
  delay:     '150',
  iteration: 'infinite',
  direction: 'alternate',
  timing:    'ease-in-out',
});

const Spinner = craft('div')({
  base: `w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent ${spin}`,
});
```

---

## Export Aliases

Every helper ships with a plain-English alias for teams that prefer descriptive imports:

```tsx
import {
  styled,            // craft
  nestedStyles,      // stitch
  responsive,        // tailorFit
  interactionStyles, // embroider
  animation,         // spinThread
  createComponent,   // createElement
} from '@dennerrondinely/tailor';
```

---

## TypeScript

### Infer Variant Props

```tsx
import { craft, InferVariantProps } from '@dennerrondinely/tailor';

const buttonVariants = {
  intent: { primary: '...', secondary: '...' },
  size:   { sm: '...', md: '...', lg: '...' },
} as const;

const Button = craft('button')({ base: '...', variants: buttonVariants });

// Inferred: { intent?: 'primary' | 'secondary'; size?: 'sm' | 'md' | 'lg' }
type ButtonVariants = InferVariantProps<typeof buttonVariants>;
```

### Polymorphic Component Types

```tsx
import { PolymorphicProps, TailorComponent } from '@dennerrondinely/tailor';

// PolymorphicProps<C, OwnProps> merges element props + own props, resolves conflicts
type ButtonAsAnchor = PolymorphicProps<'a', { intent?: 'primary' | 'secondary' }>;
```

### Extending a `craft` Component

```tsx
const Base = craft('div')({ base: 'p-4 rounded' });

// Wrap the already-styled component to layer more classes
const Card = craft(Base)({ base: 'shadow-md bg-white' });
```

---

## Examples

### Card with variants

```tsx
const Card = craft('div')({
  base: 'rounded-xl p-6 transition-shadow',
  variants: {
    elevation: {
      flat:     'border border-gray-200',
      raised:   'shadow-md',
      floating: 'shadow-xl',
    },
    intent: {
      default: 'bg-white',
      muted:   'bg-gray-50',
      accent:  'bg-blue-50 border border-blue-100',
    },
  },
  defaultVariants: { elevation: 'raised', intent: 'default' },
});

<Card elevation="floating" intent="accent">Featured</Card>
```

### Navigation with active state

```tsx
const NavLink = craft('a')({
  base: 'px-3 py-2 rounded text-sm font-medium transition-colors',
  variants: {
    active: {
      true:  'bg-gray-900 text-white',
      false: 'text-gray-300 hover:bg-gray-700 hover:text-white',
    },
  },
  defaultVariants: { active: 'false' },
});

<NavLink href="/home" active="true">Home</NavLink>
<NavLink href="/about">About</NavLink>
```

### Polymorphic card (renders as `<article>`)

```tsx
const Card = craft('div')({
  base: 'rounded-xl bg-white shadow-sm p-6',
});

<Card as="article">
  <h2>Post Title</h2>
  <p>Content here.</p>
</Card>
```

---

## Contributing

Contributions are welcome!

```bash
# Clone and install
git clone https://github.com/dennerrondinely/tailor.git
cd tailor
pnpm install

# Run tests
pnpm test

# Build
pnpm build
```

### Creating a changeset

This project uses [Changesets](https://github.com/changesets/changesets) for versioning:

```bash
pnpm changeset   # describe your change
pnpm version     # bump versions + update CHANGELOG.md
pnpm release     # build + publish to npm
```

---

<div align="center" style="margin: 60px 0; padding: 40px; background: linear-gradient(to right, #f3f4f6, #e5e7eb, #f3f4f6); border-radius: 16px;">
  <img src="images/icon.png" alt="Tailor" height="100" style="filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));"/>
  <br/>
  <p style="margin-top: 20px; font-size: 1.1em; color: #374151;">Crafted with love for React developers</p>
</div>

## License

MIT &copy; [Denner Rondinely](https://github.com/dennerrondinely)
