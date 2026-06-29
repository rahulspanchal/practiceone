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

const COACH_1 = require('@/assets/images/coach-1.png');
const COACH_2 = require('@/assets/images/coach-2.png');

const NAVY = '#012233';
const ASSIGNED = '#808B9A';
const INFO = '#75808E';
const DOT = '#C0C5CC';
const ARROW = '#BE522F';
const ARROW_BG = '#FFE6E0';
const CHIP_BG = '#F1F2F4';
const THUMB = '#4081FF';
const ONLINE = '#12C442';
const ROW_BORDER = '#F4F4F4';

interface Coach {
  avatar: ImageSourcePropType;
  name: string;
  role: string;
  exp: string;
  likes: number;
}

const COACHES: Coach[] = [
  {
    avatar: COACH_1,
    name: 'Arham Khan',
    role: 'Football Coach',
    exp: '5+ years exp.',
    likes: 987,
  },
  {
    avatar: COACH_2,
    name: 'Leila Sharma',
    role: 'Salsa Teacher',
    exp: '2+ years exp.',
    likes: 45,
  },
];

function UsersIcon() {
  return (
    <Svg width={13} height={11} viewBox="0 0 13 11" fill="none">
      <Path
        d="M6.68635 5.55686C7.00208 5.26254 7.25531 4.8985 7.42888 4.48948C7.60244 4.08045 7.69227 3.63599 7.69226 3.18627C7.69226 2.34122 7.38056 1.53078 6.82572 0.933238C6.27088 0.335696 5.51836 1.14012e-07 4.7337 1.14012e-07C3.94904 1.14012e-07 3.19652 0.335696 2.64168 0.933238C2.08684 1.53078 1.77514 2.34122 1.77514 3.18627C1.77513 3.63599 1.86496 4.08045 2.03852 4.48948C2.21209 4.8985 2.46532 5.26254 2.78105 5.55686C1.95273 5.96081 1.24997 6.61313 0.756789 7.43584C0.263605 8.25854 0.000870915 9.21681 0 10.1961C0 10.3651 0.0623409 10.5272 0.173309 10.6467C0.284276 10.7662 0.434781 10.8333 0.591713 10.8333C0.748644 10.8333 0.899149 10.7662 1.01012 10.6467C1.12108 10.5272 1.18343 10.3651 1.18343 10.1961C1.18343 9.18201 1.55747 8.20949 2.22328 7.49243C2.88908 6.77538 3.79211 6.37255 4.7337 6.37255C5.67529 6.37255 6.57832 6.77538 7.24412 7.49243C7.90993 8.20949 8.28398 9.18201 8.28398 10.1961C8.28398 10.3651 8.34632 10.5272 8.45728 10.6467C8.56825 10.7662 8.71876 10.8333 8.87569 10.8333C9.03262 10.8333 9.18312 10.7662 9.29409 10.6467C9.40506 10.5272 9.4674 10.3651 9.4674 10.1961C9.46653 9.21681 9.2038 8.25854 8.71061 7.43584C8.21743 6.61313 7.51467 5.96081 6.68635 5.55686ZM4.7337 5.09804C4.38261 5.09804 4.03941 4.98592 3.74749 4.77585C3.45557 4.56578 3.22804 4.2672 3.09369 3.91787C2.95933 3.56855 2.92418 3.18415 2.99267 2.81331C3.06117 2.44246 3.23023 2.10182 3.47849 1.83445C3.72675 1.56709 4.04305 1.38501 4.38739 1.31124C4.73173 1.23748 5.08865 1.27534 5.41302 1.42003C5.73738 1.56473 6.01462 1.80977 6.20967 2.12415C6.40473 2.43854 6.50884 2.80816 6.50884 3.18627C6.50884 3.69331 6.32182 4.17957 5.98891 4.5381C5.65601 4.89662 5.2045 5.09804 4.7337 5.09804ZM10.497 5.30196C10.8757 4.84271 11.123 4.27538 11.2093 3.66825C11.2956 3.06113 11.2171 2.4401 10.9832 1.8799C10.7494 1.31971 10.3702 0.844232 9.89135 0.510711C9.41246 0.177189 8.85427 -0.000164157 8.28398 1.14012e-07C8.12704 1.14012e-07 7.97654 0.0671392 7.86557 0.186648C7.7546 0.306156 7.69226 0.468245 7.69226 0.637255C7.69226 0.806265 7.7546 0.968354 7.86557 1.08786C7.97654 1.20737 8.12704 1.27451 8.28398 1.27451C8.75477 1.27451 9.20628 1.47593 9.53919 1.83445C9.87209 2.19298 10.0591 2.67924 10.0591 3.18627C10.0583 3.52099 9.97586 3.84959 9.8201 4.13924C9.66434 4.42888 9.4407 4.66941 9.17154 4.83676C9.08382 4.89126 9.01054 4.9691 8.95874 5.06282C8.90694 5.15655 8.87834 5.26302 8.87569 5.37206C8.87321 5.48024 8.89636 5.58732 8.94294 5.6832C8.98953 5.77909 9.05802 5.86061 9.14196 5.9201L9.37273 6.08578L9.44965 6.13039C10.1629 6.49472 10.7646 7.07097 11.1839 7.79128C11.6033 8.51158 11.8227 9.34594 11.8165 10.1961C11.8165 10.3651 11.8788 10.5272 11.9898 10.6467C12.1008 10.7662 12.2513 10.8333 12.4082 10.8333C12.5651 10.8333 12.7156 10.7662 12.8266 10.6467C12.9376 10.5272 12.9999 10.3651 12.9999 10.1961C13.0048 9.21816 12.7773 8.25516 12.3393 7.39857C11.9012 6.54198 11.267 5.82025 10.497 5.30196Z"
        fill={ARROW}
      />
    </Svg>
  );
}

function ThumbUpIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path
        d="M10.5003 12.2502H4.66699V4.66683L8.75033 0.583496L9.47949 1.31266C9.54755 1.38072 9.60345 1.47308 9.6472 1.58975C9.69095 1.70641 9.71283 1.81822 9.71283 1.92516V2.12933L9.07116 4.66683H12.2503C12.5614 4.66683 12.8337 4.7835 13.067 5.01683C13.3003 5.25016 13.417 5.52239 13.417 5.8335V7.00016C13.417 7.06822 13.4097 7.14114 13.3951 7.21891C13.3805 7.29669 13.3587 7.36961 13.3295 7.43766L11.5795 11.5502C11.492 11.7446 11.3462 11.9099 11.142 12.046C10.9378 12.1821 10.7239 12.2502 10.5003 12.2502ZM3.50033 4.66683V12.2502H1.16699V4.66683H3.50033Z"
        fill={THUMB}
      />
    </Svg>
  );
}

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

function CoachRow({ avatar, name, role, exp, likes }: Coach) {
  return (
    <View style={styles.coachRow}>
      <View style={styles.avatarWrap}>
        <Image source={avatar} style={styles.avatar} />
        <View style={styles.onlineDot} />
      </View>

      <View style={styles.coachMid}>
        <Text style={styles.coachName}>{name}</Text>
        <View style={styles.coachInfoRow}>
          <Text style={styles.coachInfo}>{role}</Text>
          <Text style={styles.coachDot}>•</Text>
          <Text style={styles.coachInfo}>{exp}</Text>
        </View>
      </View>

      <View style={styles.likes}>
        <ThumbUpIcon />
        <Text style={styles.likeCount}>{likes}</Text>
      </View>
    </View>
  );
}

/**
 * "My Coaches" dashboard card: a light panel with a header (title + arrow), an
 * "N coaches assigned" summary row, and a list of coach rows (avatar with online
 * dot, name, role/experience, and a thumbs-up like count).
 */
export function MyCoachesCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>My Coaches</Text>
        <ArrowButton />
      </View>

      <View style={styles.assignedRow}>
        <View style={styles.chip}>
          <UsersIcon />
        </View>
        <Text style={styles.assignedText}>
          {COACHES.length} Coaches assigned
        </Text>
      </View>

      {COACHES.map(coach => (
        <CoachRow key={coach.name} {...coach} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F7FAFC',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 16,
    shadowColor: '#323247',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: NAVY,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: ARROW_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: CHIP_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignedText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 16,
    color: ASSIGNED,
  },
  coachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: ROW_BORDER,
    paddingVertical: 13,
    paddingHorizontal: 16,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  avatarWrap: {
    width: 54,
    height: 54,
    position: 'relative',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 0.7,
    borderColor: '#ECEFF2',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 8,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: ONLINE,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  coachMid: {
    flex: 1,
    gap: 4,
  },
  coachName: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: NAVY,
  },
  coachInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coachInfo: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: INFO,
  },
  coachDot: {
    fontSize: 12,
    color: DOT,
  },
  likes: {
    alignItems: 'center',
    gap: 2,
  },
  likeCount: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    lineHeight: 16,
    color: NAVY,
  },
});
