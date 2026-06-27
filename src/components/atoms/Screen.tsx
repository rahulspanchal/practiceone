import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

interface ScreenProps {
  children: React.ReactNode;
  /** Wrap content in a ScrollView (use only for short, non-virtualized content). */
  scroll?: boolean;
  /** Apply standard horizontal/vertical padding. */
  padded?: boolean;
  edges?: readonly Edge[];
  className?: string;
}

/**
 * Standard screen container: themed background + safe-area handling (notches,
 * Dynamic Island, gesture bars). Use this as the root of every screen so safe
 * areas and background color are consistent and never hardcoded per screen.
 */
export function Screen({
  children,
  scroll = false,
  padded = true,
  edges = ['top', 'bottom'],
  className = '',
}: ScreenProps) {
  const contentClass = padded ? 'px-4 py-4' : '';

  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-background ${className}`}>
      {scroll ? (
        <ScrollView
          contentContainerClassName={`grow ${contentClass}`}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={`flex-1 ${contentClass}`}>{children}</View>
      )}
    </SafeAreaView>
  );
}
