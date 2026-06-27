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

import { tokenStorage } from '@/features/auth/services/tokenStorage';
import {
  loginSchema,
  type LoginFormValues,
} from '@/features/auth/validation/loginSchema';
import type { RootStackParamList } from '@/navigation/types';
import { useAppDispatch } from '@/store';
import { authenticated } from '@/store/slices/authSlice';
import { fontFamily } from '@/theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const LOGO = require('@/assets/images/school-logo.png');

const NAVY = '#012233';
const RUST = '#B54232';
const BLUE = '#396CDC';
const INPUT_BORDER = '#A3A09D';
const INPUT_TEXT = '#1F2937';
const PLACEHOLDER = '#9CA3AF';
const SUBTITLE = '#6B7280';

/** Open-eye / eye-off icon used by the password field's visibility toggle. */
function EyeIcon({ off }: { off: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
        stroke={INPUT_TEXT}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke={INPUT_TEXT}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {off ? (
        <Path
          d="M4 4l16 16"
          stroke={INPUT_TEXT}
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      ) : null}
    </Svg>
  );
}

/**
 * Login ("Get Started") screen. Matches the school sign-in design: warm gradient
 * backdrop, centered logo + headline, user id / password fields, a right-aligned
 * "Forgot Password?" link, and a rust pill "Sign In" button.
 */
export function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      tokenStorage.setTokens({
        accessToken: `mock.${values.email}`,
        refreshToken: 'mock.refresh',
      });
      dispatch(authenticated({ userId: values.email }));
      navigation.replace('Main', { screen: 'HomeFeed' });
    },
    [dispatch, navigation],
  );

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

          <Text style={styles.heading}>Get Started</Text>
          <Text style={styles.subtitle}>
            Please enter the user id and password provided by the school admin
            to continue.
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.inputWrap, styles.inputFirst]}>
                <TextInput
                  style={styles.input}
                  placeholder="User ID"
                  placeholderTextColor={PLACEHOLDER}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.inputWrap, styles.inputRow]}>
                <TextInput
                  style={styles.inputFlex}
                  placeholder="Password"
                  placeholderTextColor={PLACEHOLDER}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                <Pressable
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  onPress={() => setShowPassword(p => !p)}
                >
                  <EyeIcon off={showPassword} />
                </Pressable>
              </View>
            )}
          />

          <Pressable
            accessibilityRole="button"
            onPress={() =>
              navigation.navigate('Auth', { screen: 'ForgotPassword' })
            }
            style={styles.forgotWrap}
          >
            <Text style={styles.forgot}>Forgot Password?</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            android_ripple={{
              color: 'rgba(255,255,255,0.2)',
              borderless: false,
            }}
            style={styles.signIn}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
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
    justifyContent: 'center',
  },
  inputFirst: {
    marginTop: 36,
  },
  inputRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: INPUT_TEXT,
    padding: 0,
  },
  inputFlex: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: INPUT_TEXT,
    padding: 0,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },
  forgot: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    color: BLUE,
  },
  signIn: {
    alignSelf: 'center',
    marginTop: 28,
    height: 58,
    paddingHorizontal: 44,
    minWidth: 193,
    borderRadius: 29,
    backgroundColor: RUST,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: '#FFFFFF',
  },
});
