import React from 'react';
import { Pressable, View } from 'react-native';

import { Screen, Typography } from '@/components/atoms';
import { useTheme, type ThemeMode } from '@/theme';

const OPTIONS: { mode: ThemeMode; label: string; description: string }[] = [
  { mode: 'system', label: 'System', description: 'Match device setting' },
  { mode: 'light', label: 'Light', description: 'Always light' },
  { mode: 'dark', label: 'Dark', description: 'Always dark' },
];

/**
 * App settings. The theme selector switches light/dark/system instantly and
 * persists the choice (handled by the ThemeProvider via MMKV).
 */
export function SettingsScreen() {
  const { mode, setMode } = useTheme();

  return (
    <Screen scroll>
      <Typography variant="h1" className="mb-6">
        Settings
      </Typography>

      <Typography variant="label" color="muted" className="mb-2">
        APPEARANCE
      </Typography>

      <View className="overflow-hidden rounded-xl bg-surface">
        {OPTIONS.map((option, index) => {
          const selected = option.mode === mode;
          return (
            <Pressable
              key={option.mode}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => setMode(option.mode)}
              className={`flex-row items-center justify-between p-4 ${
                index > 0 ? 'border-t border-border' : ''
              }`}
            >
              <View>
                <Typography variant="title">{option.label}</Typography>
                <Typography variant="caption" color="muted" className="mt-0.5">
                  {option.description}
                </Typography>
              </View>
              {selected ? (
                <View className="h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <View className="h-2 w-2 rounded-full bg-primary-content" />
                </View>
              ) : (
                <View className="h-5 w-5 rounded-full border border-border" />
              )}
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}
