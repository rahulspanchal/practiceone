import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

interface SplashBackgroundProps {
  /** Measured container size (from the parent's onLayout) so the backdrop is
   *  sized once, stably, and never reflows/jumps as window insets settle. */
  width: number;
  height: number;
}

/**
 * Brand splash backdrop rendered with SVG so it scales crisply on every screen
 * density: a soft warm radial gradient, concentric "ripple" rings, and a defined
 * cream disc that the logo sits on. Purely decorative.
 *
 * It is centred at the exact middle so it always aligns with the flex-centred
 * logo above it.
 */
export function SplashBackground({ width, height }: SplashBackgroundProps) {
  const cx = width / 2;
  const cy = height / 2;

  // Reach the farthest corner so the gradient fully covers the screen.
  const maxRadius = Math.hypot(width / 2, height / 2);

  // Concentric outline rings radiating outward from the centre.
  const ringCount = 6;
  const innerRing = maxRadius * 0.36;
  const ringGap = (maxRadius - innerRing) / (ringCount - 1);
  const rings = Array.from(
    { length: ringCount },
    (_, i) => innerRing + ringGap * i,
  );

  // Large soft white glow the logo sits on — big and diffuse so it reads as a
  // blurred halo (not a hard disc) and the rings show through it, matching the
  // reference splash.
  const discRadius = width * 0.62;

  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width={width}
      height={height}
      pointerEvents="none"
    >
      <Defs>
        <RadialGradient
          id="splashFill"
          cx={cx}
          cy={cy}
          r={maxRadius}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FEF7EF" />
          <Stop offset="0.42" stopColor="#FCE9D2" />
          <Stop offset="0.72" stopColor="#F8D3A8" />
          <Stop offset="1" stopColor="#F4BE87" />
        </RadialGradient>
        <RadialGradient
          id="splashDisc"
          cx={cx}
          cy={cy}
          r={discRadius}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={1} />
          <Stop offset="0.35" stopColor="#FFFFFF" stopOpacity={0.92} />
          <Stop offset="0.6" stopColor="#FFFFFF" stopOpacity={0.5} />
          <Stop offset="0.82" stopColor="#FFFFFF" stopOpacity={0.18} />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      <Rect x={0} y={0} width={width} height={height} fill="url(#splashFill)" />

      {rings.map(r => (
        <Circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.45}
          strokeWidth={1}
        />
      ))}

      <Circle cx={cx} cy={cy} r={discRadius} fill="url(#splashDisc)" />
    </Svg>
  );
}
