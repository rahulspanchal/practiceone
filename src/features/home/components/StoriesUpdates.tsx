import React, { useState } from 'react';
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { fontFamily } from '@/theme';

const BANNER = require('@/assets/images/story-cricket-fest.png');

// Figma banner height.
const BANNER_HEIGHT = 138;

const TITLE = '#021F2C';
const DOT_ACTIVE = '#BE522F';
const DOT_INACTIVE = '#E5BAAC';

// Placeholder slides — repeat the one banner asset until the rest are supplied.
const SLIDES = [BANNER, BANNER, BANNER, BANNER];

/**
 * "Stories & Updates" dashboard section: a section title and a swipeable banner
 * carousel with pagination dots. The active dot (wide #BE522F pill) tracks the
 * scroll position; the rest are short faded pills (#E5BAAC).
 */
export function StoriesUpdates() {
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!width) return;
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View>
      <Text style={styles.title}>Stories & Updates</Text>

      <View onLayout={onLayout}>
        {width > 0 && (
          <FlatList
            data={SLIDES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => String(i)}
            onMomentumScrollEnd={onMomentumScrollEnd}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={[styles.banner, { width }]}
                resizeMode="cover"
              />
            )}
          />
        )}
      </View>

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: TITLE,
    marginBottom: 14,
  },
  banner: {
    height: BANNER_HEIGHT,
    borderRadius: 16,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 4,
    borderRadius: 100,
    backgroundColor: DOT_INACTIVE,
  },
  dotActive: {
    width: 24,
    backgroundColor: DOT_ACTIVE,
  },
});
