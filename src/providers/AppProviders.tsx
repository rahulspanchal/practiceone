import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { queryClient } from '@/network';
import { persistor, store } from '@/store';
import { ThemeProvider } from '@/theme';

/**
 * Composes every cross-cutting provider in the correct order so feature code can
 * stay focused. Order matters:
 *  Gesture root -> ErrorBoundary -> Redux -> PersistGate -> Query -> SafeArea
 *  -> Theme -> app.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider>
                <ThemeProvider>{children}</ThemeProvider>
              </SafeAreaProvider>
            </QueryClientProvider>
          </PersistGate>
        </ReduxProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

const styles = { flex: { flex: 1 } } as const;
