import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';

import { OnboardingScreen } from '@/features/onboarding';
import { SplashScreen } from '@/features/splash/screens/SplashScreen';
import { useTheme } from '@/theme';

import { AuthNavigator } from './AuthNavigator';
import { linking } from './linking';
import { navigationRef } from './navigationRef';
import { HomeStack } from './stacks/HomeStack';
import type { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root navigator. Owns the NavigationContainer, syncs React Navigation's theme
 * with our token colors, wires deep linking, and gates Splash -> Auth -> Main.
 */
export function RootNavigator() {
  const { isDark, colors } = useTheme();

  const navTheme: Theme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme : DefaultTheme).colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme} linking={linking}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <RootStack.Navigator
        screenOptions={{ headerShown: false, animation: 'none' }}
      >
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Main" component={HomeStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
