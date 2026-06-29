import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { fontFamily } from '@/theme';

const PLAYER = require('@/assets/images/dashboard-player.png');

const NAVY = '#012233';
const LABEL = '#E2E2E2';
const WHITE = '#FFFFFF';
const BADGE_BORDER = '#C6CED9';
// Two decorative cards peeking out beneath the navy panel (Figma "Second/Third
// Card"). Both #CCE1F7, narrower than the main card and centered, each layer a
// little narrower and poking a little further below than the one above it.
const STACK_BLUE = '#CCE1F7';
const STACK_BLUE_FADED = 'rgba(204,225,247,0.3)'; // third card @ 30% opacity

const CARD_HEIGHT = 130;
// Athlete inset from the right edge (gives room so the bullseye centered on him
// stays whole instead of running off the right edge).
const PLAYER_RIGHT = 44;
const PLAYER_WIDTH = 100;
// Disc stack is centered ON the athlete: his horizontal center is PLAYER_RIGHT +
// half his width, in from the card's right edge.
const RINGS_CENTER_FROM_RIGHT = PLAYER_RIGHT + PLAYER_WIDTH / 2;

interface NextSessionCardProps {
  label?: string;
  date?: string;
  time?: string;
  sport?: string;
}

/** Small white clock glyph used beside the session time. */
function ClockIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={WHITE} strokeWidth={2} />
      <Path
        d="M12 7v5l3 2"
        stroke={WHITE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Concentric teal discs behind the athlete, sampled from the design: each inner
// ring is a lighter green-teal than the navy card. Drawn largest-first as plain
// rounded Views so they layer into the "bullseye" depth and render reliably.
// Large concentric discs (clipped top/bottom by the card, like the reference)
// but whole left-to-right. Outer radius <= RINGS_CENTER_FROM_RIGHT so the
// largest circle stays inside the right edge. Colors/ratios from the design.
const RINGS: { r: number; color: string }[] = [
  { r: 92, color: '#0E2632' },
  { r: 72, color: '#152D39' },
  { r: 57, color: '#233B46' },
];

function GlowCircle() {
  return (
    <>
      {RINGS.map(({ r, color }) => (
        <View
          key={r}
          style={[
            styles.ring,
            {
              width: r * 2,
              height: r * 2,
              borderRadius: r,
              top: CARD_HEIGHT / 2 - r,
              right: RINGS_CENTER_FROM_RIGHT - r,
              backgroundColor: color,
            },
          ]}
        />
      ))}
    </>
  );
}

/**
 * "Next Session" card on the Main Dashboard. Matches the Figma "Card Horizontal
 * Long": a 130px-tall navy panel (#012233, 14px radius) with the session label,
 * date, time and sport badge on the left, and the 3D athlete cut-out anchored
 * bottom-right — intentionally taller than the card so its head pokes above the
 * top edge (the card uses `overflow: visible`).
 */
export function NextSessionCard({
  label = 'Next Session',
  date = '21 Nov 2023',
  time = '04:00 PM',
  sport = 'Football',
}: NextSessionCardProps) {
  return (
    <View style={styles.root}>
      {/* Stacked "deck" cards behind the navy panel — rendered first so they sit
          underneath; only the bottom strip of each peeks out below the card. */}
      <View style={styles.backCardThird} />
      <View style={styles.backCardSecond} />

      {/* Shadow lives on its own childless layer: an elevated view that ALSO
          clips with overflow+borderRadius drops its children on Android. */}
      <View style={styles.shadow} />

      {/* Clipped card body: navy panel that masks the rings to rounded corners. */}
      <View style={styles.clip}>
        <GlowCircle />

        <View style={styles.content}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.date}>{date}</Text>

          <View style={styles.timeRow}>
            <ClockIcon />
            <Text style={styles.time}>{time}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeBullet}>⚽</Text>
            <Text style={styles.badgeText}>{sport}</Text>
          </View>
        </View>
      </View>

      {/* Athlete sits above the card (root is overflow-visible) so the head pokes
          out past the top edge. */}
      <Image source={PLAYER} style={styles.player} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  ring: {
    position: 'absolute',
  },
  // Centered behind the main card (insets = (100 - width%) / 2) and pushed down
  // so a thin strip shows below the navy panel.
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
    paddingVertical: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    // Reserve room on the right so text never runs under the athlete image.
    paddingRight: 96,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: LABEL,
  },
  date: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
    color: WHITE,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  time: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: WHITE,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BADGE_BORDER,
    backgroundColor: 'rgba(247,250,252,0.2)',
  },
  badgeBullet: {
    fontSize: 12,
    lineHeight: 16,
  },
  badgeText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: WHITE,
  },
  player: {
    position: 'absolute',
    right: PLAYER_RIGHT,
    bottom: 0,
    width: PLAYER_WIDTH,
    height: 150,
  },
});
