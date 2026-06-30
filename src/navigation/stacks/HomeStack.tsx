import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { DetailsScreen } from '@/features/home/screens/DetailsScreen';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { MyScheduleScreen } from '@/features/home/screens/MyScheduleScreen';
import { SessionDetailsScreen } from '@/features/home/screens/SessionDetailsScreen';

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
      <Stack.Screen
        name="MySchedule"
        component={MyScheduleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SessionDetails"
        component={SessionDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
