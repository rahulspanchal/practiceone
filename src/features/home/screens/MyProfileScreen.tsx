import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

import { Screen } from '@/components/atoms';
import type { HomeStackParamList } from '@/navigation/types';
import { fontFamily } from '@/theme';

import { ScheduleCalendarCard } from '../components/ScheduleCalendarCard';

const AVATAR = require('@/assets/images/aryan-saxena.png');
const LOGO = require('@/assets/images/lsa-logo.png');
const SPORT_FOOTBALL = require('@/assets/images/sport-football.png');
const SPORT_HOCKEY = require('@/assets/images/sport-hockey.png');
const SPORT_MMA = require('@/assets/images/sport-mma.png');

const { width: WINDOW_W, height: WINDOW_H } = Dimensions.get('window');

const NAVY = '#012233';
const NAME = '#1F2937';
const SUBTEXT = '#4B5563';
const ABOUT_LABEL = '#1F2937';
const ABOUT_BODY = '#606080';
const CARD_BORDER = '#F2F4F6';
const DIVIDER = '#F0F1F2';
const CHIP_BG = 'rgba(255, 250, 252, 0.2)';
const CHIP_BORDER = '#E2E2E2';
const CHIP_TEXT = '#606080';
const BACK_BG = '#FFE6E0';
const RUST = '#BE522F';
const ASSESS_NAME = '#333333';
const ASSESS_COUNT = '#606080';
const NOTE = '#606060';
const PRESENT = '#1E9E54';
const ABSENT = '#E80000';
const ARROW_BG = '#FFEAE3';
const ASSESS_ROW_BORDER = '#EFEFEF';
const PLACEHOLDER = '#919191';
const TEXTAREA_BORDER = '#E2E2E2';
const ABOUT_MAX = 200;
const ABOUT_DEFAULT =
  "I'm currently in Class 7 and sports are a big part of who I am. I enjoy " +
  'playing different games, staying fit, and being part of a team. Sports help ' +
  'me stay confident, active, and always ready to take on new challenges.';

type Nav = NativeStackNavigationProp<HomeStackParamList>;

type Sport = { label: string; icon?: ImageSourcePropType; emoji?: string };

const SPORTS: Sport[] = [
  { label: 'Football', icon: SPORT_FOOTBALL },
  { label: 'Basketball', emoji: '🏀' },
  { label: 'Cricket', emoji: '🏏' },
  { label: 'Hockey', icon: SPORT_HOCKEY },
  { label: 'Taekwondo', emoji: '🥋' },
  { label: 'Mix Martial Arts', icon: SPORT_MMA },
];

type Assessment = {
  label: string;
  icon?: ImageSourcePropType;
  emoji?: string;
  count: string;
};

const ASSESSMENTS: Assessment[] = [
  { label: 'Football', icon: SPORT_FOOTBALL, count: '4 Assessments' },
  { label: 'Basketball', emoji: '🏀', count: '4 Assessments' },
  { label: 'Cricket', emoji: '🏏', count: '4 Assessments' },
  { label: 'Hockey', icon: SPORT_HOCKEY, count: '4 Assessments' },
];

