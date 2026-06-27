import { createMMKV, type MMKV } from 'react-native-mmkv';
import type { Storage as ReduxPersistStorage } from 'redux-persist';

import { Env } from '@/config';

/**
 * MMKV storage instances.
 *
 * MMKV is synchronous and ~30x faster than AsyncStorage, which makes it ideal as
 * both our general key-value store and the redux-persist backend.
 *
 * - `appStorage`    : general, non-sensitive data (theme, language, flags).
 * - `secureStorage` : encrypted instance for secrets (auth tokens). The key is
 *                     injected from the environment, never hardcoded.
 */
export const appStorage: MMKV = createMMKV({ id: 'practiceone-app' });

export const secureStorage: MMKV = createMMKV({
  id: 'practiceone-secure',
  encryptionKey: Env.MMKV_ENCRYPTION_KEY,
});

/**
 * redux-persist storage adapter backed by MMKV. redux-persist expects an async
 * API, so we wrap MMKV's synchronous calls in resolved promises.
 */
export const reduxPersistStorage: ReduxPersistStorage = {
  setItem: (key, value) => {
    appStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = appStorage.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: key => {
    appStorage.remove(key);
    return Promise.resolve();
  },
};
