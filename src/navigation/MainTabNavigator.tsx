import Ionicons from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { HomeStack } from './stacks/HomeStack';
import { NotificationsStack } from './stacks/NotificationsStack';
import { ProfileStack } from './stacks/ProfileStack';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = { color: string; size: number };

// Defined at module scope so they are stable across renders (avoids recreating
// component types on every render).
const renderHomeIcon = ({ color, size }: TabIconProps) => (
  <Ionicons name="home-outline" color={color} size={size} />
);
const renderAlertsIcon = ({ color, size }: TabIconProps) => (
  <Ionicons name="notifications-outline" color={color} size={size} />
);
const renderProfileIcon = ({ color, size }: TabIconProps) => (
  <Ionicons name="person-outline" color={color} size={size} />
);

/**
 * Bottom tabs. Each tab hosts its own native stack (see ./stacks). Colors come
 * from theme tokens so the tab bar adapts to light/dark automatically.
 */
export function MainTabNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Reserve the row for icons/labels, then add the device's bottom inset
  // (gesture pill / nav bar) so nothing is clipped or overlapped.
  const baseBarHeight = Platform.select({ ios: 50, default: 58 }) ?? 58;
  const bottomInset = insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: Platform.OS === 'android' ? 4 : 0,
        },
        tabBarItemStyle: {
          paddingTop: 6,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: baseBarHeight + bottomInset,
          paddingBottom: bottomInset + 6,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: 'Home', tabBarIcon: renderHomeIcon }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsStack}
        options={{ title: 'Alerts', tabBarIcon: renderAlertsIcon }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: 'Profile', tabBarIcon: renderProfileIcon }}
      />
    </Tab.Navigator>
  );
}
