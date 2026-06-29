import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { fontFamily } from '@/theme';

const STORY = require('@/assets/images/story-status.png');
const AVATAR = require('@/assets/images/dashboard-avatar.png');

const TRACK = '#C7C7C7';
const FILL = '#BE522F';
const TIME = '#C7C7C7';

// How long the story is shown before auto-closing.
const DURATION = 5000;

interface StatusStoryModalProps {
  visible: boolean;
  onClose: () => void;
}

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Full-screen story viewer ("My Profile - View Mode") opened from the profile
 * action sheet's "View status". Shows the status image full-bleed with a top
 * progress bar that auto-fills and dismisses the story when complete.
 */
export function StatusStoryModal({ visible, onClose }: StatusStoryModalProps) {
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      progress.setValue(0);
      return;
    }
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: DURATION,
      easing: Easing.linear,
      useNativeDriver: false,
    });
    anim.start(({ finished }) => {
      if (finished) onClose();
    });
    return () => anim.stop();
  }, [visible, progress, onClose]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <Image source={STORY} style={styles.image} resizeMode="cover" />

        <View style={[styles.overlay, { paddingTop: insets.top + 8 }]}>
          <View style={styles.track}>
            <Animated.View style={[styles.fill, { width }]} />
          </View>

          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              hitSlop={8}
              onPress={onClose}
              style={styles.back}
            >
              <BackIcon />
            </Pressable>
            <Image source={AVATAR} style={styles.avatar} />
            <View style={styles.meta}>
              <Text style={styles.name}>Me</Text>
              <Text style={styles.time}>10:50 AM</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    paddingHorizontal: 16,
  },
  track: {
    height: 4,
    borderRadius: 50,
    backgroundColor: TRACK,
    overflow: 'hidden',
  },
  fill: {
    height: 4,
    borderRadius: 50,
    backgroundColor: FILL,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  back: {
    paddingRight: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  meta: {
    justifyContent: 'center',
  },
  name: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  time: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: TIME,
  },
});
