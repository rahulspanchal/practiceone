import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
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

const AVATAR = require('@/assets/images/aryan-saxena.png');

const { width: WINDOW_W, height: WINDOW_H } = Dimensions.get('window');

const NAVY = '#012233';
const NAME = '#1F2937';
const SUBTEXT = '#4B5563';
const LABEL = '#333333';
const ICON = '#333333';
const CHEVRON = '#98A2B3';
const DIVIDER = '#F0F1F2';
const CARD_BORDER = '#F2F4F6';
const BACK_BG = '#FFE6E0';
const RUST = '#BE522F';

type Nav = NativeStackNavigationProp<HomeStackParamList>;

function SettingsBackground() {
  const insets = useSafeAreaInsets();
  return (
    <Svg
      pointerEvents="none"
      style={[styles.bg, { top: -insets.top }]}
      width={WINDOW_W}
      height={WINDOW_H + insets.top}
    >
      <Defs>
        <LinearGradient id="settingsBg" x1="0" y1="0" x2="0" y2="1">
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
        fill="url(#settingsBg)"
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

function ChevronRight() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
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

/** iconsax user-hexagon (from the supplied asset). */
function UserHexagonIcon({ color = ICON }: { color?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
      <Path
        fill={color}
        d="M9.99984 18.9589C9.44151 18.9589 8.87484 18.8172 8.37484 18.5256L3.4248 15.6672C2.4248 15.0839 1.7998 14.0089 1.7998 12.8506V7.15058C1.7998 5.99224 2.4248 4.91724 3.4248 4.33391L8.37484 1.47559C9.37484 0.892253 10.6165 0.892253 11.6248 1.47559L16.5748 4.33391C17.5748 4.91724 18.1998 5.99224 18.1998 7.15058V12.8506C18.1998 14.0089 17.5748 15.0839 16.5748 15.6672L11.6248 18.5256C11.1248 18.8172 10.5582 18.9589 9.99984 18.9589ZM9.99984 2.29224C9.65817 2.29224 9.30817 2.3839 8.99984 2.5589L4.0498 5.41724C3.43314 5.77557 3.0498 6.43391 3.0498 7.15058V12.8506C3.0498 13.5589 3.43314 14.2256 4.0498 14.5839L8.99984 17.4422C9.61651 17.8006 10.3832 17.8006 10.9998 17.4422L15.9498 14.5839C16.5665 14.2256 16.9498 13.5672 16.9498 12.8506V7.15058C16.9498 6.44224 16.5665 5.77557 15.9498 5.41724L10.9998 2.5589C10.6915 2.3839 10.3415 2.29224 9.99984 2.29224Z"
      />
      <Path
        fill={color}
        d="M9.99927 9.7915C8.5826 9.7915 7.43262 8.6415 7.43262 7.22484C7.43262 5.80817 8.5826 4.6582 9.99927 4.6582C11.4159 4.6582 12.5659 5.80817 12.5659 7.22484C12.5659 8.6415 11.4159 9.7915 9.99927 9.7915ZM9.99927 5.9082C9.27427 5.9082 8.6826 6.49984 8.6826 7.22484C8.6826 7.94984 9.27427 8.5415 9.99927 8.5415C10.7243 8.5415 11.3159 7.94984 11.3159 7.22484C11.3159 6.49984 10.7243 5.9082 9.99927 5.9082Z"
      />
      <Path
        fill={color}
        d="M13.3327 14.5096C12.991 14.5096 12.7077 14.2262 12.7077 13.8846C12.7077 12.7346 11.491 11.793 9.99935 11.793C8.50768 11.793 7.29102 12.7346 7.29102 13.8846C7.29102 14.2262 7.00768 14.5096 6.66602 14.5096C6.32435 14.5096 6.04102 14.2262 6.04102 13.8846C6.04102 12.0429 7.81602 10.543 9.99935 10.543C12.1827 10.543 13.9577 12.0429 13.9577 13.8846C13.9577 14.2262 13.6743 14.5096 13.3327 14.5096Z"
      />
    </Svg>
  );
}

/** iconsax tag-user — "Legaxy Athletes". */
function AthletesIcon({ color = ICON }: { color?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
      <Path
        fill={color}
        d="M10 18.9587C9.41667 18.9587 8.825 18.7337 8.38333 18.292L6.95832 16.8837C6.60832 16.5337 6.12501 16.342 5.63334 16.342H5C3.275 16.342 1.875 14.9503 1.875 13.242V4.14199C1.875 2.43366 3.275 1.04199 5 1.04199H15C16.725 1.04199 18.125 2.43366 18.125 4.14199V13.2337C18.125 14.942 16.725 16.3337 15 16.3337H14.3667C13.875 16.3337 13.3917 16.5337 13.0417 16.8753L11.6167 18.2837C11.175 18.7337 10.5833 18.9587 10 18.9587ZM5 2.29199C3.96667 2.29199 3.125 3.12533 3.125 4.14199V13.2337C3.125 14.2587 3.96667 15.0837 5 15.0837H5.63334C6.45834 15.0837 7.25831 15.417 7.84164 15.992L9.26667 17.4003C9.675 17.8003 10.3333 17.8003 10.7417 17.4003L12.1667 15.992C12.75 15.417 13.55 15.0837 14.375 15.0837H15C16.0333 15.0837 16.875 14.2503 16.875 13.2337V4.14199C16.875 3.11699 16.0333 2.29199 15 2.29199H5Z"
      />
      <Path
        fill={color}
        d="M10.0583 8.08301C10.0417 8.08301 10.0167 8.08301 10 8.08301C9.975 8.08301 9.94167 8.08301 9.91667 8.08301C8.7 8.04134 7.75 7.05801 7.75 5.83301C7.75 4.59134 8.75833 3.58301 10 3.58301C11.2417 3.58301 12.25 4.59134 12.25 5.83301C12.2417 7.05801 11.2917 8.04134 10.075 8.08301C10.075 8.08301 10.0667 8.08301 10.0583 8.08301ZM10 4.83301C9.45 4.83301 9 5.28301 9 5.83301C9 6.37467 9.425 6.81634 9.95833 6.83301C9.95833 6.82467 10.0083 6.82467 10.0667 6.83301C10.5917 6.79967 11 6.36634 11 5.83301C11 5.28301 10.55 4.83301 10 4.83301Z"
      />
      <Path
        fill={color}
        d="M10 13.9171C9.05 13.9171 8.10002 13.6671 7.35835 13.1754C6.65835 12.7087 6.25 12.0337 6.25 11.3171C6.25 10.6004 6.65002 9.91706 7.35835 9.45039C8.84167 8.46706 11.1583 8.46706 12.6333 9.45039C13.3333 9.91706 13.7417 10.6004 13.7417 11.3087C13.7417 12.0254 13.3417 12.7004 12.6333 13.1754C11.9 13.6754 10.95 13.9171 10 13.9171ZM8.04998 10.4921C7.69164 10.7337 7.5 11.0254 7.5 11.3171C7.5 11.6087 7.69998 11.9004 8.04998 12.1421C9.10833 12.8504 10.8833 12.8504 11.9417 12.1421C12.3 11.9004 12.5 11.6087 12.4917 11.3171C12.4917 11.0254 12.2917 10.7337 11.9417 10.4921C10.8917 9.78372 9.10833 9.78372 8.04998 10.4921Z"
      />
    </Svg>
  );
}

/** iconsax status — "View Status". */
function StatusIcon({ color = ICON }: { color?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
      <Path
        fill={color}
        d="M8.32516 18.7916C8.28349 18.7916 8.24182 18.7916 8.20016 18.775C5.00849 18.125 2.41682 15.775 1.45016 12.6583C1.35016 12.325 1.53349 11.975 1.85849 11.875C2.19182 11.775 2.54182 11.9583 2.64182 12.2833C3.47516 14.9666 5.70016 16.9833 8.45016 17.5416C8.79182 17.6083 9.00849 17.9416 8.93349 18.2833C8.87516 18.5833 8.60849 18.7916 8.32516 18.7916Z"
      />
      <Path
        fill={color}
        d="M18.2918 9.77532C17.9752 9.77532 17.7002 9.53366 17.6668 9.21699C17.2668 5.26699 13.9668 2.29199 10.0002 2.29199C6.02518 2.29199 2.73352 5.26699 2.33352 9.20866C2.30018 9.55033 2.00018 9.80866 1.65018 9.76699C1.30852 9.73366 1.05852 9.42533 1.09185 9.08366C1.55852 4.50033 5.39185 1.04199 10.0002 1.04199C14.6168 1.04199 18.4502 4.50033 18.9085 9.08366C18.9418 9.42533 18.6918 9.73366 18.3502 9.76699C18.3335 9.77533 18.3085 9.77532 18.2918 9.77532Z"
      />
      <Path
        fill={color}
        d="M11.6751 18.7924C11.3834 18.7924 11.1251 18.5924 11.0667 18.2924C11.0001 17.9507 11.2167 17.6257 11.5501 17.559C14.2834 17.0007 16.5084 15.0007 17.3501 12.334C17.4501 12.0007 17.8084 11.8174 18.1334 11.9257C18.4667 12.0257 18.6417 12.384 18.5417 12.709C17.5584 15.809 14.9751 18.134 11.8001 18.784C11.7584 18.784 11.7167 18.7924 11.6751 18.7924Z"
      />
    </Svg>
  );
}

/** iconsax setting (octagon) — "Preferences". */
function PreferencesIcon({ color = ICON }: { color?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
      <Path
        fill={color}
        d="M9.99955 18.8587C9.44122 18.8587 8.87455 18.7337 8.43289 18.4753L3.84954 15.8337C1.98288 14.5753 1.86621 14.3837 1.86621 12.4087V7.59199C1.86621 5.61699 1.97454 5.42532 3.80788 4.18366L8.42455 1.51699C9.29955 1.00866 10.6746 1.00866 11.5496 1.51699L16.1496 4.16699C18.0162 5.42532 18.1329 5.61699 18.1329 7.59199V12.4003C18.1329 14.3753 18.0246 14.567 16.1912 15.8087L11.5746 18.4753C11.1246 18.7337 10.5579 18.8587 9.99955 18.8587ZM9.99955 2.39199C9.64955 2.39199 9.30789 2.45866 9.06622 2.60033L4.48288 5.25033C3.12454 6.16699 3.12454 6.16699 3.12454 7.59199V12.4003C3.12454 13.8253 3.12454 13.8253 4.51621 14.767L9.06622 17.392C9.55789 17.6753 10.4496 17.6753 10.9412 17.392L15.5246 14.742C16.8746 13.8253 16.8746 13.8253 16.8746 12.4003V7.59199C16.8746 6.16699 16.8746 6.16699 15.4829 5.22533L10.9329 2.60033C10.6912 2.45866 10.3496 2.39199 9.99955 2.39199Z"
      />
      <Path
        fill={color}
        d="M10 13.125C8.275 13.125 6.875 11.725 6.875 10C6.875 8.275 8.275 6.875 10 6.875C11.725 6.875 13.125 8.275 13.125 10C13.125 11.725 11.725 13.125 10 13.125ZM10 8.125C8.96667 8.125 8.125 8.96667 8.125 10C8.125 11.0333 8.96667 11.875 10 11.875C11.0333 11.875 11.875 11.0333 11.875 10C11.875 8.96667 11.0333 8.125 10 8.125Z"
      />
    </Svg>
  );
}

/** iconsax logout-01 — "Log Out". */
function LogoutIcon({ color = ICON }: { color?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 20 20" fill="none">
      <Path
        fill={color}
        d="M14.5331 12.8085C14.3747 12.8085 14.2164 12.7502 14.0914 12.6252C13.8497 12.3835 13.8497 11.9835 14.0914 11.7418L15.7831 10.0502L14.0914 8.3585C13.8497 8.11686 13.8497 7.71686 14.0914 7.4752C14.3331 7.23353 14.7331 7.23353 14.9747 7.4752L17.1081 9.6085C17.3497 9.85017 17.3497 10.2502 17.1081 10.4918L14.9747 12.6252C14.8497 12.7502 14.6914 12.8085 14.5331 12.8085Z"
      />
      <Path
        fill={color}
        d="M16.6088 10.6748H8.13379C7.79212 10.6748 7.50879 10.3915 7.50879 10.0498C7.50879 9.70814 7.79212 9.4248 8.13379 9.4248H16.6088C16.9504 9.4248 17.2338 9.70814 17.2338 10.0498C17.2338 10.3915 16.9504 10.6748 16.6088 10.6748Z"
      />
      <Path
        fill={color}
        d="M9.80045 17.2913C5.50879 17.2913 2.50879 14.2913 2.50879 9.99967C2.50879 5.70801 5.50879 2.70801 9.80045 2.70801C10.1421 2.70801 10.4254 2.99134 10.4254 3.33301C10.4254 3.67467 10.1421 3.95801 9.80045 3.95801C6.24212 3.95801 3.75879 6.44134 3.75879 9.99967C3.75879 13.558 6.24212 16.0413 9.80045 16.0413C10.1421 16.0413 10.4254 16.3247 10.4254 16.6663C10.4254 17.008 10.1421 17.2913 9.80045 17.2913Z"
      />
    </Svg>
  );
}

interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

function MenuRow({ icon, label, onPress }: MenuRowProps) {
  return (
    <Pressable
      style={styles.menuRow}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.04)' }}
    >
      <View style={styles.menuLeft}>
        {icon}
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <ChevronRight />
    </Pressable>
  );
}

/**
 * Settings screen reached from the dashboard avatar -> "View Settings". Shows the
 * student profile card (avatar + name + "View Profile") and a menu card with the
 * account actions, matching the Figma "My Profile / View Mode - Settings".
 */
export function SettingsScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <Screen padded={false} edges={['top']}>
      <SettingsBackground />

      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <BackChevron />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image source={AVATAR} style={styles.avatar} />
            <View style={styles.profileTexts}>
              <Text style={styles.name}>Aryan Saxena</Text>
              <Text style={styles.class}>Class 7-A</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Pressable
            style={styles.viewProfileRow}
            android_ripple={{ color: 'rgba(0,0,0,0.04)' }}
            onPress={() => navigation.navigate('MyProfile')}
          >
            <View style={styles.menuLeft}>
              <UserHexagonIcon />
              <Text style={styles.menuLabel}>View Profile</Text>
            </View>
            <ChevronRight />
          </Pressable>
        </View>

        <View style={styles.card}>
          <MenuRow icon={<AthletesIcon />} label="Legaxy Athletes" />
          <View style={styles.divider} />
          <MenuRow icon={<StatusIcon />} label="View Status" />
          <View style={styles.divider} />
          <MenuRow icon={<PreferencesIcon />} label="Preferences" />
          <View style={styles.divider} />
          <MenuRow icon={<LogoutIcon />} label="Log Out" />
        </View>
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
    shadowColor: '#0C1A4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFEFEF',
  },
  profileTexts: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: NAME,
  },
  class: {
    fontFamily: fontFamily.latoRegular,
    fontSize: 14,
    lineHeight: 18,
    color: SUBTEXT,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
  },
  viewProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 22,
    color: LABEL,
  },
});
