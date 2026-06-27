import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from '@/navigation/types';

import { OnboardingBackground } from '../components/OnboardingBackground';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { onboardingSlides } from '../data/slides';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Size {
  width: number;
  height: number;
}

/**
 * Onboarding flow. A horizontally paged carousel of athlete "splash" slides; the
 * circular button advances to the next slide and, on the last one, routes into
 * the auth flow. The brand backdrop sits behind the pager (full screen), while
 * the pager itself lives inside the safe area and is sized from the *measured*
 * viewport so each slide is bounded and the athlete photo auto-fits the height.
 */
export function OnboardingScreen() {
  const navigation = useNavigation<Nav>();
  const [screen] = useState(() => Dimensions.get('window'));
  const [viewport, setViewport] = useState<Size | null>(null);
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  // Invisible looping native-thread animation. Identical to the splash trick:
  // a fully static surface can fail to composite on software-GPU emulators,
  // leaving a blank screen; driving frames guarantees the scene paints.
  const driver = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(driver, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [driver]);

  const onViewportLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setViewport({ width, height });
  }, []);

  const goToAuth = useCallback(() => {
    navigation.replace('Auth', { screen: 'Login' });
  }, [navigation]);

  const handleNext = useCallback(() => {
    if (!viewport) {
      return;
    }
    if (index < onboardingSlides.length - 1) {
      const next = index + 1;
      listRef.current?.scrollToOffset({
        offset: next * viewport.width,
        animated: true,
      });
      setIndex(next);
    } else {
      goToAuth();
    }
  }, [index, viewport, goToAuth]);

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!viewport) {
        return;
      }
      setIndex(Math.round(e.nativeEvent.contentOffset.x / viewport.width));
    },
    [viewport],
  );

  // Auto-advance: every 2s move to the next slide; after the last one, go to
  // Login. Re-arms whenever `index` changes, so a manual arrow tap (or swipe)
  // resets the countdown instead of double-advancing.
  useEffect(() => {
    if (!viewport) {
      return;
    }
    const timer = setTimeout(() => {
      if (index < onboardingSlides.length - 1) {
        const next = index + 1;
        listRef.current?.scrollToOffset({
          offset: next * viewport.width,
          animated: true,
        });
        setIndex(next);
      } else {
        goToAuth();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [index, viewport, goToAuth]);

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
          styles.driver,
          {
            transform: [
              {
                translateX: driver.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 6],
                }),
              },
            ],
          },
        ]}
      />
      <OnboardingBackground width={screen.width} height={screen.height} />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.fill} onLayout={onViewportLayout}>
          {viewport ? (
            <FlatList
              ref={listRef}
              data={onboardingSlides}
              keyExtractor={item => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onMomentumEnd}
              renderItem={({ item, index: i }) => (
                <OnboardingSlide
                  slide={item}
                  width={viewport.width}
                  height={viewport.height}
                  isLast={i === onboardingSlides.length - 1}
                  onNext={handleNext}
                />
              )}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4BE87',
  },
  safe: {
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  driver: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 2,
    height: 2,
    opacity: 0.02,
    backgroundColor: '#000',
  },
});
