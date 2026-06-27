import { secureStorage, StorageKeys } from '@/storage';

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

/**
 * Reads/writes auth tokens in the ENCRYPTED MMKV instance. Centralizing token
 * access here means the API client and auth flow share one secure source of
 * truth, and secrets never touch redux-persist or plain storage.
 */
export const tokenStorage = {
  getAccessToken(): string | null {
    return secureStorage.getString(StorageKeys.AUTH_ACCESS_TOKEN) ?? null;
  },
  getRefreshToken(): string | null {
    return secureStorage.getString(StorageKeys.AUTH_REFRESH_TOKEN) ?? null;
  },
  setTokens({ accessToken, refreshToken }: AuthTokens): void {
    secureStorage.set(StorageKeys.AUTH_ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      secureStorage.set(StorageKeys.AUTH_REFRESH_TOKEN, refreshToken);
    }
  },
  clear(): void {
    secureStorage.remove(StorageKeys.AUTH_ACCESS_TOKEN);
    secureStorage.remove(StorageKeys.AUTH_REFRESH_TOKEN);
  },
  hasSession(): boolean {
    return Boolean(secureStorage.getString(StorageKeys.AUTH_ACCESS_TOKEN));
  },
};
