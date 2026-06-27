/**
 * Centralized storage keys. Keeping every key in one typed object prevents typos
 * and collisions and makes it easy to see everything we persist on device.
 */
export const StorageKeys = {
  THEME_MODE: 'theme.mode',
  LANGUAGE: 'settings.language',
  ONBOARDED: 'app.onboarded',
  // Secrets (stored in the encrypted MMKV instance):
  AUTH_ACCESS_TOKEN: 'auth.accessToken',
  AUTH_REFRESH_TOKEN: 'auth.refreshToken',
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
