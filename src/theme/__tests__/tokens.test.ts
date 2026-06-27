import { themeColors, themeVars } from '../tokens';

describe('theme tokens', () => {
  it('exposes light and dark CSS variable sets with matching keys', () => {
    expect(Object.keys(themeVars.light)).toEqual(Object.keys(themeVars.dark));
  });

  it('derives rgb color strings for imperative use', () => {
    expect(themeColors.light.primary).toMatch(/^rgb\(/);
    expect(themeColors.dark.background).toMatch(/^rgb\(/);
  });
});
