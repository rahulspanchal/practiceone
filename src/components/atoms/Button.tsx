import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
  type PressableProps,
} from 'react-native';

import { Typography, type TypographyColor } from './Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  outline: 'bg-transparent border border-border',
  ghost: 'bg-transparent',
};

const LABEL_COLOR: Record<ButtonVariant, TypographyColor> = {
  primary: 'inverse',
  secondary: 'inverse',
  outline: 'default',
  ghost: 'primary',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 rounded-md',
  md: 'h-12 px-4 rounded-lg',
  lg: 'h-14 px-6 rounded-xl',
};

/**
 * Themed, accessible button. Variants/sizes are token-driven, it exposes a
 * loading state, keeps a 44pt+ touch target at md/lg, and dims on press via the
 * NativeWind `active:` variant.
 */
export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = [
    'flex-row items-center justify-center',
    SIZE_CLASS[size],
    VARIANT_CLASS[variant],
    fullWidth ? 'w-full' : 'self-start',
    isDisabled ? 'opacity-40' : 'opacity-100 active:opacity-80',
    className,
  ].join(' ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={classes}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {leftIcon ? <View className="mr-2">{leftIcon}</View> : null}
          <Typography variant="label" color={LABEL_COLOR[variant]}>
            {label}
          </Typography>
        </>
      )}
    </Pressable>
  );
}
