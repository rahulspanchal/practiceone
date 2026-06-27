import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import { Env } from '@/config';
import { tokenStorage } from '@/features/auth/services/tokenStorage';

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

/**
 * Single configured Axios instance for the whole app.
 *
 * Responsibilities:
 *  - inject the bearer access token on every request,
 *  - on a 401, transparently refresh the token once and replay the request,
 *  - de-duplicate concurrent refreshes so we only hit the refresh endpoint once.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: Env.API_BASE_URL,
  timeout: Env.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Single in-flight refresh shared by all queued requests.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) {
    return null;
  }
  try {
    // Use a bare axios call to avoid recursive interceptors.
    const { data } = await axios.post<{
      accessToken: string;
      refreshToken?: string;
    }>(`${Env.API_BASE_URL}/auth/refresh`, { refreshToken });
    tokenStorage.setTokens(data);
    return data.accessToken;
  } catch {
    tokenStorage.clear();
    return null;
  }
}

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = error.config as RetriableRequest | undefined;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      refreshPromise = refreshPromise ?? refreshAccessToken();
      const newToken = await refreshPromise;
      refreshPromise = null;

      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      }
    }

    return Promise.reject(error);
  },
);
