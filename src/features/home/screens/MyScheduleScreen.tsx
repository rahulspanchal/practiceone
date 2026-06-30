import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { Screen } from '@/components/atoms';
import type { HomeStackParamList } from '@/navigation/types';
import { fontFamily } from '@/theme';

import { EmptyScheduleCard } from '../components/EmptyScheduleCard';
import { ScheduleCalendarCard } from '../components/ScheduleCalendarCard';
import { SessionCard } from '../components/SessionCard';
import { SportDropdown } from '../components/SportDropdown';

const { width: WINDOW_W, height: WINDOW_H } = Dimensions.get('window');

const NAVY = '#012233';
const RUST = '#BE522F';
const MUTED = '#808B9A';
const BACK_BG = '#FFE6E0';
const SEG_BORDER = '#ECDED8';

const LEGEND_LABEL = '#606060';

const LEGENDS: { label: string; color: string }[] = [
  { label: 'Current', color: '#EB0000' },
  { label: 'Upcoming', color: '#1A39D0' },
  { label: 'Attended', color: '#1EC74B' },
  { label: 'Missed', color: '#EB0000' },
];

const SPORTS = ['All Sports', 'Football', 'Cricket', 'Basketball'];

/** Soft warm peach wash: a vertical gradient (peach top -> white -> peach foot)
 *  bled up past the safe area to sit behind the status bar, matching the design. */
function ScheduleBackground() {
  const insets = useSafeAreaInsets();
  return (
    <Svg
      pointerEvents="none"
      style={[styles.bg, { top: -insets.top }]}
      width={WINDOW_W}
      height={WINDOW_H + insets.top}
    >
      <Defs>
        <LinearGradient id="scheduleBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FCE7D3" />
          <Stop offset="0.28" stopColor="#FFFFFF" />
          <Stop offset="0.72" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#FBE3C9" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width={WINDOW_W}
        height={WINDOW_H + insets.top}
        fill="url(#scheduleBg)"
      />
    </Svg>
  );
}

function BackChevron() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 6l-6 6 6 6"
        stroke={RUST}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

type Period = 'Week' | 'Month';

function SegmentControl({
  value,
  onChange,
}: {
  value: Period;
  onChange: (p: Period) => void;
}) {
  return (
    <View style={styles.segment}>
      {(['Week', 'Month'] as Period[]).map(period => {
        const active = value === period;
        return (
          <Pressable
            key={period}
            onPress={() => onChange(period)}
            style={[styles.segmentCell, active && styles.segmentCellActive]}
          >
            <Text
              style={[styles.segmentText, active && styles.segmentTextActive]}
            >
              {period}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * "My Schedule" screen: a back button + title + Week/Month switch, the month
 * calendar, the calendar legend, and the "My Sessions" list. Reached from the
 * dashboard's MyScheduleCard.
 */
export function MyScheduleScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [period, setPeriod] = useState<Period>('Week');
  const [sport, setSport] = useState<string>('All Sports');

  return (
    <Screen padded={false} edges={['top']}>
      <ScheduleBackground />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <BackChevron />
          </Pressable>
          <Text style={styles.headerTitle}>My Schedule</Text>
        </View>
        <SegmentControl value={period} onChange={setPeriod} />
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <ScheduleCalendarCard />

        <View style={styles.legends}>
          <Text style={styles.legendsLabel}>Calendar Legends</Text>
          <View style={styles.legendItems}>
            {LEGENDS.map(item => (
              <View key={item.label} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Sessions</Text>
          <SportDropdown value={sport} options={SPORTS} onChange={setSport} />
        </View>

        <SessionCard onPress={() => navigation.navigate('SessionDetails')} />
        <EmptyScheduleCard />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    left: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BACK_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: NAVY,
  },
  segment: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: SEG_BORDER,
    backgroundColor: '#FFFFFF',
    padding: 3,
  },
  segmentCell: {
    paddingHorizontal: 14,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentCellActive: {
    borderWidth: 1,
    borderColor: RUST,
    backgroundColor: '#FFF8F6',
  },
  segmentText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: MUTED,
  },
  segmentTextActive: {
    fontFamily: fontFamily.semibold,
    color: RUST,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 16,
  },
  legends: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  legendsLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: NAVY,
  },
  legendItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontFamily: fontFamily.latoRegular,
    fontSize: 11,
    lineHeight: 14,
    color: LEGEND_LABEL,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
    color: NAVY,
  },
});
