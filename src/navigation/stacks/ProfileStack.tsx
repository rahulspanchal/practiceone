import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';

import type { ProfileStackParamList } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
