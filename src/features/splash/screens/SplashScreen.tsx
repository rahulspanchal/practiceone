import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
 * The scene is sized once from `Dimensions.get('window')` (the visible app
 * window, not the full physical display) and rendered on the very first frame —
 * so the radial glow is centred in the visible area, renders identically on
 * every launch, and there is no blank/peach intermediate frame (which would read
 * as a second, different splash flashing in).
 *
 * `driver` runs an invisible looping native-thread animation hidden behind the
 * opaque base fill. It is purely load-bearing: a fully static surface can fail
 * to present on software-GPU emulators, leaving a blank screen. Driving frames
 * on the UI thread guarantees the scene paints, with nothing visible.
 */
export function SplashScreen() {
  const navigation = useNavigation<Nav>();
  const driver = useRef(new Animated.Value(0)).current;
  const [{ width, height }] = useState(() => Dimensions.get('window'));

  // Logo size is derived once and kept as a stable style object. A *new* inline
  // style object on every render makes Android treat the <Image> as changed and
  // reload its bitmap — and each reload replays the platform fade-in, which is
  // exactly the "logo blink after ~1s". A frozen object + fadeDuration={0}
  // guarantees the logo is painted once and never re-animates.
  const logoStyle = useMemo(() => {
    const logoWidth = width * 0.62;
    return { width: logoWidth, height: logoWidth / LOGO_ASPECT };
  }, [width]);

  useEffect(() => {
    // A single long, non-looping ramp keeps the UI thread compositing frames for
    // the whole splash. It must NOT loop: a loop resets the value periodically,
    // and that reset visibly flashes the surface on some emulators (the "logo
    // blink after ~1s"). 30s comfortably outlasts the 2.2s splash.
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
      {/* Scene centered in the window so the glow always sits dead-centre of the
          visible area. Rendered on the first frame (no layout gate). */}
      <View style={styles.scene} pointerEvents="none">
        <SplashBackground width={width} height={height} />
        <Image
          source={logo}
          resizeMode="contain"
          fadeDuration={0}
          style={logoStyle}
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
    right: 0,
    bottom: 0,
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
