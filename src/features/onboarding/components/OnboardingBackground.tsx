import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

interface OnboardingBackgroundProps {
  width: number;
  height: number;
}

/**
 * Warm brand backdrop for the onboarding slides: a soft cream radial gradient
 * with faint concentric "ripple" rings. Mirrors the splash look (same palette)
 * but without the central white disc, so the athlete cut-out reads clearly on
 * top. Purely decorative.
 */
export function OnboardingBackground({
  width,
  height,
}: OnboardingBackgroundProps) {
  const cx = width / 2;
  // Rings radiate from a point low on the screen, behind the athlete.
  const cy = height * 0.46;
  const maxRadius = Math.hypot(width, height) * 0.7;

  const ringCount = 6;
  const innerRing = maxRadius * 0.22;
  const ringGap = (maxRadius - innerRing) / (ringCount - 1);
  const rings = Array.from(
    { length: ringCount },
    (_, i) => innerRing + ringGap * i,
  );

  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width={width}
      height={height}
      pointerEvents="none"
    >
      <Defs>
        <RadialGradient
          id="onboardingFill"
          cx={cx}
          cy={cy}
          r={maxRadius}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FEF7EF" />
          <Stop offset="0.45" stopColor="#FCE9D2" />
          <Stop offset="0.78" stopColor="#F8D3A8" />
          <Stop offset="1" stopColor="#F4BE87" />
        </RadialGradient>
      </Defs>

      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="url(#onboardingFill)"
      />

      {rings.map(r => (
        <Circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
      ))}
    </Svg>
  );
}
