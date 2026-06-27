import { vars, useColorScheme as useNativeWindColorScheme } from 'nativewind';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

import { appStorage, StorageKeys } from '@/storage';

import { themeColors, themeVars, type ThemeColors } from './tokens';

/** User-selectable preference. `system` follows the device setting. */
export type ThemeMode = 'light' | 'dark' | 'system';
/** Resolved scheme actually applied to the UI. */
export type ColorScheme = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  scheme: ColorScheme;
  isDark: boolean;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const readInitialMode = (): ThemeMode => {
  const stored = appStorage.getString(StorageKeys.THEME_MODE);
  return stored === 'light' || stored === 'dark' || stored === 'system'
    ? stored
    : 'system';
};

/**
 * Provides theme state to the whole app and applies the active token set.
 *
 * We drive colors through NativeWind's `vars()` (applied on a root view that
 * cascades to all children) and keep NativeWind's own color scheme in sync so
 * any `dark:` variant utilities also behave correctly.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(readInitialMode);

  useEffect(() => {
    setColorScheme(mode);
  }, [mode, setColorScheme]);

  const scheme: ColorScheme = colorScheme === 'dark' ? 'dark' : 'light';

  const setMode = useCallback((next: ThemeMode) => {
    appStorage.set(StorageKeys.THEME_MODE, next);
    setModeState(next);
  }, []);

  const toggle = useCallback(() => {
    setMode(scheme === 'dark' ? 'light' : 'dark');
  }, [scheme, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      scheme,
      isDark: scheme === 'dark',
      colors: themeColors[scheme],
      setMode,
      toggle,
    }),
    [mode, scheme, setMode, toggle],
  );

  const activeVars = useMemo(() => vars(themeVars[scheme]), [scheme]);

  return (
    <ThemeContext.Provider value={value}>
      <View style={[styles.root, activeVars]}>{children}</View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
