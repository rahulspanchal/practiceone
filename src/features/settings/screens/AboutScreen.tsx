import React from 'react';

import { PlaceholderScreen } from '@/components/templates/PlaceholderScreen';
import { Env } from '@/config';

export function AboutScreen() {
  return (
    <PlaceholderScreen
      title="About"
      subtitle={`practiceone • ${Env.APP_ENV}`}
    />
  );
}
