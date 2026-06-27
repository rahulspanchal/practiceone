import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { tokenStorage } from '@/features/auth/services/tokenStorage';
import type { RootStackParamList } from '@/navigation/types';

import { SplashBackground } from '../components/SplashBackground';

const logo = require('@/assets/images/legaxy-logo.png');

// Intrinsic size of the trimmed logo asset; used to preserve aspect ratio.
const LOGO_ASPECT = 699 / 233;

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

/**
 * Branded splash. The logo and backdrop are shown immediately at full opacity
 * (no entrance animation), then the initial auth check routes the user onward.
 *
 * The window size is captured once on mount (not via `useWindowDimensions`,
 * which re-fires as Android insets settle) and the whole scene is laid out in a
 * fixed-size absolute layer, so it is positioned once and never reflows/jumps.
 *
 * `driver` runs an invisible looping native-thread animation hidden behind the
 * opaque base fill. It is purely load-bearing: a fully static surface can fail
 * to present on software-GPU emulators, leaving a blank screen. Driving frames
 * on the UI thread guarantees the scene paints, with nothing visible.
 */
export function SplashScreen() {
  const navigation = useNavigation<Nav>();
  // 'screen' (full physical display) is captured once so the backdrop always
  // covers the whole surface, including under the status/navigation bars.
  const [{ width, height }] = useState(() => Dimensions.get('screen'));
  const driver = useRef(new Animated.Value(0)).current;

  const logoWidth = width * 0.62;
  const logoHeight = logoWidth / LOGO_ASPECT;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(driver, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    );
    loop.start();

    const timer = setTimeout(() => {
      if (tokenStorage.hasSession()) {
        navigation.replace('Main', {
          screen: 'Tabs',
          params: { screen: 'HomeTab', params: { screen: 'HomeFeed' } },
        });
      } else {
        navigation.replace('Onboarding');
      }
    }, 2200);

    return () => {
      loop.stop();
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
      {/* Invisible frame driver: a real (non-culled) view that animates on the
          UI thread to keep the surface presenting. It is drawn behind the
          opaque base fill below, so the user never sees it. */}
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
      {/* Opaque base that always covers the frame driver. */}
      <View style={styles.baseFill} pointerEvents="none" />
      {/* Fixed-size, centered scene so nothing ever reflows. */}
      <View style={[styles.scene, { width, height }]} pointerEvents="none">
        <SplashBackground width={width} height={height} />
        <Image
          source={logo}
          resizeMode="contain"
          style={{ width: logoWidth, height: logoHeight }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameDriver: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: 60,
    height: 60,
    backgroundColor: '#000',
  },
  baseFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F4BE87',
  },
});
