import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { Screen } from '@/components/atoms';
import type { HomeStackParamList } from '@/navigation/types';

import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardLoading } from '../components/DashboardLoading';
import { EmptySessionCard } from '../components/EmptySessionCard';
import { LeaderboardCard } from '../components/LeaderboardCard';
import { MyCoachesCard } from '../components/MyCoachesCard';
import { MyScheduleCard } from '../components/MyScheduleCard';
import { NextSessionCard } from '../components/NextSessionCard';
import { ProfileActionSheet } from '../components/ProfileActionSheet';
import { StatusStoryModal } from '../components/StatusStoryModal';
import { StoriesUpdates } from '../components/StoriesUpdates';
import { StudentCard } from '../components/StudentCard';

const { width: WINDOW_W, height: WINDOW_H } = Dimensions.get('window');

// Peach glow peak color and reach (sampled from the design). Each glow radiates
// from a corner/edge and fades out with a soft, blurred falloff so there's no
// visible hard disc edge; the center stays white.
const GLOW_COLOR = '#FBE5CE';
const GLOW_R = WINDOW_W * 0.62;

/** Soft, Gaussian-ish falloff so each glow reads as a blur, not a flat disc. */
const glowStops = () => [
  <Stop key="0" offset="0" stopColor={GLOW_COLOR} stopOpacity="0.85" />,
  <Stop key="1" offset="0.5" stopColor={GLOW_COLOR} stopOpacity="0.38" />,
  <Stop key="2" offset="0.8" stopColor={GLOW_COLOR} stopOpacity="0.1" />,
  <Stop key="3" offset="1" stopColor={GLOW_COLOR} stopOpacity="0" />,
];

/**
 * Full-bleed dashboard background: three warm peach glows — TOP-LEFT corner,
 * RIGHT edge (upper-middle, behind the carousel) and BOTTOM-LEFT corner — over
 * a white base, leaving the center white (sampled from the design). Pinned
 * behind everything and bled up past the safe-area inset so it also covers the
 * status-bar area.
 */
function DashboardBackground() {
  const insets = useSafeAreaInsets();
  return (
    <Svg
      pointerEvents="none"
      style={[styles.bg, { top: -insets.top }]}
      width={WINDOW_W}
      height={WINDOW_H}
    >
      <Defs>
        <RadialGradient
          id="glowTop"
          cx="0"
          cy="0"
          fx="0"
          fy="0"
          r={GLOW_R}
          gradientUnits="userSpaceOnUse"
        >
          {glowStops()}
        </RadialGradient>
        <RadialGradient
          id="glowRight"
          cx={WINDOW_W}
          cy={WINDOW_H * 0.33}
          fx={WINDOW_W}
          fy={WINDOW_H * 0.33}
          r={GLOW_R}
          gradientUnits="userSpaceOnUse"
        >
          {glowStops()}
        </RadialGradient>
        <RadialGradient
          id="glowBottom"
          cx="0"
          cy={WINDOW_H}
          fx="0"
          fy={WINDOW_H}
          r={GLOW_R}
          gradientUnits="userSpaceOnUse"
        >
          {glowStops()}
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width={WINDOW_W} height={WINDOW_H} fill="#FFFFFF" />
      <Rect
        x="0"
        y="0"
        width={WINDOW_W}
        height={WINDOW_H}
        fill="url(#glowTop)"
      />
      <Rect
        x="0"
        y="0"
        width={WINDOW_W}
        height={WINDOW_H}
        fill="url(#glowRight)"
      />
      <Rect
        x="0"
        y="0"
        width={WINDOW_W}
        height={WINDOW_H}
        fill="url(#glowBottom)"
      />
    </Svg>
  );
}

/** Main Dashboard. Top bar, then the "Next Session" card; more sections follow. */
export function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  // Brief loading state: show the rotating dot spinner for 2s, then reveal the
  // dashboard content.
  const [loading, setLoading] = useState(true);
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen padded={false} edges={['top']}>
      <DashboardBackground />
      <DashboardHeader onPressAvatar={() => setActionSheetOpen(true)} />
      {loading ? (
        <DashboardLoading />
      ) : (
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <NextSessionCard />
          </View>

          <View style={styles.emptySection}>
            <EmptySessionCard />
          </View>

          <View style={styles.storiesSection}>
            <StoriesUpdates />
          </View>

          <View style={styles.listSection}>
            <MyScheduleCard onPress={() => navigation.navigate('MySchedule')} />
            <StudentCard />
            <MyCoachesCard />
            <LeaderboardCard />
          </View>
        </ScrollView>
      )}

      <ProfileActionSheet
        visible={actionSheetOpen}
        onClose={() => setActionSheetOpen(false)}
        onViewSettings={() => setActionSheetOpen(false)}
        onViewStatus={() => {
          setActionSheetOpen(false);
          setStoryOpen(true);
        }}
      />

      <StatusStoryModal
        visible={storyOpen}
        onClose={() => setStoryOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    left: 0,
  },
  body: {
    paddingBottom: 32,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  // Clears the deck cards peeking ~30px below the Next Session card above it.
  emptySection: {
    paddingHorizontal: 20,
    marginTop: 44,
  },
  // Extra top gap clears the stacked "deck" cards that peek ~25px below the
  // Next Session card (they're absolutely positioned, so add no layout height).
  storiesSection: {
    paddingHorizontal: 20,
    marginTop: 48,
  },
  listSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    gap: 16,
  },
});
