import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { fontFamily } from '@/theme';

const COACH = require('@/assets/images/coach-1.png');
const FIELD = require('@/assets/images/story-cricket-fest.png');
const RANKING = require('@/assets/images/iconsax-ranking.png');

const NAVY = '#012233';
const TITLE = '#1F1F1F';
const ROLE = '#808B9A';
const TRAINING = '#4A5560';
const RUST = '#BE522F';
const RED = '#EB0000';
const BADGE_BG = '#FFFDEF';
const DIVIDER = '#F0F1F2';
const CHIP_BG = '#F1F2F4';
const FOOTER_TEXT = '#606060';
const ASSESS_TEXT = '#919191';
const CARD_BORDER = '#F2F4F6';

interface SessionCardProps {
  title?: string;
  status?: string;
  coachName?: string;
  coachRole?: string;
  coachAvatar?: ImageSourcePropType;
  training?: string;
  fieldLabel?: string;
  fieldImage?: ImageSourcePropType;
  onPress?: () => void;
  onPressTitle?: () => void;
  onPressAssessment?: () => void;
}

function ChevronRight({
  color = NAVY,
  size = 16,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BoltIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z" fill={RUST} />
    </Svg>
  );
}

/**
 * "My Sessions" session card (Figma "Main Card"): a white rounded panel with a
 * title + status badge, the coach block, the training summary, a field
 * thumbnail, and an assessment footer row.
 */
export function SessionCard({
  title = 'Introduction & Warm-Up',
  status = 'Session Missed',
  coachName = 'Arham Khan',
  coachRole = 'Football Coach',
  coachAvatar = COACH,
  training = 'Dribbling, Passing,\nendurance training',
  fieldLabel = 'Football Field -2',
  fieldImage = FIELD,
  onPress,
  onPressTitle,
  onPressAssessment,
}: SessionCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.topRow}>
        <Pressable
          style={styles.titleRow}
          hitSlop={6}
          onPress={onPressTitle ?? onPress}
        >
          <Text style={styles.title}>{title}</Text>
          <ChevronRight size={16} />
        </Pressable>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>

      <View style={styles.middleRow}>
        <View style={styles.left}>
          <View style={styles.coachRow}>
            <View style={styles.accentBar} />
            <Image source={coachAvatar} style={styles.avatar} />
            <View style={styles.coachTexts}>
              <Text style={styles.coachName}>{coachName}</Text>
              <Text style={styles.coachRole}>{coachRole}</Text>
            </View>
          </View>

          <View style={styles.trainingRow}>
            <BoltIcon />
            <Text style={styles.trainingText}>{training}</Text>
          </View>
        </View>

        <View style={styles.thumb}>
          <Image source={fieldImage} style={styles.thumbImg} />
          <View style={styles.thumbLabel}>
            <Text style={styles.thumbLabelText}>{fieldLabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footerRow}>
        <View style={styles.footerLeft}>
          <View style={styles.chip}>
            <Image source={RANKING} style={styles.chipIcon} />
          </View>
          <Text style={styles.footerText}>
            No session{'\n'}Assessment found!
          </Text>
        </View>
        <Pressable
          style={styles.assessBtn}
          hitSlop={6}
          onPress={onPressAssessment}
        >
          <Text style={styles.assessText}>View Assessment</Text>
          <ChevronRight size={14} color={ASSESS_TEXT} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    gap: 14,
    shadowColor: '#323247',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: TITLE,
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: RED,
    backgroundColor: BADGE_BG,
  },
  badgeText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: RED,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  left: {
    flex: 1,
    gap: 12,
  },
  coachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accentBar: {
    width: 3,
    height: 34,
    borderRadius: 2,
    backgroundColor: RUST,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: '#ECEFF2',
  },
  coachTexts: {
    gap: 2,
  },
  coachName: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: NAVY,
  },
  coachRole: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: ROLE,
  },
  trainingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  trainingText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 17,
    color: TRAINING,
  },
  thumb: {
    width: 130,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#0E2632',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  thumbLabel: {
    position: 'absolute',
    left: 8,
    bottom: 8,
  },
  thumbLabelText: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chip: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: CHIP_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipIcon: {
    width: 18,
    height: 18,
  },
  footerText: {
    fontFamily: fontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    color: FOOTER_TEXT,
    width: 130,
  },
  assessBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assessText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 18,
    color: ASSESS_TEXT,
  },
});
