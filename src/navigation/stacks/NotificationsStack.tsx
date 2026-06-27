import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { NotificationsScreen } from '@/features/notifications/screens/NotificationsScreen';

import type { NotificationsStackParamList } from '../types';

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

export function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationsHome"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
