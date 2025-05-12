import { stitch } from '../stitch';

describe('stitch', () => {
  it('should convert nested styles to object', () => {
    const result = stitch({ h1: 'text-2xl', p: 'text-base' });
    expect(result).toEqual({ h1: 'text-2xl', p: 'text-base' });
  });

  it('should return empty object for empty input', () => {
    const result = stitch({});
    expect(result).toEqual({});
  });
}); 