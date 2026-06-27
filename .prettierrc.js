/**
 * Prettier config. The Tailwind plugin auto-sorts NativeWind `className` strings
 * into Tailwind's canonical order for consistent, reviewable diffs.
 */
module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
};
