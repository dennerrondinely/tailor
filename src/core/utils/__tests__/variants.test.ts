import { resolveVariants } from '../variants';
import type { ResolvedVariantsConfig } from '../../../types';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const buttonConfig: ResolvedVariantsConfig = {
  variants: {
    intent: {
      primary:   'bg-blue-500 text-white',
      secondary: 'bg-gray-100 text-gray-900',
      danger:    'bg-red-500 text-white',
    },
    size: {
      sm: 'text-sm px-2 py-1',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
  compoundVariants: [
    { intent: 'primary', size: 'lg', className: 'shadow-lg' },
    { intent: 'danger',  size: 'sm', className: 'font-bold' },
  ],
};

// ---------------------------------------------------------------------------
// Per-group resolution
// ---------------------------------------------------------------------------

describe('resolveVariants – per-group classes', () => {
  it('resolves explicit variant values', () => {
    const result = resolveVariants(buttonConfig, { intent: 'secondary', size: 'lg' });
    expect(result).toContain('bg-gray-100 text-gray-900');
    expect(result).toContain('text-lg px-6 py-3');
  });

  it('falls back to defaultVariants when a prop is not provided', () => {
    const result = resolveVariants(buttonConfig, {});
    expect(result).toContain('bg-blue-500 text-white');   // intent default = primary
    expect(result).toContain('text-base px-4 py-2');       // size default = md
  });

  it('explicit prop overrides defaultVariant', () => {
    const result = resolveVariants(buttonConfig, { intent: 'danger' });
    expect(result).toContain('bg-red-500 text-white');
    expect(result).not.toContain('bg-blue-500');
  });

  it('returns empty string when no variants and no defaults', () => {
    const result = resolveVariants(
      { variants: { intent: { primary: 'bg-blue-500' } } },
      {}
    );
    expect(result).toBe('');
  });

  it('ignores unknown variant values gracefully', () => {
    const result = resolveVariants(buttonConfig, { intent: 'ghost' as any });
    // 'ghost' does not exist → fall through, but size default should still apply
    expect(result).toContain('text-base px-4 py-2');
    expect(result).not.toContain('ghost');
  });
});

// ---------------------------------------------------------------------------
// Compound variants
// ---------------------------------------------------------------------------

describe('resolveVariants – compound variants', () => {
  it('applies compound class when all conditions match', () => {
    const result = resolveVariants(buttonConfig, { intent: 'primary', size: 'lg' });
    expect(result).toContain('shadow-lg');
  });

  it('does NOT apply compound class when conditions only partially match', () => {
    const result = resolveVariants(buttonConfig, { intent: 'primary', size: 'sm' });
    expect(result).not.toContain('shadow-lg');
  });

  it('applies the correct compound class for a different combination', () => {
    const result = resolveVariants(buttonConfig, { intent: 'danger', size: 'sm' });
    expect(result).toContain('font-bold');
  });

  it('evaluates compound conditions against defaultVariants', () => {
    // intent defaults to 'primary'; explicitly set size to 'lg' → compound matches
    const result = resolveVariants(buttonConfig, { size: 'lg' });
    expect(result).toContain('shadow-lg');
  });

  it('no compound classes when no conditions match', () => {
    const result = resolveVariants(buttonConfig, { intent: 'secondary', size: 'sm' });
    expect(result).not.toContain('shadow-lg');
    expect(result).not.toContain('font-bold');
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('resolveVariants – edge cases', () => {
  it('handles config with no defaultVariants', () => {
    const config: ResolvedVariantsConfig = {
      variants: { color: { red: 'text-red-500', blue: 'text-blue-500' } },
    };
    expect(resolveVariants(config, { color: 'red' })).toContain('text-red-500');
    expect(resolveVariants(config, {})).toBe('');
  });

  it('handles config with no compoundVariants', () => {
    const config: ResolvedVariantsConfig = {
      variants: { size: { sm: 'text-sm', lg: 'text-lg' } },
      defaultVariants: { size: 'sm' },
    };
    expect(resolveVariants(config, {})).toBe('text-sm');
  });

  it('handles empty variants object', () => {
    const config: ResolvedVariantsConfig = { variants: {} };
    expect(resolveVariants(config, { anything: 'value' })).toBe('');
  });
});
