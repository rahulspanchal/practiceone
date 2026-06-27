import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { fontFamily } from '@/theme';

const RUST = '#B54232';
const NAVY = '#012233';
const GREEN = '#2BA84A';
const RED = '#E5484D';
const MUTED = '#6B7280';
const BLUE = '#396CDC';

export type StatusVariant = 'success' | 'error' | 'warning';

interface StatusDialogProps {
  visible: boolean;
  variant: StatusVariant;
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
  /** Optional footer link under the card (e.g. "Back to Login"). */
  footerLabel?: string;
  onFooter?: () => void;
  /** Render the footer link in the brand blue instead of navy. */
  footerAccent?: boolean;
  onRequestClose?: () => void;
}

function StatusIcon({ variant }: { variant: StatusVariant }) {
  const color = variant === 'success' ? GREEN : RED;
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64" fill="none">
      <Circle cx={32} cy={32} r={32} fill={color} />
      {variant === 'success' ? (
        <Path
          d="M20 33l8 8 16-16"
          stroke="#FFFFFF"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : variant === 'error' ? (
        <Path
          d="M23 23l18 18M41 23L23 41"
          stroke="#FFFFFF"
          strokeWidth={4}
          strokeLinecap="round"
        />
      ) : (
        <Path
          d="M32 18v20M32 45.5v.5"
          stroke="#FFFFFF"
          strokeWidth={4.5}
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
}

/**
 * Centered modal dialog used for the auth flow result states: "Mail Sent
 * Successfully" (success), "Incorrect Id or Password" (error), and "Try Limit
 * Exceeded" (warning). Dims the screen behind and shows an icon, title, message,
 * a rust primary action, and an optional footer link.
 */
export function StatusDialog({
  visible,
  variant,
  title,
  message,
  primaryLabel,
  onPrimary,
  footerLabel,
  onFooter,
  footerAccent = false,
  onRequestClose,
}: StatusDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <StatusIcon variant={variant} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <Pressable
            accessibilityRole="button"
            onPress={onPrimary}
            android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            style={styles.primary}
          >
            <Text style={styles.primaryText}>{primaryLabel}</Text>
          </Pressable>
        </View>

        {footerLabel ? (
          <Pressable
            accessibilityRole="button"
            onPress={onFooter}
            style={styles.footerWrap}
          >
            <Text style={[styles.footer, footerAccent && styles.footerAccent]}>
              {footerLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    marginTop: 18,
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: NAVY,
    textAlign: 'center',
  },
  message: {
    marginTop: 10,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: MUTED,
    textAlign: 'center',
  },
  primary: {
    marginTop: 22,
    height: 48,
    minWidth: 170,
    paddingHorizontal: 32,
    borderRadius: 24,
    backgroundColor: RUST,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  footerWrap: {
    marginTop: 18,
  },
  footer: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    color: NAVY,
    textAlign: 'center',
  },
  footerAccent: {
    color: BLUE,
  },
});
