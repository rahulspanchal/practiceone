import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  ForgotPasswordScreen,
  LoginScreen,
  OtpVerificationScreen,
  RegisterScreen,
} from '@/features/auth';

import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

/** Unauthenticated flow. Header hidden — screens render their own headers. */
export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
    </Stack.Navigator>
  );
}
