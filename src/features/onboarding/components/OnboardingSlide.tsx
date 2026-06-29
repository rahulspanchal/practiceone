import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { fontFamily } from '@/theme';

import type { OnboardingSlideData } from '../data/slides';

const RUST = '#BE522F';

const NEXT_BTN = require('@/assets/images/next-button.png');
const NEXT_ARROW = require('@/assets/images/next-arrow.png');
const BTN_IMG = 75;

interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  width: number;
  height: number;
  isLast: boolean;
  onNext: () => void;
}

export function OnboardingSlide({
  slide,
  width,
  height,
  isLast,
  onNext,
}: OnboardingSlideProps) {
  const ribbonWidth = width * 1.4;
  const cardLift = Math.round(height * 0.06);
  // Give the athlete cut-out a concrete height instead of `flex: 1`. A flex
  // child can momentarily collapse to 0 while the paged list re-measures (e.g.
  // as Android insets settle), and a 0-height <Image> renders nothing — which
  // is why the body sometimes vanished. Deriving from the slide height keeps it
  // stable across those reflow frames.
  const photoHeight = Math.max(340, Math.round(height * 0.46));

  return (
    <View style={[styles.slide, { width, height }]}>
      <View style={styles.ribbonWrap}>
        <View style={[styles.ribbon, { width: ribbonWidth }]}>
          <Text style={styles.name}>{slide.name}</Text>
          <Text style={styles.role}>{slide.role}</Text>
        </View>
      </View>

      <Image
        source={slide.image}
        style={[styles.photo, { height: photoHeight }]}
        resizeMode="contain"
      />

      <View style={styles.spacer} pointerEvents="none" />

      <View style={[styles.cardStack, { marginBottom: cardLift }]}>
        <View style={styles.backCard2} pointerEvents="none" />
        <View style={styles.backCard1} pointerEvents="none" />
        <View style={styles.card}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isLast ? 'Get started' : 'Next'}
            onPress={onNext}
            style={({ pressed }) => [
              styles.nextWrap,
              pressed && styles.nextWrapPressed,
            ]}
          >
            <Image
              source={NEXT_BTN}
              style={styles.nextImg}
              resizeMode="contain"
            />
            <View style={styles.chevronWrap} pointerEvents="none">
              <Image
                source={NEXT_ARROW}
                style={styles.arrowImg}
                resizeMode="contain"
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
    // Clip the over-wide tilted ribbon so it bleeds cleanly to the screen edges
    // instead of poking a stray white "strap" out past the right edge.
    overflow: 'hidden',
  },
  ribbonWrap: {
    width: '100%',
    alignItems: 'center',
    overflow: 'visible',
    marginTop: 24,
    zIndex: 2,
  },
  ribbon: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    alignItems: 'center',
    transform: [{ rotate: '-6deg' }],
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 32,
    fontFamily: fontFamily.boldItalic,
    color: RUST,
    textAlign: 'center',
  },
  role: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: '#A8693F',
    textAlign: 'center',
  },
  photo: {
    width: '100%',
    marginTop: 0,
    marginBottom: -10,
    zIndex: 1,
  },
  spacer: {
    flex: 1,
  },
  cardStack: {
    width: '100%',
    transform: [{ translateY: 20 }],
    zIndex: 3,
  },
  backCard2: {
    position: 'absolute',
    left: 28,
    right: 28,
    top: -28,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    opacity: 0.85,
  },
  backCard1: {
    position: 'absolute',
    left: 14,
    right: 14,
    top: -14,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    opacity: 0.95,
  },
  card: {
    width: '100%',
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 39,
    paddingBottom: 0,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamily.bold,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 0,
  },
  description: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: fontFamily.regular,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0,
  },
  nextWrap: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    marginLeft: -(BTN_IMG / 2),
    width: BTN_IMG,
    height: BTN_IMG,
  },
  nextWrapPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  nextImg: {
    position: 'absolute',
    top: 10,
    right: '-12%',
    width: BTN_IMG,
    height: BTN_IMG,
  },
  chevronWrap: {
    position: 'absolute',
    top: 10,
    right: '-13%',
    width: BTN_IMG,
    height: BTN_IMG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowImg: {
    width: 13,
    height: 22,
  },
});
