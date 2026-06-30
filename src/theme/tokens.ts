/**
 * Design tokens — the single source of truth for the entire design system.
 *
 * Colors are defined once as RGB channel tuples for both light and dark schemes.
 * From those we derive:
 *   - `cssVars`  -> consumed by NativeWind's `vars()` so Tailwind classes like
 *                   `bg-background` resolve to the active theme at runtime.
 *   - `colors`   -> `rgb(...)` strings for imperative use (StatusBar, navigation
 *                   theme, SVG fills) where className is not available.
 *
 * Non-color tokens (spacing, radius, typography, shadow, opacity, motion) are
 * theme-independent and shared everywhere. Nothing in the app should hardcode a
 * raw value — always reference a token.
 */

export type ColorTuple = readonly [number, number, number];

export type SemanticColorName =
  | 'primary'
  | 'primaryContent'
  | 'secondary'
  | 'accent'
  | 'background'
  | 'surface'
  | 'surfaceMuted'
  | 'text'
  | 'textMuted'
  | 'border'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

type ColorScale = Record<SemanticColorName, ColorTuple>;

const lightColorTuples: ColorScale = {
  primary: [79, 70, 229],
  primaryContent: [255, 255, 255],
  secondary: [13, 148, 136],
  accent: [245, 158, 11],
  background: [255, 255, 255],
  surface: [248, 250, 252],
  surfaceMuted: [241, 245, 249],
  text: [17, 24, 39],
  textMuted: [107, 114, 128],
  border: [226, 232, 240],
  success: [22, 163, 74],
  warning: [217, 119, 6],
  error: [220, 38, 38],
  info: [2, 132, 199],
};

const darkColorTuples: ColorScale = {
  primary: [129, 140, 248],
  primaryContent: [17, 24, 39],
  secondary: [45, 212, 191],
  accent: [251, 191, 36],
  background: [15, 23, 42],
  surface: [30, 41, 59],
  surfaceMuted: [51, 65, 85],
  text: [248, 250, 252],
  textMuted: [148, 163, 184],
  border: [51, 65, 85],
  success: [74, 222, 128],
  warning: [251, 191, 36],
  error: [248, 113, 113],
  info: [56, 189, 248],
};

/** Maps a semantic color name to its CSS-variable name (see global.css). */
const CSS_VAR_NAME: Record<SemanticColorName, string> = {
  primary: '--color-primary',
  primaryContent: '--color-primary-content',
  secondary: '--color-secondary',
  accent: '--color-accent',
  background: '--color-background',
  surface: '--color-surface',
  surfaceMuted: '--color-surface-muted',
  text: '--color-text',
  textMuted: '--color-text-muted',
  border: '--color-border',
  success: '--color-success',
  warning: '--color-warning',
  error: '--color-error',
  info: '--color-info',
};

const toCssVars = (scale: ColorScale): Record<string, string> => {
  const vars: Record<string, string> = {};
  (Object.keys(scale) as SemanticColorName[]).forEach(name => {
    const [r, g, b] = scale[name];
    vars[CSS_VAR_NAME[name]] = `${r} ${g} ${b}`;
  });
  return vars;
};

const toColorStrings = (
  scale: ColorScale,
): Record<SemanticColorName, string> => {
  const out = {} as Record<SemanticColorName, string>;
  (Object.keys(scale) as SemanticColorName[]).forEach(name => {
    const [r, g, b] = scale[name];
    out[name] = `rgb(${r}, ${g}, ${b})`;
  });
  return out;
};

export const themeVars = {
  light: toCssVars(lightColorTuples),
  dark: toCssVars(darkColorTuples),
} as const;

export const themeColors = {
  light: toColorStrings(lightColorTuples),
  dark: toColorStrings(darkColorTuples),
} as const;

export type ThemeColors = Record<SemanticColorName, string>;

/** 4px-based spacing scale. */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const radius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  '2xl': 28,
  full: 9999,
} as const;

/**
 * DM Sans font families. These map to the bundled static TTFs (see
 * assets/fonts + react-native.config.js). Reference an explicit family per
 * weight/style — do NOT combine with `fontWeight`/`fontStyle`, which would make
 * Android try to synthesize a style and fall back to the system font.
 */
export const fontFamily = {
  regular: 'DMSans-Regular',
  medium: 'DMSans-Medium',
  semibold: 'DMSans-SemiBold',
  bold: 'DMSans-Bold',
  italic: 'DMSans-Italic',
  mediumItalic: 'DMSans-MediumItalic',
  boldItalic: 'DMSans-BoldItalic',
  // Lato — used by specific design elements (e.g. calendar legend labels).
  latoRegular: 'Lato-Regular',
  latoMedium: 'Lato-Medium',
} as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;

export const opacity = {
  disabled: 0.4,
  muted: 0.6,
  pressed: 0.85,
  full: 1,
} as const;

/** Motion tokens for Reanimated / Animated timings. */
export const motion = {
  duration: {
    instant: 120,
    fast: 200,
    base: 300,
    slow: 450,
  },
  easing: {
    standard: [0.2, 0, 0, 1] as const,
    decelerate: [0, 0, 0.2, 1] as const,
    accelerate: [0.4, 0, 1, 1] as const,
  },
} as const;

/** Cross-platform elevation presets (iOS shadow + Android elevation). */
export const shadow = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
