import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Centralized, strongly-typed param lists for every navigator. The global
 * augmentation at the bottom makes `useNavigation`/`useRoute` fully typed across
 * the app without passing generics at each call site.
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OtpVerification: { email: string };
};

export type HomeStackParamList = {
  HomeFeed: undefined;
  Details: { id: string };
  MySchedule: undefined;
  SessionDetails: undefined;
};

export type NotificationsStackParamList = {
  NotificationsHome: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  NotificationsTab: NavigatorScreenParams<NotificationsStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainDrawerParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  Settings: undefined;
  About: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<HomeStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
