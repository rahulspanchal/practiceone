import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { fontFamily } from '@/theme';

const NAVY = '#012233';
const WEEKDAY = '#808B9A';
const CHEVRON = '#012233';
const CARD_BORDER = '#F7FAFC';

const DOT_RED = '#E80000';
const DOT_BLUE = '#1A39D0';

type DotColor = 'red' | 'blue' | 'green';

const DOT_HEX: Record<DotColor, string> = {
  red: DOT_RED,
  blue: DOT_BLUE,
  green: '#1EC74B',
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface ScheduleCalendarCardProps {
  monthLabel?: string;
  /** 0 = Sunday … 6 = Saturday — the weekday the 1st of the month falls on. */
  startWeekday?: number;
  daysInMonth?: number;
  /** Map of day-of-month -> status dot colour. */
  dots?: Record<number, DotColor>;
  onPrev?: () => void;
  onNext?: () => void;
}

function ChevronLeft() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 6l-6 6 6 6"
        stroke={CHEVRON}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChevronRight() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke={CHEVRON}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CaretDown() {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9l6 6 6-6"
        stroke={NAVY}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * "My Schedule" month calendar: a white rounded card with a month navigator
 * (prev / "August 2023 ⌄" / next), a weekday header row, and a 6-row date grid
 * where scheduled days carry a small status dot. Matches the Figma "Date Picker".
 */
export function ScheduleCalendarCard({
  monthLabel = 'August 2023',
  startWeekday = 2,
  daysInMonth = 31,
  dots = { 7: 'red', 14: 'red', 21: 'blue', 28: 'blue' },
  onPrev,
  onNext,
}: ScheduleCalendarCardProps) {
  // Build a flat list of cells: leading blanks for the month offset, then days.
  const cells: (number | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Pressable hitSlop={10} onPress={onPrev} style={styles.navBtn}>
          <ChevronLeft />
        </Pressable>
        <View style={styles.monthWrap}>
          <Text style={styles.month}>{monthLabel}</Text>
          <CaretDown />
        </View>
        <Pressable hitSlop={10} onPress={onNext} style={styles.navBtn}>
          <ChevronRight />
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAYS.map((d, i) => (
          <Text key={`${d}-${i}`} style={styles.weekday}>
            {d}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {rows.map((row, ri) => (
          <View key={ri} style={styles.dateRow}>
            {row.map((day, ci) => (
              <View key={ci} style={styles.dateCell}>
                {day !== null && (
                  <>
                    <Text style={styles.dateText}>{day}</Text>
                    <View style={styles.dotSlot}>
                      {dots[day] && (
                        <View
                          style={[
                            styles.dot,
                            { backgroundColor: DOT_HEX[dots[day]] },
                          ]}
                        />
                      )}
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingVertical: 18,
    paddingHorizontal: 16,
    shadowColor: '#323247',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  navBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  month: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: NAVY,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: WEEKDAY,
  },
  grid: {
    gap: 2,
  },
  dateRow: {
    flexDirection: 'row',
  },
  dateCell: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: NAVY,
  },
  dotSlot: {
    height: 8,
    marginTop: 3,
    justifyContent: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
