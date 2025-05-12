import { embroider } from '../embroider';

describe('embroider', () => {
  it('should return base and hover classes', () => {
    const result = embroider({ base: 'foo', hover: 'bar' });
    expect(result.base).toBe('foo');
    expect(result.hover).toBe('bar');
  });

  it('should handle missing hover', () => {
    const result = embroider({ base: 'foo' });
    expect(result.base).toBe('foo');
    expect(result.hover).toBeUndefined();
  });
}); 