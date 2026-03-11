import { NestedStyles } from '../types';

/**
 * Defines nested styles for child elements within a `craft()` component.
 *
 * Keys are CSS-like selectors resolved at render time against the React
 * children tree. Values are Tailwind class strings that will be merged
 * onto matching elements via `twMerge`.
 *
 * ## Supported selectors
 *
 * | Pattern                  | Example                  | Matches                                        |
 * |--------------------------|--------------------------|------------------------------------------------|
 * | HTML tag                 | `'h1'`                   | Any `<h1>` in the subtree                      |
 * | CSS class                | `'.icon'`                | Elements whose `className` contains `"icon"`   |
 * | Data attribute (value)   | `'[data-slot=icon]'`     | Elements with `data-slot="icon"`               |
 * | Data attribute (present) | `'[data-active]'`        | Elements with a `data-active` prop             |
 * | Direct child             | `'p>a'` / `'p > a'`     | `<a>` that is a **direct** child of `<p>`      |
 * | Descendant               | `'ul li'`                | `<li>` **anywhere** inside `<ul>`              |
 * | Combined                 | `'ul > li.active'`       | `<li className="active">` direct child of `<ul>` |
 *
 * @example
 * ```tsx
 * const Article = craft('article')({
 *   base: 'prose',
 *   nested: stitch({
 *     'h1':               'text-3xl font-bold mb-4',
 *     'h2':               'text-2xl font-semibold mb-3',
 *     'p':                'mb-4 leading-relaxed',
 *     'p>a':              'text-blue-500 hover:underline',
 *     'ul li':            'list-disc ml-4 mb-1',
 *     '.highlight':       'bg-yellow-100 px-1 rounded',
 *     '[data-slot=icon]': 'w-5 h-5 inline-block',
 *   }),
 * });
 * ```
 */
export function stitch(styles: NestedStyles): NestedStyles {
  return styles;
}

export default stitch;
