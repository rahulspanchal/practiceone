import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { fontFamily } from '@/theme';

const ARYAN = require('@/assets/images/aryan-saxena.png');

const TITLE = '#012233';
const SUBTITLE = '#606060';
const GLOW = '#BE522F';

const CARD_HEIGHT = 96;
// The profile-photo media block (from the Figma "Image Header" component): a
// 172x80 frame with concentric peach circles behind a 73x75 photo.
const MEDIA_W = 150;
const MEDIA_H = 80;

interface StudentCardProps {
  name?: string;
  meta?: string;
  onPress?: () => void;
}

/** Concentric peach glow + profile photo anchored to the card's bottom-right. */
function PhotoGlow() {
  return (
    <View style={styles.media} pointerEvents="none">
      <Svg width={172} height={MEDIA_H} style={styles.glow}>
        <Circle cx={94.9} cy={39.95} r={64.93} fill={GLOW} fillOpacity={0.17} />
        <Circle cx={94.9} cy={39.95} r={80.45} fill={GLOW} fillOpacity={0.1} />
        <Circle cx={83} cy={40} r={83} fill={GLOW} fillOpacity={0.07} />
      </Svg>
      <Image source={ARYAN} style={styles.photo} resizeMode="contain" />
    </View>
  );
}

/**
 * Student row card (e.g. "Aryan Saxena"): a white rounded panel with the name +
 * grade/section on the left and the 3D profile photo over a soft peach glow on
 * the right.
 */
export function StudentCard({
  name = 'Aryan Saxena',
  meta = 'Grade 8 . Section A',
  onPress,
}: StudentCardProps) {
  return (
    <View style={styles.shadowWrap}>
      <Pressable style={styles.card} onPress={onPress}>
        <View style={styles.texts}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{meta}</Text>
        </View>
        <PhotoGlow />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#323247',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  card: {
    position: 'relative',
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  texts: {
    gap: 4,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: TITLE,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: SUBTITLE,
  },
  media: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: MEDIA_W,
    height: MEDIA_H,
  },
  glow: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  photo: {
    position: 'absolute',
    right: 36,
    bottom: 0,
    width: 73,
    height: 75,
  },
});
