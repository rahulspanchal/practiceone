import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { fontFamily } from '@/theme';

const TITLE = '#1A1A1A';
const OPTION = '#333333';
const CLOSE = '#BE522F';

interface ProfileActionSheetProps {
  visible: boolean;
  onClose: () => void;
  onViewSettings?: () => void;
  onViewStatus?: () => void;
}

function CloseIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 8L8 16M8 8l8 8"
        stroke={CLOSE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Bottom action sheet opened from the dashboard profile avatar. Slides up over a
 * dimmed backdrop and offers "View Settings" / "View status".
 */
export function ProfileActionSheet({
  visible,
  onClose,
  onViewSettings,
  onViewStatus,
}: ProfileActionSheetProps) {
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      Animated.timing(anim, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setRendered(false);
      });
    }
  }, [visible, anim]);

  if (!rendered) return null;

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [360, 0],
  });

  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.backdrop, { opacity: anim }]}>
        <Pressable style={styles.fill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + 16, transform: [{ translateY }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Select Action</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            hitSlop={8}
            onPress={onClose}
            style={styles.close}
          >
            <CloseIcon />
          </Pressable>
        </View>

        <View style={styles.options}>
          <Pressable
            accessibilityRole="button"
            android_ripple={{ color: 'rgba(190,82,47,0.08)' }}
            onPress={onViewSettings}
            style={styles.option}
          >
            <Text style={styles.optionText}>View Settings</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable
            accessibilityRole="button"
            android_ripple={{ color: 'rgba(190,82,47,0.08)' }}
            onPress={onViewStatus}
            style={styles.option}
          >
            <Text style={styles.optionText}>View status</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    color: TITLE,
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F6E7E1',
  },
  options: {
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: '#FFF1EE',
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  optionText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: OPTION,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: '#F6E1D9',
  },
});
