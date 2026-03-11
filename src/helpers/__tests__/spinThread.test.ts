import { spinThread } from '../spinThread';

describe('spinThread', () => {
  // -------------------------------------------------------------------------
  // Base animation type
  // -------------------------------------------------------------------------
  it.each([
    ['spin',   'animate-spin'],
    ['ping',   'animate-ping'],
    ['pulse',  'animate-pulse'],
    ['bounce', 'animate-bounce'],
    ['none',   'animate-none'],
  ] as const)('type "%s" produces "%s"', (type, expected) => {
    expect(spinThread({ type })).toContain(expected);
  });

  // -------------------------------------------------------------------------
  // Default duration
  // -------------------------------------------------------------------------
  it('applies default duration-500 when no duration is provided', () => {
    expect(spinThread({ type: 'spin' })).toContain('duration-500');
  });

  it('applies the specified duration', () => {
    expect(spinThread({ type: 'spin', duration: '1000' })).toContain('duration-1000');
  });

  // -------------------------------------------------------------------------
  // Delay
  // -------------------------------------------------------------------------
  it('applies delay when provided', () => {
    expect(spinThread({ type: 'spin', delay: '200' })).toContain('delay-200');
  });

  it('does not include a delay class when delay is omitted', () => {
    expect(spinThread({ type: 'spin' })).not.toMatch(/delay-/);
  });

  // -------------------------------------------------------------------------
  // Iteration count — was broken (emitted bare 'infinite')
  // -------------------------------------------------------------------------
  it('emits the correct arbitrary class for infinite iteration', () => {
    const result = spinThread({ type: 'spin', iteration: 'infinite' });
    expect(result).toContain('[animation-iteration-count:infinite]');
    // Must NOT emit the invalid bare class
    expect(result.split(' ')).not.toContain('infinite');
  });

  it('does not add an iteration class for once (default)', () => {
    const result = spinThread({ type: 'spin', iteration: 'once' });
    expect(result).not.toContain('animation-iteration-count');
  });

  // -------------------------------------------------------------------------
  // Direction — was broken (emitted bare 'reverse')
  // -------------------------------------------------------------------------
  it('emits the correct arbitrary class for reverse direction', () => {
    const result = spinThread({ type: 'spin', direction: 'reverse' });
    expect(result).toContain('[animation-direction:reverse]');
    // Must NOT emit the invalid bare class
    expect(result.split(' ')).not.toContain('reverse');
  });

  it('does not add a direction class for normal (CSS default)', () => {
    const result = spinThread({ type: 'spin', direction: 'normal' });
    expect(result).not.toContain('animation-direction');
  });

  // -------------------------------------------------------------------------
  // Timing function
  // -------------------------------------------------------------------------
  it.each([
    ['linear',     'ease-linear'],
    ['ease-in',    'ease-in'],
    ['ease-out',   'ease-out'],
    ['ease-in-out','ease-in-out'],
  ] as const)('timing "%s" produces "%s"', (timing, expected) => {
    expect(spinThread({ type: 'spin', timing })).toContain(expected);
  });

  it('does not add a timing class when timing is omitted', () => {
    const result = spinThread({ type: 'spin' });
    expect(result).not.toMatch(/ease-/);
  });

  // -------------------------------------------------------------------------
  // Full configuration
  // -------------------------------------------------------------------------
  it('produces the correct full class string with all options', () => {
    const result = spinThread({
      type: 'pulse',
      duration: '1000',
      delay: '200',
      iteration: 'infinite',
      direction: 'reverse',
      timing: 'ease-in-out',
    });
    expect(result).toBe(
      'animate-pulse duration-1000 delay-200 [animation-iteration-count:infinite] [animation-direction:reverse] ease-in-out'
    );
  });
});
 