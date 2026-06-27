import type { ImageSourcePropType } from 'react-native';

export interface OnboardingSlideData {
  id: string;
  /** Athlete name shown in the rotated rust headline. */
  name: string;
  /** Short role/discipline under the name. */
  role: string;
  /** Bold card headline. */
  title: string;
  /** Supporting paragraph in the card. */
  description: string;
  /** Full-body athlete cut-out. */
  image: ImageSourcePropType;
}

const harshit = require('@/assets/images/athletes/harshit-rana.png');
const puja = require('@/assets/images/athletes/puja-tomar.png');
const yuzvendra = require('@/assets/images/athletes/yuzvendra-chahal.png');

export const onboardingSlides: OnboardingSlideData[] = [
  {
    id: 'harshit',
    name: 'Harshit Rana',
    role: 'Indian Cricketer',
    title: 'Rise Strong. Play Bold. Dream Bigger.',
    description:
      "Harshit's journey shows how grit and passion shape every young champion's path forward.",
    image: harshit,
  },
  {
    id: 'puja',
    name: 'Puja Tomar',
    role: 'Indian Mixed Martial Artist',
    title: 'Strength Begins With Self-Belief',
    description:
      "India's brave UFC fighter motivates students to embrace courage, resilience, and fearless growth.",
    image: puja,
  },
  {
    id: 'yuzvendra',
    name: 'Yuzvendra Chahal',
    role: 'Indian Cricketer',
    title: 'Master the Game, One Spin at a Time',
    description:
      "India's leading spinner inspires young athletes to stay focused, disciplined, and constantly improve.",
    image: yuzvendra,
  },
];
