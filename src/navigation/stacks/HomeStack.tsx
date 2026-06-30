import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AssessmentReportScreen } from '@/features/home/screens/AssessmentReportScreen';
import { DetailsScreen } from '@/features/home/screens/DetailsScreen';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { MyScheduleScreen } from '@/features/home/screens/MyScheduleScreen';
import { MyProfileScreen } from '@/features/home/screens/MyProfileScreen';
import { SessionDetailsScreen } from '@/features/home/screens/SessionDetailsScreen';
import { SettingsScreen } from '@/features/home/screens/SettingsScreen';

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
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AssessmentReport"
        component={AssessmentReportScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
