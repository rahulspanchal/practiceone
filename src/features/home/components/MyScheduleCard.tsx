import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { fontFamily } from '@/theme';

const TITLE = '#012233';
const SUBTITLE = '#808B9A';
const ARROW = '#BE522F';
const ARROW_BG = '#FFE6E0';

interface MyScheduleCardProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

/** Circular peach button with a rust-orange forward arrow. */
function ArrowButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={6}
      onPress={onPress}
      style={styles.arrowButton}
    >
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path
          d="M5 12h13M12 5l7 7-7 7"
          stroke={ARROW}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}

/**
 * "My Schedule" dashboard card: a white rounded panel with a title + subtitle on
 * the left and a circular peach arrow button on the right.
 */
export function MyScheduleCard({
  title = 'My Schedule',
  subtitle = 'Upcoming Session',
  onPress,
}: MyScheduleCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <ArrowButton onPress={onPress} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#323247',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
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
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: SUBTITLE,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: ARROW_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
