import React from 'react';
import { Text, type TextProps } from 'react-native';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'title'
  | 'body'
  | 'caption'
  | 'label';

export type TypographyColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'inverse'
  | 'error';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  className?: string;
}

const VARIANT_CLASS: Record<TypographyVariant, string> = {
  display: 'text-4xl font-extrabold',
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-bold',
  title: 'text-lg font-semibold',
  body: 'text-base font-normal',
  caption: 'text-sm font-normal',
  label: 'text-sm font-medium',
};

const COLOR_CLASS: Record<TypographyColor, string> = {
  default: 'text-text',
  muted: 'text-text-muted',
  primary: 'text-primary',
  inverse: 'text-primary-content',
  error: 'text-error',
};

/**
 * Themed text primitive. Every piece of text in the app should go through this
 * so typography + color come from tokens (and adapt to dark mode) automatically.
 * Supports Dynamic Type via the OS by default (no fixed scaling lock).
 */
export function Typography({
  variant = 'body',
  color = 'default',
  className = '',
  ...rest
}: TypographyProps) {
  return (
    <Text
      className={`${VARIANT_CLASS[variant]} ${COLOR_CLASS[color]} ${className}`}
      {...rest}
    />
  );
}
