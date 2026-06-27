import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import type { RootStackParamList } from './types';

/**
 * Imperative navigation handle for use OUTSIDE React components (e.g. the API
 * client forcing a logout on an unrecoverable 401). Inside components, prefer
 * the `useNavigation` hook.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function resetToAuth(): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace('Auth', { screen: 'Login' }));
  }
}
