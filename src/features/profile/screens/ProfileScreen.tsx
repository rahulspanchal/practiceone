import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import { Button, Screen, Typography } from '@/components/atoms';
import { tokenStorage } from '@/features/auth/services/tokenStorage';
import type { RootStackParamList } from '@/navigation/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { loggedOut } from '@/store/slices/authSlice';
import { clearProfile } from '@/store/slices/userSlice';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const userId = useAppSelector(state => state.auth.userId);

  const handleLogout = useCallback(() => {
    tokenStorage.clear();
    dispatch(clearProfile());
    dispatch(loggedOut());
    navigation.replace('Auth', { screen: 'Login' });
  }, [dispatch, navigation]);

  const openMenu = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return (
    <Screen>
      <View className="flex-1">
        <Typography variant="h1">Profile</Typography>
        <View className="mt-6 rounded-xl bg-surface p-4">
          <Typography variant="title">
            {profile?.fullName ?? 'Guest user'}
          </Typography>
          <Typography variant="body" color="muted" className="mt-1">
            {profile?.email ?? userId ?? 'Not signed in'}
          </Typography>
        </View>

        <View className="mt-auto gap-2">
          <Button
            label="Open menu"
            variant="outline"
            fullWidth
            onPress={openMenu}
          />
          <Button
            label="Log out"
            variant="primary"
            fullWidth
            onPress={handleLogout}
          />
        </View>
      </View>
    </Screen>
  );
}
