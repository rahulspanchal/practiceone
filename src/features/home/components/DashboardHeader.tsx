import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

const LOGO = require('@/assets/images/gd-goenka-logo.png');
const BELL = require('@/assets/images/notification-bell.png');
const AVATAR = require('@/assets/images/dashboard-avatar.png');

interface DashboardHeaderProps {
  onPressNotifications?: () => void;
  onPressAvatar?: () => void;
}

/**
 * Main Dashboard top bar: the school logo on the left and a 104x48 action group
 * on the right holding the notification bell (with its unread dot) and the user
 * avatar, laid out horizontally with an 8px gap per the design spec.
 */
export function DashboardHeader({
  onPressNotifications,
  onPressAvatar,
}: DashboardHeaderProps) {
  return (
    <View style={styles.row}>
      <Image source={LOGO} style={styles.logo} resizeMode="contain" />

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={6}
          android_ripple={{
            color: 'rgba(0,0,0,0.08)',
            borderless: true,
            radius: 24,
          }}
          onPress={onPressNotifications}
          style={styles.iconButton}
        >
          <Image source={BELL} style={styles.bell} resizeMode="contain" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile"
          onPress={onPressAvatar}
          style={styles.avatarButton}
        >
          <Image source={AVATAR} style={styles.avatar} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  logo: {
    height: 48,
    aspectRatio: 86 / 50,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 48,
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bell: {
    width: 24,
    height: 24,
  },
  avatarButton: {
    width: 48,
    height: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
