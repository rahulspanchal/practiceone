import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';

import { tokenStorage } from '@/features/auth/services/tokenStorage';
import type { RootStackParamList } from '@/navigation/types';

import { SplashView } from '../components/SplashView';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

/**
 * Branded splash. The visual is the shared `SplashView` (also used by
 * `PersistGate` during cold-start rehydration), so the splash is continuous from
 * the first JS frame with no remount/logo flash. This screen only adds the auth
 * check + routing and the invisible frame driver.
 *
 * `driver` runs an invisible native-thread animation hidden behind the opaque
 * base fill. It is purely load-bearing: a fully static surface can fail to
 * present on software-GPU emulators, leaving a blank screen. Driving frames on
 * the UI thread guarantees the scene paints, with nothing visible.
 */
export function SplashScreen() {
  const navigation = useNavigation<Nav>();
  const driver = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(driver, {
      toValue: 1,
      duration: 30000,
      useNativeDriver: true,
    });
    anim.start();

    const timer = setTimeout(() => {
      if (tokenStorage.hasSession()) {
        navigation.replace('Main', { screen: 'HomeFeed' });
      } else {
        navigation.replace('Onboarding');
      }
    }, 2200);

    return () => {
      anim.stop();
      clearTimeout(timer);
    };
  }, [navigation, driver]);

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.frameDriver,
          {
            transform: [
              {
                translateX: driver.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 80],
                }),
              },
            ],
          },
        ]}
      />
      <SplashView />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  frameDriver: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: 60,
    height: 60,
    backgroundColor: '#000',
  },
});
