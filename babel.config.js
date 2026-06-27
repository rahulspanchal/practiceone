/**
 * Babel configuration.
 *
 * - `@react-native/babel-preset`: the RN transform pipeline.
 * - `nativewind/babel`: enables Tailwind className -> style transform.
 * - `module-resolver`: powers absolute imports (`@/...`) so we never write
 *   fragile relative paths like `../../../theme`.
 * - `react-native-worklets/plugin`: required by Reanimated v4. It MUST be the
 *   last plugin in the list.
 */
module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: { '@': './src' },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
          '.jpg',
          '.jpeg',
          '.gif',
          '.webp',
          '.svg',
        ],
      },
    ],
    'react-native-worklets/plugin',
  ],
};
