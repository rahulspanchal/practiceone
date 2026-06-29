import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const COLOR = '#BE522F';

// The 8 dots from the design (Group 6.svg): a ring with shrinking radii that
// reads as a comet tail when spun.
const DOTS = [
  { cx: 25, cy: 10, r: 10 },
  { cx: 9, cy: 27, r: 9 },
  { cx: 15.5, cy: 47, r: 8 },
  { cx: 34, cy: 55, r: 6 },
  { cx: 50.5, cy: 47.5, r: 6.5 },
  { cx: 56.5, cy: 33.5, r: 5.5 },
  { cx: 54.5, cy: 19.5, r: 3.5 },
  { cx: 47.5, cy: 11.5, r: 2.5 },
];

const SIZE = 64;

/** Full-area dashboard loading state: a continuously rotating dot spinner. */
export function DashboardLoading() {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg width={SIZE} height={SIZE} viewBox="0 0 62 61" fill="none">
          {DOTS.map(d => (
            <Circle
              key={`${d.cx}-${d.cy}`}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill={COLOR}
            />
          ))}
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
