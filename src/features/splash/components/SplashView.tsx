import React, { useMemo } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

const logo = require('@/assets/images/legaxy-logo.png');
const background = require('@/assets/images/splash-background.png');

// Intrinsic size of the trimmed logo asset; used to preserve aspect ratio.
const LOGO_ASPECT = 699 / 233;

/**
 * Pure presentational splash (full-bleed peach backdrop image + centred logo)
 * with NO navigation, timers, or state. It is rendered in two places that must look
 * pixel-identical so there is never a flash between them:
 *
 *  1. As `PersistGate`'s `loading` element — shown during redux-persist's async
 *     rehydration on cold start (~0.5s). Without this the gate renders a blank,
 *     and when rehydration finishes the real splash mounts and the logo bitmap
 *     loads, which reads as the logo "loading again / blinking" ~0.5s in.
 *  2. Inside `SplashScreen` once the navigator mounts.
 *
 * Because the logo bitmap is decoded during (1) it stays in the image memory
 * cache, so when (2) mounts the same bitmap it paints instantly. `fadeDuration`
 * is 0 so the platform never replays its fade-in. Net effect: the splash visual
 * is continuous from the very first JS frame, with no remount flash.
 */
export function SplashView() {
  const [{ width, height }] = React.useState(() => Dimensions.get('window'));

  const logoStyle = useMemo(() => {
    const logoWidth = width * 0.62;
    return { width: logoWidth, height: logoWidth / LOGO_ASPECT };
  }, [width]);

  return (
    <View style={styles.root} pointerEvents="none">
      <View style={styles.baseFill} />
      <ImageBackground
        source={background}
        resizeMode="cover"
        fadeDuration={0}
        style={[styles.scene, { width, height }]}
      >
        <Image
          source={logo}
          resizeMode="contain"
          fadeDuration={0}
          style={logoStyle}
        />
      </ImageBackground>
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
  baseFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAE0C4',
  },
});
