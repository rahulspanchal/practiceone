import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontFamily } from '@/theme';

const NAVY = '#012233';
const WHITE = '#FFFFFF';
const BODY = '#B0B8BD';
const STACK_BLUE = '#CCE1F7';
const STACK_BLUE_FADED = 'rgba(204,225,247,0.3)';

const CARD_HEIGHT = 130;

interface EmptySessionCardProps {
  title?: string;
  message?: string;
}

/**
 * Empty-state variant of the "Next Session" card: the same navy panel and
 * peeking "deck" cards, but with a centered title + message and no athlete.
 */
export function EmptySessionCard({
  title = 'No Upcoming Sessions!',
  message = 'There are no upcoming sessions scheduled right now. Please check back later.',
}: EmptySessionCardProps) {
  return (
    <View style={styles.root}>
      <View style={styles.backCardThird} />
      <View style={styles.backCardSecond} />

      <View style={styles.shadow} />

      <View style={styles.clip}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  backCardSecond: {
    position: 'absolute',
    left: '11.4%',
    right: '11.4%',
    height: 117,
    bottom: -13,
    borderRadius: 14,
    backgroundColor: STACK_BLUE,
    shadowColor: '#323247',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 2,
  },
  backCardThird: {
    position: 'absolute',
    left: '15.6%',
    right: '15.6%',
    height: 102,
    bottom: -30,
    borderRadius: 14,
    backgroundColor: STACK_BLUE_FADED,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 14,
    backgroundColor: NAVY,
    shadowColor: '#0C1A4B',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.12,
    shadowRadius: 17,
    elevation: 6,
  },
  clip: {
    height: CARD_HEIGHT,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: NAVY,
    borderWidth: 1,
    borderColor: 'rgba(247,250,252,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 8,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
    color: WHITE,
    textAlign: 'center',
  },
  message: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: BODY,
    textAlign: 'center',
  },
});
