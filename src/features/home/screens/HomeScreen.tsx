import React from 'react';

import { Screen, Typography } from '@/components/atoms';

/** Simple home page shown after the user logs in. */
export function HomeScreen() {
  return (
    <Screen>
      <Typography variant="h1">Home</Typography>
      <Typography variant="body" color="muted" className="mt-1">
        Welcome back
      </Typography>
    </Screen>
  );
}
