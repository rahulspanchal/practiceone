import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { fontFamily } from '@/theme';

const FEATURED = require('@/assets/images/featured-refresh.png');

const TITLE = '#101828';
const SUBTITLE = '#606060';
const CARD_BORDER = '#F2F4F6';

interface EmptyScheduleCardProps {
  title?: string;
  subtitle?: string;
}

/**
 * Empty-state card (Figma "Term yet to Start!"): a centered featured icon with
 * a title + supporting line, shown when the selected sport has no sessions.
 */
export function EmptyScheduleCard({
  title = 'Term yet to Start!',
  subtitle = 'Your schedule will appear once the new term begins.',
}: EmptyScheduleCardProps) {
  return (
    <View style={styles.card}>
      <Image source={FEATURED} style={styles.icon} />
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 32,
    shadowColor: '#0C1A4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  icon: {
    width: 64,
    height: 64,
  },
  texts: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: TITLE,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.latoMedium,
    fontSize: 14,
    lineHeight: 18,
    color: SUBTITLE,
    textAlign: 'center',
    maxWidth: 334,
  },
});