function ProfileBackground() {
  const insets = useSafeAreaInsets();
  return (
    <Svg
      pointerEvents="none"
      style={[styles.bg, { top: -insets.top }]}
      width={WINDOW_W}
      height={WINDOW_H + insets.top}
    >
      <Defs>
        <LinearGradient id="profileBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FCE7D3" />
          <Stop offset="0.3" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#FFFFFF" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width={WINDOW_W}
        height={WINDOW_H + insets.top}
        fill="url(#profileBg)"
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

/** FRAME.svg — rust circular camera badge on the avatar. */
function CameraBadge() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <Path
        d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z"
        fill={RUST}
      />
      <Circle cx={14} cy={14.5} r={2} fill="#FFFFFF" />
      <Path
        d="M19.5 10.5H17.6562C17.5625 10.5 17.4462 10.4394 17.3556 10.3438L16.545 9.06437C16.5386 9.05422 16.5318 9.04432 16.5247 9.03467C16.5175 9.02503 16.51 9.01565 16.5022 9.00656C16.2222 8.68 15.8438 8.5 15.4375 8.5H12.5625C12.1562 8.5 11.7778 8.68 11.4978 9.00656C11.49 9.01565 11.4825 9.02503 11.4753 9.03467C11.4682 9.04432 11.4614 9.05422 11.455 9.06437L10.6444 10.3456C10.575 10.4212 10.4775 10.5019 10.375 10.5019V10.2519C10.375 10.1138 10.3262 9.99595 10.2286 9.89832C10.1309 9.80069 10.0131 9.75187 9.875 9.75187H9.125C8.98693 9.75187 8.86908 9.80069 8.77145 9.89832C8.67382 9.99595 8.625 10.1138 8.625 10.2519V10.5019H8.5C8.08596 10.5023 7.73256 10.6489 7.4398 10.9417C7.14703 11.2344 7.00043 11.5878 7 12.0019V18C7.00043 18.414 7.14703 18.7674 7.4398 19.0602C7.73256 19.353 8.08596 19.4996 8.5 19.5H19.5C19.914 19.4996 20.2674 19.353 20.5602 19.0602C20.853 18.7674 20.9996 18.414 21 18V12C20.9996 11.586 20.853 11.2326 20.5602 10.9398C20.2674 10.647 19.914 10.5004 19.5 10.5ZM14 17.5C13.1716 17.5 12.4645 17.2071 11.8787 16.6213C11.2929 16.0355 11 15.3284 11 14.5C11 13.6716 11.2929 12.9645 11.8787 12.3787C12.4645 11.7929 13.1716 11.5 14 11.5C14.8284 11.5 15.5355 11.7929 16.1213 12.3787C16.7071 12.9645 17 13.6716 17 14.5C16.9991 15.328 16.7058 16.0348 16.1203 16.6203C15.5348 17.2058 14.828 17.4991 14 17.5Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

/** border_color.svg — rust edit pencil for the "About Me" section. */
function EditPencil() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.5 20.9581V18.2081H18.5V20.9581H1.5ZM4.79167 13.3556H6.06083L12.4775 6.90202L11.8463 6.25452L11.1827 5.60702L4.79167 12.0862V13.3556ZM3.41667 14.7306V11.5014L13.1619 1.74014C13.2644 1.6375 13.3683 1.56938 13.4735 1.53577C13.5788 1.50216 13.6791 1.48535 13.7744 1.48535C13.8697 1.48535 13.9685 1.50216 14.0708 1.53577C14.1732 1.56938 14.2633 1.63216 14.3413 1.7241L16.3446 3.73202C16.4225 3.83466 16.4844 3.9341 16.5304 4.03035C16.5764 4.12674 16.5994 4.22306 16.5994 4.31931C16.5994 4.42251 16.5756 4.52757 16.5279 4.63452C16.4804 4.74146 16.4193 4.83917 16.3446 4.92764L6.64583 14.7306H3.41667Z"
        fill={RUST}
      />
    </Svg>
  );
}

function SportChip({ sport }: { sport: Sport }) {
  return (
    <View style={styles.chip}>
      {sport.icon ? (
        <Image
          source={sport.icon}
          style={styles.chipIcon}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.chipEmoji}>{sport.emoji}</Text>
      )}
      <Text style={styles.chipText}>{sport.label}</Text>
    </View>
  );
}

/** Small circled "i" for the attendance footer note. */
function InfoIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke="#9AA4B2" strokeWidth={1.5} />
      <Path
        d="M12 11v5"
        stroke="#9AA4B2"
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={8} r={1} fill="#9AA4B2" />
    </Svg>
  );
}

/** Main Ui_Light_V1.svg — rust calendar badge next to "Assessment Report". */
function CalendarBadge() {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Rect width={48} height={48} rx={24} fill="#FFF8F6" />
      <Path
        d="M17.4657 33.7503C16.8265 33.7503 16.2892 33.5324 15.8537 33.0968C15.418 32.6613 15.2002 32.1239 15.2002 31.4848V18.4158C15.2002 17.7766 15.418 17.2393 15.8537 16.8038C16.2892 16.3681 16.8265 16.1503 17.4657 16.1503H18.4347V14.0195H20.1617V16.1503H27.9157V14.0195H29.5657V16.1503H30.5347C31.1739 16.1503 31.7112 16.3681 32.1467 16.8038C32.5824 17.2393 32.8002 17.7766 32.8002 18.4158V31.4848C32.8002 32.1239 32.5824 32.6613 32.1467 33.0968C31.7112 33.5324 31.1739 33.7503 30.5347 33.7503H17.4657ZM17.4657 32.1003H30.5347C30.6887 32.1003 30.8298 32.0362 30.9579 31.908C31.0861 31.7799 31.1502 31.6388 31.1502 31.4848V22.1158H16.8502V31.4848C16.8502 31.6388 16.9143 31.7799 17.0424 31.908C17.1706 32.0362 17.3117 32.1003 17.4657 32.1003ZM16.8502 20.4655H31.1502V18.4158C31.1502 18.2618 31.0861 18.1207 30.9579 17.9925C30.8298 17.8644 30.6887 17.8003 30.5347 17.8003H17.4657C17.3117 17.8003 17.1706 17.8644 17.0424 17.9925C16.9143 18.1207 16.8502 18.2618 16.8502 18.4158V20.4655Z"
        fill={RUST}
      />
    </Svg>
  );
}

