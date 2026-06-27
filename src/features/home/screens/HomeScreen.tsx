import React from 'react';
import { View } from 'react-native';

import { Screen, Typography } from '@/components/atoms';
import { shadow } from '@/theme';

const KPIS = [
  { label: 'Sessions', value: '24' },
  { label: 'Streak', value: '7d' },
  { label: 'Rank', value: '#3' },
];

/**
 * Home dashboard. A token-driven layout (cards, spacing, shadows from tokens)
 * that will host carousels/featured/recommended sections backed by TanStack
 * Query in later iterations.
 */
export function HomeScreen() {
  return (
    <Screen scroll>
      <Typography variant="h1">Dashboard</Typography>
      <Typography variant="body" color="muted" className="mb-6 mt-1">
        Welcome back
      </Typography>

      <View className="flex-row gap-3">
        {KPIS.map(kpi => (
          <View
            key={kpi.label}
            style={shadow.sm}
            className="flex-1 items-center rounded-xl bg-surface py-5"
          >
            <Typography variant="h2" color="primary">
              {kpi.value}
            </Typography>
            <Typography variant="caption" color="muted" className="mt-1">
              {kpi.label}
            </Typography>
          </View>
        ))}
      </View>

      <View style={shadow.sm} className="mt-6 rounded-xl bg-surface p-4">
        <Typography variant="title">Recent activity</Typography>
        <Typography variant="body" color="muted" className="mt-2">
          Your latest sessions will appear here.
        </Typography>
      </View>
    </Screen>
  );
}
