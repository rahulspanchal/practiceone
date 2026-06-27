import type { LinkingOptions } from '@react-navigation/native';

import type { RootStackParamList } from './types';

/**
 * Deep-linking configuration. Ready for universal links / app links; add the
 * native scheme + associated domains in the iOS/Android projects to activate.
 */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['practiceone://', 'https://app.practiceone.com'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
          ForgotPassword: 'forgot-password',
          OtpVerification: 'verify',
        },
      },
      Main: {
        screens: {
          HomeFeed: 'home',
          Details: 'item/:id',
        },
      },
    },
  },
};
