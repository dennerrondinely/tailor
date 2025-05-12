import { tailorFit } from '../tailorFit';

describe('tailorFit', () => {
  it('should return the same object if no props', () => {
    const input = { sm: 'foo', md: 'bar' };
    const result = tailorFit(input);
    expect(result).toEqual(input);
  });

  it('should handle empty object', () => {
    const result = tailorFit({});
    expect(result).toEqual({});
  });
}); 