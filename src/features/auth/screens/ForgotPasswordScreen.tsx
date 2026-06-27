import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { StatusDialog } from '@/features/auth/components/StatusDialog';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/validation/forgotPasswordSchema';
import type { AuthStackParamList } from '@/navigation/types';
import { fontFamily } from '@/theme';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

const LOGO = require('@/assets/images/school-logo.png');

const NAVY = '#012233';
const RUST = '#B54232';
const ERROR = '#E5484D';
const INPUT_BORDER = '#A3A09D';
const INPUT_TEXT = '#1F2937';
const PLACEHOLDER = '#9CA3AF';
const SUBTITLE = '#6B7280';

/** Small "x" clear icon shown inside the input when it has a value. */
function ClearIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 7l10 10M17 7L7 17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * "Forgot Password" screen. Mirrors the login styling (warm gradient, centered
 * logo + headline) with a single user-id field, an inline error state, a rust
 * "Request New Password" button, and a "Back to Login" link. On a successful
 * request it shows the "Mail Sent Successfully" dialog.
 */
export function ForgotPasswordScreen() {
  const navigation = useNavigation<Nav>();
  const [sent, setSent] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { userId: '' },
    mode: 'onSubmit',
  });

  const onSubmit = useCallback((_values: ForgotPasswordFormValues) => {
    setSent(true);
  }, []);

  const goToLogin = useCallback(() => {
    setSent(false);
    navigation.navigate('Login');
  }, [navigation]);

  const hasError = Boolean(errors.userId);

  return (
    <View style={styles.root}>
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <LinearGradient id="bg" x1="0" y1="0" x2="1" y2="0.15">
            <Stop offset="0" stopColor="#FFEFE1" />
            <Stop offset="0.6" stopColor="#FFFCF9" />
            <Stop offset="1" stopColor="#FFFFFF" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bg)" />
      </Svg>

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />

          <Text style={styles.heading}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Please enter your registered user id to request a new password.
          </Text>

          <Controller
            control={control}
            name="userId"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View
                  style={[
                    styles.inputWrap,
                    styles.inputFirst,
                    hasError && styles.inputWrapError,
                  ]}
                >
                  <TextInput
                    style={styles.inputFlex}
                    placeholder="User ID"
                    placeholderTextColor={PLACEHOLDER}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  {value ? (
                    <Pressable
                      hitSlop={10}
                      accessibilityRole="button"
                      accessibilityLabel="Clear user id"
                      onPress={() => setValue('userId', '')}
                    >
                      <ClearIcon color={hasError ? ERROR : INPUT_TEXT} />
                    </Pressable>
                  ) : null}
                </View>
                {hasError ? (
                  <Text style={styles.errorText}>{errors.userId?.message}</Text>
                ) : null}
              </>
            )}
          />

          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit(onSubmit)}
            android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            style={styles.request}
          >
            <Text style={styles.requestText}>Request New Password</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={goToLogin}
            style={styles.backWrap}
          >
            <Text style={styles.back}>Back to Login</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>

      <StatusDialog
        visible={sent}
        variant="success"
        title="Mail Sent Successfully!"
        message="We have shared your new password to your registered email id."
        primaryLabel="Redirect to E-mail"
        onPrimary={() => setSent(false)}
        footerLabel="Back to Login"
        onFooter={goToLogin}
        onRequestClose={() => setSent(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safe: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  logo: {
    width: 86,
    height: 50,
    alignSelf: 'center',
    marginTop: 56,
  },
  heading: {
    marginTop: 48,
    fontFamily: fontFamily.bold,
    fontSize: 30,
    color: NAVY,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 22,
    color: SUBTITLE,
    textAlign: 'center',
    paddingHorizontal: 6,
  },
  inputWrap: {
    height: 58,
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapError: {
    borderColor: ERROR,
  },
  inputFirst: {
    marginTop: 36,
  },
  inputFlex: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: INPUT_TEXT,
    padding: 0,
  },
  errorText: {
    marginTop: 8,
    marginLeft: 4,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: ERROR,
  },
  request: {
    marginTop: 28,
    height: 52,
    borderRadius: 26,
    backgroundColor: RUST,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  backWrap: {
    marginTop: 22,
    alignItems: 'center',
  },
  back: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    color: NAVY,
  },
});
