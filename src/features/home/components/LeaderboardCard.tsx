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

const LB_BHEEM = require('@/assets/images/lb-bheem.png');
const LB_MEGHNA = require('@/assets/images/lb-meghna.png');
const LB_1 = require('@/assets/images/lb-1.png');
const LB_2 = require('@/assets/images/lb-2.png');
const COACH_1 = require('@/assets/images/coach-1.png');
const COACH_2 = require('@/assets/images/coach-2.png');
const ARYAN = require('@/assets/images/aryan-saxena.png');
const DASH_AVATAR = require('@/assets/images/dashboard-avatar.png');

const NAVY = '#012233';
const PODIUM_NAME = '#1D1D1D';
const MUTED = '#606060';
const SUBTLE = '#555555';
const BADGE = '#C16654';
const GOLD = '#FFCC00';
const BTN_BORDER = '#D08782';
const YOU_BG = '#FFEAE3';
const ROW_BORDER = '#F2F2F2';

interface Podium {
  rank: number;
  name: string;
  pts: number;
  avatar: ImageSourcePropType;
}

const PODIUM: Podium[] = [
  { rank: 2, name: 'Meghna Rai', pts: 40, avatar: LB_MEGHNA },
  { rank: 1, name: 'Bheem Sinha', pts: 43, avatar: LB_BHEEM },
  { rank: 3, name: 'Arun Kumar', pts: 40, avatar: LB_1 },
];

interface RankRow {
  rank: number;
  name: string;
  pts: number;
  avatar: ImageSourcePropType;
  you?: boolean;
}

const ROWS: RankRow[] = [
  { rank: 4, name: 'Sunil Bhadouriya', pts: 36, avatar: COACH_1 },
  { rank: 5, name: 'Nandani Raikwar', pts: 36, avatar: COACH_2 },
  { rank: 6, name: 'You', pts: 36, avatar: ARYAN, you: true },
  { rank: 7, name: 'Vishwas Patel', pts: 36, avatar: DASH_AVATAR },
  { rank: 8, name: 'Lalita Thakur', pts: 36, avatar: LB_2 },
  { rank: 9, name: 'Navjot Kaur', pts: 36, avatar: LB_1 },
];

function CrownIcon() {
  return (
    <Svg width={26} height={21} viewBox="0 0 26 21" fill="none">
      <Path
        d="M24.6632 2.30695C24.2673 2.14375 23.8313 2.10085 23.4107 2.18372C22.9902 2.26659 22.604 2.47148 22.3015 2.7723L19.5 5.54505L14.5318 0.627862C14.1255 0.225842 13.5745 0 13 0C12.4255 0 11.8745 0.225842 11.4682 0.627862L6.5 5.54505L3.6985 2.7723C3.39549 2.47249 3.00947 2.26832 2.58924 2.18562C2.169 2.10291 1.73343 2.14538 1.33758 2.30765C0.941732 2.46992 0.603379 2.7447 0.365296 3.09727C0.127214 3.44983 9.1486e-05 3.86435 0 4.28841L0 15.6389C0.00172018 17.0602 0.572955 18.4229 1.5884 19.4279C2.60385 20.4329 3.98061 20.9983 5.41667 21H20.5833C22.0194 20.9983 23.3961 20.4329 24.4116 19.4279C25.427 18.4229 25.9983 17.0602 26 15.6389V4.28841C26.0001 3.86432 25.8732 3.44971 25.6352 3.09702C25.3973 2.74433 25.059 2.46938 24.6632 2.30695Z"
        fill={GOLD}
      />
    </Svg>
  );
}

function StarIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        d="M10.1531 7.39687C9.92908 7.62959 9.82507 7.96203 9.88108 8.28616L10.2331 10.3806C10.3211 10.9042 10.1211 11.4278 9.69706 11.7353C9.28902 12.0511 8.74496 12.0843 8.28092 11.835L7.98489 11.6771L6.45673 10.846C6.1847 10.6964 5.84067 10.6964 5.56864 10.846L4.04047 11.6771L3.74444 11.835C3.29639 12.0843 2.75234 12.0511 2.32829 11.7353C1.91225 11.4194 1.70423 10.9042 1.79224 10.3806L2.14428 8.28616C2.20028 7.96203 2.08827 7.62959 1.87225 7.39687L0.408101 5.90919C0.0320627 5.55181 -0.0879496 4.99497 0.0640657 4.48799C0.216081 3.98933 0.632123 3.62364 1.13617 3.54884L3.16038 3.24133C3.47241 3.19146 3.74444 2.99199 3.88845 2.69279L4.79256 0.772932H4.81657C5.04859 0.299199 5.50464 0 6.00869 0C6.51274 0 6.98479 0.307511 7.20881 0.772932L8.1129 2.69279C8.25691 2.99199 8.52894 3.19146 8.84097 3.24133L10.8652 3.54884C11.3692 3.62364 11.7933 3.98933 11.9373 4.48799C12.0893 4.99497 11.9613 5.55181 11.5933 5.90919L10.1291 7.39687H10.1531Z"
        fill={GOLD}
      />
    </Svg>
  );
}

function ChevronDown() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9l6 6 6-6"
        stroke={SUBTLE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PodiumColumn({ rank, name, pts, avatar }: Podium) {
  const first = rank === 1;
  const size = first ? 84 : 72;
  return (
    <View style={styles.podiumCol}>
      {first ? (
        <View style={styles.crown}>
          <CrownIcon />
        </View>
      ) : null}

      <View style={[styles.podiumAvatarWrap, { width: size, height: size }]}>
        <Image
          source={avatar}
          style={[
            styles.podiumAvatar,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{rank}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.podiumName}>{name}</Text>
      <View style={styles.ptsRow}>
        <StarIcon />
        <Text style={styles.podiumPts}>{pts} pts</Text>
      </View>
    </View>
  );
}

function ListRow({ rank, name, pts, avatar, you }: RankRow) {
  return (
    <View style={[styles.row, you && styles.rowYou]}>
      <Text style={[styles.rank, you && styles.textYou]}>{rank}</Text>
      <Image source={avatar} style={styles.rowAvatar} />
      <Text style={[styles.rowName, you && styles.textYou]} numberOfLines={1}>
        {name}
      </Text>
      <Text style={[styles.rowPts, you && styles.textYou]}>{pts} pts</Text>
    </View>
  );
}

/**
 * Leaderboard dashboard card: header with a sport filter, a top-3 podium (with
 * crown on rank 1 and rust rank badges), and a ranked list where the current
 * user ("You") row is highlighted.
 */
export function LeaderboardCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Pressable accessibilityRole="button" style={styles.filterButton}>
          <Text style={styles.filterText}>All Sports</Text>
          <ChevronDown />
        </Pressable>
      </View>

      <View style={styles.podium}>
        {PODIUM.map(p => (
          <PodiumColumn key={p.rank} {...p} />
        ))}
      </View>

      <View style={styles.list}>
        {ROWS.map(r => (
          <ListRow key={r.rank} {...r} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    shadowColor: '#323247',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.25,
    borderColor: BTN_BORDER,
  },
  filterText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: SUBTLE,
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingTop: 26,
    paddingBottom: 8,
  },
  podiumCol: {
    alignItems: 'center',
  },
  crown: {
    position: 'absolute',
    top: -18,
    alignItems: 'center',
    zIndex: 2,
  },
  podiumAvatarWrap: {
    position: 'relative',
  },
  podiumAvatar: {
    borderWidth: 1,
    borderColor: '#ECEFF2',
  },
  badgeRow: {
    position: 'absolute',
    bottom: -12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  badge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: BADGE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  podiumName: {
    marginTop: 18,
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    color: PODIUM_NAME,
  },
  ptsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  podiumPts: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: MUTED,
  },
  list: {
    marginTop: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ROW_BORDER,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  rowYou: {
    backgroundColor: YOU_BG,
    borderColor: YOU_BG,
  },
  rank: {
    width: 18,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: MUTED,
  },
  rowAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 0.7,
    borderColor: '#ECEFF2',
  },
  rowName: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: MUTED,
  },
  rowPts: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: MUTED,
  },
  textYou: {
    fontFamily: fontFamily.semibold,
    color: NAVY,
  },
});
