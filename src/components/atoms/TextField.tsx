import React, { forwardRef } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@/theme';

import { Typography } from './Typography';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

/**
 * Themed text input with label + inline error. The placeholder color is pulled
 * from theme tokens (TextInput's `placeholderTextColor` needs a concrete value,
 * not a class), so it adapts to light/dark like everything else.
 */
export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, error, className = '', ...rest }, ref) => {
    const { colors } = useTheme();
    const borderClass = error ? 'border-error' : 'border-border';

    return (
      <View className="w-full">
        {label ? (
          <Typography variant="label" className="mb-1.5">
            {label}
          </Typography>
        ) : null}
        <TextInput
          ref={ref}
          placeholderTextColor={colors.textMuted}
          className={`h-12 rounded-lg border bg-surface px-3 text-base text-text ${borderClass} ${className}`}
          {...rest}
        />
        {error ? (
          <Typography variant="caption" color="error" className="mt-1">
            {error}
          </Typography>
        ) : null}
      </View>
    );
  },
);

TextField.displayName = 'TextField';
