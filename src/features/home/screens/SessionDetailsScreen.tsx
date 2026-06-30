import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { Screen } from '@/components/atoms';
import { fontFamily } from '@/theme';

const COACH = require('@/assets/images/coach-1.png');

const { width: WINDOW_W, height: WINDOW_H } = Dimensions.get('window');

const NAVY = '#012233';
const RUST = '#BE522F';
const ROLE = '#808B9A';
const OBJECTIVE = '#333333';
const ACCORDION_OPEN_TITLE = '#1F1F1F';
const ACCORDION_TITLE = '#606060';
const ACCORDION_BODY = '#000000';
const BORDER = '#F4F4F4';
const DIVIDER = '#F0F1F2';
const BACK_BG = '#FFE6E0';
const CHEVRON = '#606060';

interface AccordionItem {
  title: string;
  body?: string;
}

const ITEMS: AccordionItem[] = [
  {
    title: 'Greeting and debrief (5 minutes)',
    body: 'Welcome, coach & peer introductions, outline session goals. Getting to understand all the things and the main objectives that you will get to learn in the sessions.',
  },
  { title: 'General Warm-up (10 minutes)' },
  { title: 'Fun Movement Games (15 minutes)' },
  { title: 'Cricket Specific Warm-up (20 minutes)' },
  { title: 'Cricket Specific Warm-up (20 minutes)' },
  { title: 'Introduction to Cricket (20 minutes)' },
  { title: 'Cool-down and wrap up (10 minutes)' },
];

function ScreenBackground() {
  const insets = useSafeAreaInsets();
  return (
    <Svg
      pointerEvents="none"
      style={[styles.bg, { top: -insets.top }]}
      width={WINDOW_W}
      height={WINDOW_H + insets.top}
    >
      <Defs>
        <LinearGradient id="detailsBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FCE7D3" />
          <Stop offset="0.25" stopColor="#FFFFFF" />
          <Stop offset="0.85" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#FBE3C9" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width={WINDOW_W}
        height={WINDOW_H + insets.top}
        fill="url(#detailsBg)"
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

function Chevron({ open }: { open: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d={open ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'}
        stroke={CHEVRON}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function Accordion({
  item,
  open,
  onToggle,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={styles.accordion}>
      <Pressable style={styles.accordionHeader} onPress={onToggle}>
        <Text
          style={[styles.accordionTitle, open && styles.accordionTitleOpen]}
        >
          {item.title}
        </Text>
        <Chevron open={open} />
      </Pressable>
      {open && item.body ? (
        <Text style={styles.accordionBody}>{item.body}</Text>
      ) : null}
    </View>
  );
}

/**
 * "Football Session Details": coach header, an Objective section, and a list of
 * collapsible session-segment accordions. Reached by tapping a session card.
 */
export function SessionDetailsScreen() {
  const navigation = useNavigation();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <Screen padded={false} edges={['top']}>
      <ScreenBackground />

      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <BackChevron />
        </Pressable>
        <Text style={styles.headerTitle}>Football Session Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coachRow}>
          <View style={styles.accentBar} />
          <Image source={COACH} style={styles.avatar} />
          <View style={styles.coachTexts}>
            <Text style={styles.coachName}>Arham Khan</Text>
            <Text style={styles.coachRole}>Football Coach</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.objective}>Objective</Text>

        <View style={styles.accordions}>
          {ITEMS.map((item, index) => (
            <Accordion
              key={`${item.title}-${index}`}
              item={item}
              open={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
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
    gap: 12,
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
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: NAVY,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 32,
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
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 22,
    color: NAVY,
  },
  coachRole: {
    fontFamily: fontFamily.latoRegular,
    fontSize: 14,
    lineHeight: 18,
    color: ROLE,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginVertical: 16,
  },
  objective: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: OBJECTIVE,
    marginBottom: 16,
  },
  accordions: {
    gap: 12,
  },
  accordion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  accordionTitle: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22,
    color: ACCORDION_TITLE,
  },
  accordionTitleOpen: {
    fontFamily: fontFamily.semibold,
    color: ACCORDION_OPEN_TITLE,
  },
  accordionBody: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: ACCORDION_BODY,
    marginTop: 12,
  },
});
