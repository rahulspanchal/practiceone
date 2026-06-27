import React from 'react';
import { View } from 'react-native';

import { Screen, Typography } from '@/components/atoms';

interface PlaceholderScreenProps {
  title: string;
  subtitle?: string;
}

/**
 * Lightweight template for routes that are wired into navigation but not yet
 * fully implemented. Keeps the skeleton runnable while features are built one at
 * a time, without duplicating boilerplate across stub screens.
 */
export function PlaceholderScreen({ title, subtitle }: PlaceholderScreenProps) {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body" color="muted" className="mt-2 text-center">
          {subtitle ?? 'Coming soon'}
        </Typography>
      </View>
    </Screen>
  );
}
