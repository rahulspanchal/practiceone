import { useRoute, type RouteProp } from '@react-navigation/native';
import React from 'react';

import { PlaceholderScreen } from '@/components/templates/PlaceholderScreen';
import type { HomeStackParamList } from '@/navigation/types';

export function DetailsScreen() {
  const { params } = useRoute<RouteProp<HomeStackParamList, 'Details'>>();
  return <PlaceholderScreen title="Details" subtitle={`Item: ${params.id}`} />;
}