/** Outline arrow-right button used on each assessment row. */
function ArrowRight() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h13"
        stroke={RUST}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 6l6 6-6 6"
        stroke={RUST}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function AssessmentRow({
  item,
  onPress,
}: {
  item: Assessment;
  onPress: () => void;
}) {
  return (
    <View style={styles.assessRow}>
      <View style={styles.assessLeft}>
        {item.icon ? (
          <Image
            source={item.icon}
            style={styles.assessIcon}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.assessEmoji}>{item.emoji}</Text>
        )}
        <View>
          <Text style={styles.assessName}>{item.label}</Text>
          <Text style={styles.assessCount}>{item.count}</Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        hitSlop={6}
        onPress={onPress}
        style={styles.arrowBtn}
      >
        <ArrowRight />
      </Pressable>
    </View>
  );
}

/**
 * "My Profile" view screen reached from Settings -> "View Profile". Shows the
 * student profile card (banner + avatar + about + enrolled sports) and an
 * attendance section, matching the Figma "My Profile / View Mode".
 */
export function MyProfileScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [editing, setEditing] = useState(false);
  const [about, setAbout] = useState(ABOUT_DEFAULT);
  const [draft, setDraft] = useState(ABOUT_DEFAULT);

  const startEdit = () => {
    setDraft(about);
    setEditing(true);
  };
  const cancelEdit = () => {
    Keyboard.dismiss();
    setEditing(false);
  };
  const saveEdit = () => {
    Keyboard.dismiss();
    setAbout(draft.trim());
    setEditing(false);
  };

  return (
    <Screen padded={false} edges={['top']}>
      <ProfileBackground />

      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <BackChevron />
        </Pressable>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.body,
          editing && { paddingBottom: insets.bottom + 96 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.banner}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.content}>
            <View style={styles.avatarWrap}>
              <Image source={AVATAR} style={styles.avatar} />
              <View style={styles.cameraBadge}>
                <CameraBadge />
              </View>
            </View>

            <Text style={styles.name}>Aryan Saxena</Text>
            <Text style={styles.schoolClass}>
              JDM High school • Class 7 - A
            </Text>

            <View style={styles.divider} />

            {editing ? (
              <View style={styles.textarea}>
                <TextInput
                  style={styles.textareaInput}
                  placeholder="Write something about yourself..."
                  placeholderTextColor={PLACEHOLDER}
                  value={draft}
                  onChangeText={setDraft}
                  multiline
                  maxLength={ABOUT_MAX}
                  textAlignVertical="top"
                />
                <Text style={styles.charCount}>
                  {ABOUT_MAX - draft.length} chars max
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.aboutHeader}>
                  <Text style={styles.aboutLabel}>About Me</Text>
                  <Pressable hitSlop={8} onPress={startEdit}>
                    <EditPencil />
                  </Pressable>
                </View>
                <Text style={styles.aboutBody}>{about}</Text>
              </>
            )}

            <View style={styles.divider} />

            <Text style={styles.sportsLabel}>Enrolled Sports</Text>
            <View style={styles.chips}>
              {SPORTS.map(sport => (
                <SportChip key={sport.label} sport={sport} />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.attendance}>
          <Text style={styles.attendanceTitle}>Attendance</Text>
          <Text style={styles.attendanceSub}>Attended: 22 / 26 sessions</Text>
        </View>
        <ScheduleCalendarCard />

        <View style={styles.attnFooter}>
          <View style={styles.attnNote}>
            <InfoIcon />
            <Text style={styles.attnNoteText}>
              Attendance is marked by your coach and cannot be edited.
            </Text>
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: PRESENT }]} />
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: ABSENT }]} />
              <Text style={styles.legendText}>Absent</Text>
            </View>
          </View>
        </View>

        <View style={styles.assessCard}>
          <View style={styles.assessHeader}>
            <View style={styles.assessHeaderText}>
              <Text style={styles.assessTitle}>Assessment Report</Text>
              <Text style={styles.assessSub}>You have 3 new assessments</Text>
            </View>
            <CalendarBadge />
          </View>

          {ASSESSMENTS.map(item => (
            <AssessmentRow
              key={item.label}
              item={item}
              onPress={() =>
                navigation.navigate('AssessmentReport', { sport: item.label })
              }
            />
          ))}

          <Pressable accessibilityRole="button" style={styles.downloadBtn}>
            <Text style={styles.downloadText}>Download Full Report</Text>
          </Pressable>
        </View>
      </ScrollView>

      {editing && (
        <View style={[styles.actionBar, { paddingBottom: insets.bottom + 12 }]}>
          <Pressable
            accessibilityRole="button"
            onPress={cancelEdit}
            style={[styles.actionBtn, styles.cancelBtn]}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={saveEdit}
            style={[styles.actionBtn, styles.saveBtn]}
          >
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>
      )}
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
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
    flex: 1,
    textAlign: 'center',
    marginRight: 36,
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: NAVY,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    overflow: 'hidden',
    shadowColor: '#0C1A4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  banner: {
    height: 96,
    backgroundColor: '#FBE7E1',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  logo: {
    width: 105,
    height: 40,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  avatarWrap: {
    width: 84,
    height: 84,
    marginTop: -42,
    marginBottom: 8,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#EFEFEF',
  },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
  },
  name: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: NAME,
  },
  schoolClass: {
    fontFamily: fontFamily.latoRegular,
    fontSize: 14,
    lineHeight: 18,
    color: SUBTEXT,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginVertical: 16,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  aboutLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: ABOUT_LABEL,
  },
  aboutBody: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: ABOUT_BODY,
  },
  textarea: {
    borderWidth: 1,
    borderColor: TEXTAREA_BORDER,
    borderRadius: 12,
    padding: 12,
    minHeight: 150,
  },
  textareaInput: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: NAVY,
    padding: 0,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: PLACEHOLDER,
    marginTop: 8,
  },
  sportsLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: ABOUT_LABEL,
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CHIP_BORDER,
    backgroundColor: CHIP_BG,
  },
  chipIcon: {
    width: 16,
    height: 16,
  },
  chipEmoji: {
    fontSize: 13,
  },
  chipText: {
    fontFamily: fontFamily.latoMedium,
    fontSize: 12,
    lineHeight: 16,
    color: CHIP_TEXT,
  },
  attendance: {
    marginTop: 4,
    gap: 2,
  },
  attendanceTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
    color: NAVY,
  },
  attendanceSub: {
    fontFamily: fontFamily.latoRegular,
    fontSize: 14,
    lineHeight: 18,
    color: '#606060',
  },
  attnFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: -8,
    paddingHorizontal: 4,
  },
  attnNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  attnNoteText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: NAVY,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    color: NOTE,
  },
  assessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    padding: 16,
    gap: 12,
    shadowColor: '#0C1A4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  assessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  assessHeaderText: {
    flex: 1,
    gap: 2,
  },
  assessTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: NAME,
  },
  assessSub: {
    fontFamily: fontFamily.latoRegular,
    fontSize: 14,
    lineHeight: 18,
    color: SUBTEXT,
  },
  assessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: ASSESS_ROW_BORDER,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  assessLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  assessIcon: {
    width: 24,
    height: 24,
  },
  assessEmoji: {
    fontSize: 20,
    width: 24,
    textAlign: 'center',
  },
  assessName: {
    fontFamily: fontFamily.semibold,
    fontSize: 18,
    lineHeight: 24,
    color: ASSESS_NAME,
  },
  assessCount: {
    fontFamily: fontFamily.latoMedium,
    fontSize: 14,
    lineHeight: 18,
    color: ASSESS_COUNT,
    marginTop: 2,
  },
  arrowBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: ARROW_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 4,
  },
  downloadText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 22,
    color: NAVY,
  },
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: DIVIDER,
  },
  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: RUST,
    backgroundColor: '#FFFFFF',
  },
  saveBtn: {
    backgroundColor: RUST,
  },
  cancelText: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: RUST,
  },
  saveText: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
  },
});
