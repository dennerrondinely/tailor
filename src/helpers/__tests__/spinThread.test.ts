import { spinThread } from '../spinThread';

describe('spinThread', () => {
  it('should return correct class for spin animation', () => {
    const result = spinThread({ type: 'spin' });
    expect(result).toContain('animate-spin');
  });

  it('should return animate-none duration-500 for none', () => {
    const result = spinThread({ type: 'none' });
    expect(result).toBe('animate-none duration-500');
  });
}); 