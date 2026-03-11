import React from 'react';
import { twMerge } from 'tailwind-merge';
import { NestedStyles } from '../../types';

/**
 * Supported selector segment types:
 *
 * | Pattern              | Example            | Matches                                   |
 * |----------------------|--------------------|-------------------------------------------|
 * | HTML tag             | `h1`               | `<h1>`                                    |
 * | Class                | `.icon`            | elements with className containing "icon" |
 * | Data attribute       | `[data-slot=icon]` | elements with data-slot="icon"            |
 * | Data attribute exist | `[data-active]`    | elements with data-active present         |
 * | Child combinator     | `p>a`              | `<a>` that is a direct child of `<p>`     |
 * | Descendant combinator| `ul li`            | `<li>` anywhere inside `<ul>`             |
 */

type SelectorSegment = {
  tag?: string;
  classes: string[];
  dataAttrs: Array<{ key: string; value?: string }>;
};

/**
 * Parses a single, non-combinator selector token into its constituent parts.
 * e.g. "div.foo[data-slot=bar]" → { tag: 'div', classes: ['foo'], dataAttrs: [{ key: 'slot', value: 'bar' }] }
 */
function parseSegment(raw: string): SelectorSegment {
  const segment: SelectorSegment = { classes: [], dataAttrs: [] };

  // Extract data attributes: [data-key] or [data-key=value]
  const dataAttrRegex = /\[data-([^\]=]+)(?:=([^\]]+))?\]/g;
  let match: RegExpExecArray | null;
  while ((match = dataAttrRegex.exec(raw)) !== null) {
    segment.dataAttrs.push({ key: match[1], value: match[2] });
  }

  // Remove data attributes from the string for further parsing
  const withoutAttrs = raw.replace(/\[[^\]]*\]/g, '');

  // Extract class selectors: .foo.bar
  const classParts = withoutAttrs.split('.');
  // The first part (before any dot) is the tag, if present
  const tagPart = classParts[0];
  if (tagPart) {
    segment.tag = tagPart.toLowerCase();
  }
  segment.classes = classParts.slice(1).filter(Boolean);

  return segment;
}

/**
 * Tokenises a full selector string into an array of { segment, combinator } pairs.
 * Combinators supported: '>' (direct child) and ' ' (descendant, implicit).
 *
 * e.g. "ul > li.item" → [
 *   { segment: { tag: 'ul', ... }, combinator: '>' },
 *   { segment: { tag: 'li', classes: ['item'], ... }, combinator: null },
 * ]
 */
type ParsedSelector = Array<{ segment: SelectorSegment; combinator: '>' | ' ' | null }>;

function parseSelector(selector: string): ParsedSelector {
  // Normalise whitespace around '>'
  const normalised = selector.replace(/\s*>\s*/g, '>').trim();
  const result: ParsedSelector = [];

  // Split by '>' first, then handle spaces within segments
  // We'll process token by token
  const tokens = normalised.split(/(>)/);
  let pendingCombinator: '>' | ' ' | null = null;

  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;

    if (trimmed === '>') {
      pendingCombinator = '>';
      continue;
    }

    // A token may still contain spaces (descendant combinator)
    const spaceParts = trimmed.split(/\s+/);
    for (let i = 0; i < spaceParts.length; i++) {
      const part = spaceParts[i];
      if (!part) continue;
      result.push({
        segment: parseSegment(part),
        combinator: i === 0 ? pendingCombinator : ' ',
      });
      pendingCombinator = null;
    }
  }

  return result;
}

/**
 * Checks if a React element matches a single selector segment.
 */
function elementMatchesSegment(
  element: React.ReactElement<any>,
  segment: SelectorSegment
): boolean {
  const { tag, classes, dataAttrs } = segment;

  // Match HTML tag / component displayName
  if (tag) {
    const elementTag =
      typeof element.type === 'string'
        ? element.type.toLowerCase()
        : (element.type as any)?.displayName?.toLowerCase() ||
          (element.type as any)?.name?.toLowerCase();

    if (!elementTag || elementTag !== tag) return false;
  }

  // Match CSS classes
  if (classes.length > 0) {
    const elementClasses: string[] = (element.props.className || '')
      .split(/\s+/)
      .filter(Boolean);
    if (!classes.every(c => elementClasses.includes(c))) return false;
  }

  // Match data-* attributes
  for (const { key, value } of dataAttrs) {
    const propKey = `data-${key}`;
    const propValue = element.props[propKey];
    if (propValue === undefined || propValue === null) return false;
    if (value !== undefined && String(propValue) !== value) return false;
  }

  return true;
}

/**
 * Recursively walks the React children tree and injects className for nodes that
 * match the given parsed selector chain, starting at `segmentIndex` in the chain.
 *
 * @param children   - The children to traverse
 * @param chain      - Full parsed selector chain
 * @param chainIndex - Current position in the chain (which segment we are trying to match)
 * @param classes    - Tailwind classes to inject when the full chain matches
 */
function applyChain(
  children: React.ReactNode,
  chain: ParsedSelector,
  chainIndex: number,
  classes: string
): React.ReactNode {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) return child;

    const element = child as React.ReactElement<any>;
    const currentItem = chain[chainIndex];
    const currentSegment = currentItem.segment;

    const isMatch = elementMatchesSegment(element, currentSegment);
    const isLastSegment = chainIndex === chain.length - 1;

    let updatedElement = element;

    if (isMatch && isLastSegment) {
      // Full chain matched — inject classes
      const mergedClass = twMerge(element.props.className || '', classes);
      updatedElement = React.cloneElement(element, { className: mergedClass });
    } else if (isMatch && !isLastSegment) {
      // Partial match — descend into children for the next segment
      if (element.props.children) {
        const newChildren = applyChain(
          element.props.children,
          chain,
          chainIndex + 1,
          classes
        );
        updatedElement = React.cloneElement(element, { children: newChildren });
      }
    }

    // Descendant combinator (' '): even if this node didn't match the current
    // segment, keep descending into its children looking for it — UNLESS the
    // combinator for the current segment is '>' (direct child only).
    if (!isMatch && element.props.children) {
      const combinator = currentItem.combinator;
      if (combinator !== '>') {
        const newChildren = applyChain(
          element.props.children,
          chain,
          chainIndex,
          classes
        );
        updatedElement = React.cloneElement(updatedElement, {
          children: newChildren,
        });
      }
    }

    return updatedElement;
  });
}

/**
 * Applies all nested style selectors to a React children tree.
 *
 * For each selector in `nestedStyles`, it parses the selector, then walks the
 * tree injecting the corresponding Tailwind classes onto matching nodes.
 *
 * @param children     - The root children to transform
 * @param nestedStyles - Map of selector → Tailwind class string
 */
export function applyNestedStyles(
  children: React.ReactNode,
  nestedStyles: NestedStyles
): React.ReactNode {
  let result = children;

  for (const [selector, classes] of Object.entries(nestedStyles)) {
    if (!selector || !classes) continue;
    const chain = parseSelector(selector);
    if (chain.length === 0) continue;
    result = applyChain(result, chain, 0, classes);
  }

  return result;
}
