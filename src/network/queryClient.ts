import { QueryClient } from '@tanstack/react-query';

/**
 * App-wide TanStack Query client. Sensible production defaults: a couple of
 * retries, a short stale window, and no refetch-on-focus (which is noisy on
 * mobile). Server state lives here; Redux is reserved for client/UI state.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
