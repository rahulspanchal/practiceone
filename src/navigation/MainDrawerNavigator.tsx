import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { AboutScreen } from '@/features/settings/screens/AboutScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
import { useTheme } from '@/theme';

import { MainTabNavigator } from './MainTabNavigator';
import type { MainDrawerParamList } from './types';

const Drawer = createDrawerNavigator<MainDrawerParamList>();

/**
 * Authenticated container. The drawer wraps the bottom tabs and exposes
 * secondary destinations (Settings, About). Theme tokens drive its colors.
 */
export function MainDrawerNavigator() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.surface },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="Tabs"
        component={MainTabNavigator}
        options={{ title: 'Home', headerShown: false }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}
