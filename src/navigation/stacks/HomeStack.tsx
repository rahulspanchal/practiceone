import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { DetailsScreen } from '@/features/home/screens/DetailsScreen';
import { HomeScreen } from '@/features/home/screens/HomeScreen';

import type { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/** Each bottom tab owns an independent native stack for deep, isolated history. */
export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeFeed"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}
