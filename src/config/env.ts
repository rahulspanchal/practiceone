import Config from 'react-native-config';

/**
 * Typed, centralized access to environment variables.
 *
 * Raw values come from `react-native-config`, which injects the correct `.env`
 * file at native build time (development / staging / production). Reading them
 * through this single module keeps env access typed, defaulted, and easy to mock
 * in tests — components never touch `process.env` or `Config` directly.
 */
export type AppEnvironment = 'development' | 'staging' | 'production';

const APP_ENV = (Config.APP_ENV as AppEnvironment) ?? 'development';

export const Env = {
  APP_ENV,
  API_BASE_URL: Config.API_BASE_URL ?? 'https://api.practiceone.dev',
  API_TIMEOUT: Number(Config.API_TIMEOUT ?? 15000),
  SENTRY_DSN: Config.SENTRY_DSN ?? '',
  ENABLE_SENTRY: (Config.ENABLE_SENTRY ?? 'false') === 'true',
  MMKV_ENCRYPTION_KEY: Config.MMKV_ENCRYPTION_KEY ?? 'practiceone.dev.key',
} as const;

export const isDevelopment = APP_ENV === 'development';
export const isStaging = APP_ENV === 'staging';
export const isProduction = APP_ENV === 'production';
