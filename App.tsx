import './global.css';

import React from 'react';

import { RootNavigator } from '@/navigation';
import { AppProviders } from '@/providers';

/**
 * App root. Composition only: all cross-cutting concerns live in AppProviders,
 * and all routing lives in RootNavigator. This keeps the entry point tiny and
 * declarative.
 */
function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

export default App;
