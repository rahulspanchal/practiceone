import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { Screen } from '@/components/atoms';
import type { HomeStackParamList } from '@/navigation/types';
import { fontFamily } from '@/theme';

const FOOTBALL = require('@/assets/images/assess-football-title.png');
const COACH = require('@/assets/images/coach-1.png');
const SKILL_AGILITY = require('@/assets/images/skill-agility.png');
const SKILL_BALANCE = require('@/assets/images/skill-balance.png');
const SKILL_SPARRING = require('@/assets/images/skill-sparring.png');
const SKILL_KICK = require('@/assets/images/skill-kick.png');

const NAVY = '#012233';
const DARK = '#333333';
const COACH_ROLE = '#808B9A';
const CARD_BORDER = '#F2F4F8';
const RING_TRACK = '#ECEFF3';
const RUST = '#BE522F';
const BACK_BG = '#FFE6E0';
const DOWNLOAD = '#1B3948';
const INFO_TITLE = '#101828';
const INFO_BODY = '#606080';

const INFO_TEXT =
  'With consistent training and structured practice, stamina levels can ' +
  'improve by up to 20% over a defined period, resulting in better endurance, ' +
  'reduced fatigue, and sustained performance during extended physical activity.';

type Nav = NativeStackNavigationProp<HomeStackParamList>;

type Skill = {
  label: string;
  desc: string;
  score: number;
  color: string;
  tint: string;
  tile: string;
  icon?: ImageSourcePropType;
  emoji?: string;
  vector?: 'stamina';
};

const SKILLS: Skill[] = [
  {
    label: 'Stamina',
    desc: 'The stamina can enhance by 20% with training.',
    score: 8,
    color: '#456CE8',
    tint: '#FAFBFF',
    tile: '#F1F4FF',
    vector: 'stamina',
  },
  {
    label: 'Agility',
    desc: 'The agility training has helped vikram align goals.',
    score: 5,
    color: '#00C9E3',
    tint: '#FAFFFF',
    tile: '#E8F8FC',
    icon: SKILL_AGILITY,
  },
  {
    label: 'Speed',
    desc: 'The speed training has helped vikram align goals.',
    score: 3,
    color: '#FF8159',
    tint: '#FFFCFA',
    tile: '#FFF0EB',
    emoji: '🏃',
  },
  {
    label: 'Balance',
    desc: 'The balance training has helped vikram align goals.',
    score: 8,
    color: '#482988',
    tint: '#FCFAFF',
    tile: '#F0EAFB',
    icon: SKILL_BALANCE,
  },
  {
    label: 'Sparring Control',
    desc: 'The scoring control training has helped vikram align goals.',
    score: 8,
    color: '#00C639',
    tint: '#FAFFFB',
    tile: '#E7FBEE',
    icon: SKILL_SPARRING,
  },
  {
    label: 'Kick Accuracy',
    desc: 'The kick accuracy training has helped vikram align goals.',
    score: 3,
    color: '#FCB83F',
    tint: '#FFFEFA',
    tile: '#FFF5E3',
    icon: SKILL_KICK,
  },
];

const EVAL_PARAS = [
  'Aarav has shown steady improvement this month. His basic dribbling and ' +
    'passing skills are developing well, though he still loses control when ' +
    'changing direction and needs to work on passing accuracy. His stamina is ' +
    'average, and he tends to slow down during high-intensity drills, but his ' +
    'overall effort remains consistent.',
  'In game situations, Aarav understands positioning but sometimes hesitates ' +
    'when making quick decisions. With more match practice, his confidence will ' +
    'improve. He maintains a positive attitude, listens to feedback, and tries ' +
    'to apply corrections.',
];

const AREAS = [
  'Directional ball control',
  'Passing accuracy',
  'Stamina and agility',
  'Faster decision-making under pressure',
];

const AREAS_CLOSING =
  'Aarav is progressing well and can move to an above-average level with ' +
  'continued focus and regular practice.';

function BackChevron() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 6l-6 6 6 6"
        stroke={RUST}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CloseIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 6l12 12M18 6L6 18"
        stroke={INFO_TITLE}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** iconsax-ai-water-cycle.svg — flat blue Stamina icon on a #F1F4FF tile. */
function StaminaIcon() {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
      <Rect width={56} height={56} rx={8} fill="#F1F4FF" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.6594 15.7617C37.8154 15.7617 41.1844 19.1308 41.1844 23.2868C41.1844 29.6127 35.0336 36.7541 29.3472 39.8827C28.4837 40.3576 27.5171 40.3576 26.6536 39.8827C20.9674 36.7545 14.8164 29.6125 14.8164 23.2867C14.8165 19.1307 18.1854 15.7617 22.3414 15.7617C24.1773 15.7617 25.8592 16.4194 27.1652 17.5119C25.524 18.8834 23.982 20.5103 22.9223 22.3795C22.1434 23.7533 21.617 25.2833 21.583 26.8728C21.5688 27.5367 21.6417 28.2001 21.8097 28.8429C21.9665 29.4446 22.2062 30.0216 22.5218 30.5574C23.13 31.588 24.0065 32.4355 25.0542 33.0129C26.7063 33.9233 28.6394 34.0912 30.4247 33.4819C32.7001 32.7055 34.096 30.6722 34.0826 28.2745C34.0717 26.3005 32.6414 24.3407 30.7555 23.7466C30.1758 23.564 29.5653 23.517 28.9655 23.6201C28.3067 23.7335 27.6781 23.9872 27.1751 24.4356C26.7535 24.8113 26.457 25.293 26.307 25.8369C26.0441 26.7893 26.2581 27.8472 26.9029 28.6016C27.1897 28.937 27.5497 29.1967 27.9615 29.3563C28.4198 29.5341 28.9091 29.5759 29.3946 29.5103C29.7125 29.4674 29.9358 29.1748 29.8931 28.8569C29.8504 28.5391 29.5576 28.3155 29.2396 28.3584C28.7455 28.4251 28.2623 28.3063 27.8959 27.9583C27.6078 27.6846 27.4367 27.3115 27.3807 26.9209C27.333 26.5885 27.3658 26.2515 27.4964 25.9407C27.7854 25.2529 28.4542 24.8886 29.1616 24.767C30.3586 24.5611 31.4867 25.2321 32.1796 26.1734C32.6232 26.7759 32.9171 27.5256 32.9212 28.2795C32.9318 30.1778 31.8552 31.7647 30.0508 32.3804C28.4985 32.9101 26.8037 32.7249 25.4037 31.872C23.5063 30.716 22.5823 28.6555 22.7701 26.4676C22.888 25.0935 23.417 23.7817 24.1314 22.6128C24.838 21.4565 25.7436 20.4024 26.733 19.4539C27.9444 18.2926 29.142 17.0327 30.703 16.3648C31.6105 15.9768 32.6098 15.7617 33.6594 15.7617Z"
        fill="#456CE8"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.6591 15.7617C37.815 15.7617 41.1841 19.1308 41.1841 23.2868C41.1841 29.6127 35.0333 36.7541 29.3468 39.8827C28.4833 40.3576 27.5167 40.3576 26.6532 39.8827C25.4516 39.2217 24.2295 38.3809 23.0488 37.407C26.7007 38.2225 30.5376 36.8841 33.8118 34.1269C42.1156 25.3876 38.7961 14.4619 27.7619 18.5274C27.839 18.462 27.9165 18.397 27.9944 18.3325L28.0001 18.3278L28.0057 18.3231L28.0193 18.3062C29.3979 16.746 31.4132 15.7617 33.6591 15.7617Z"
        fill="#0033DA"
      />
    </Svg>
  );
}

/** Button - Variants.svg — info "(i)" badge on a #FFEAE3 chip, stroked #BE522F. */
function InfoBadge() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Rect width={20} height={20} rx={10} fill="#FFEAE3" />
      <Path
        d="M9.9997 11.6663V9.9997M9.9997 8.333H10.0038M14.1663 9.9997C14.1663 12.3009 12.3009 14.1663 9.9997 14.1663C7.6985 14.1663 5.833 12.3009 5.833 9.9997C5.833 7.6985 7.6985 5.833 9.9997 5.833C12.3009 5.833 14.1663 7.6985 14.1663 9.9997Z"
        stroke={RUST}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ProgressRing({ score, color }: { score: number; color: string }) {
  const size = 56;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, score / 10));
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={RING_TRACK}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.ringCenter}>
        <Text style={[styles.ringText, { color }]}>
          {String(score).padStart(2, '0')}/10
        </Text>
      </View>
    </View>
  );
}

function SkillCard({ skill, onInfo }: { skill: Skill; onInfo: () => void }) {
  return (
    <View style={[styles.card, { backgroundColor: skill.tint }]}>
      {skill.vector === 'stamina' ? (
        <StaminaIcon />
      ) : (
        <View style={[styles.skillTile, { backgroundColor: skill.tile }]}>
          {skill.icon ? (
            <Image
              source={skill.icon}
              style={styles.iconImg}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.iconEmoji}>{skill.emoji}</Text>
          )}
        </View>
      )}

      <View style={styles.skillBody}>
        <View style={styles.skillNameRow}>
          <Text style={styles.skillName}>{skill.label}</Text>
          <Pressable accessibilityRole="button" hitSlop={8} onPress={onInfo}>
            <InfoBadge />
          </Pressable>
        </View>
        <Text style={styles.skillDesc}>{skill.desc}</Text>
      </View>

      <ProgressRing score={skill.score} color={skill.color} />
    </View>
  );
}

/**
 * "Assessment Report" detail screen for a sport (e.g. Football). Shows the
 * coach, the session objective, and a list of skill assessments each with a
 * circular score ring. Reached from My Profile -> Assessment Report row arrow.
 */
export function AssessmentReportScreen() {
  const navigation = useNavigation<Nav>();
  const [infoVisible, setInfoVisible] = useState(true);

  return (
    <Screen padded={false} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <BackChevron />
        </Pressable>
        <Text style={styles.headerTitle}>Assessment Report</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.outerCard}>
          <View style={styles.titleRow}>
            <Image
              source={FOOTBALL}
              style={styles.titleIcon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Football Assessment</Text>
          </View>

          <View style={styles.coachRow}>
            <View style={styles.coachBar} />
            <Image source={COACH} style={styles.coachAvatar} />
            <View>
              <Text style={styles.coachName}>Arham Khan</Text>
              <Text style={styles.coachRole}>Football Coach</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.objective}>
            <Text style={styles.objectiveTitle}>Passing Relays & Movement</Text>
            <Text style={styles.objectiveDesc}>
              Build passing under light movement & teamwork
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Assessments</Text>

          <View style={styles.list}>
            {SKILLS.map(skill => (
              <SkillCard
                key={skill.label}
                skill={skill}
                onInfo={() => setInfoVisible(true)}
              />
            ))}
          </View>

          <View style={styles.evalBlock}>
            <Text style={styles.evalTitle}>Detailed Evaluation</Text>
            {EVAL_PARAS.map((para, i) => (
              <Text key={i} style={styles.evalBody}>
                {para}
              </Text>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.areasBlock}>
            <Text style={styles.evalTitle}>Areas to Improve</Text>
            <Text style={styles.evalBody}>Areas to improve:</Text>
            <View style={styles.bullets}>
              {AREAS.map(area => (
                <View key={area} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{area}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.evalBody}>{AREAS_CLOSING}</Text>
          </View>

          <Pressable accessibilityRole="button" style={styles.downloadBtn}>
            <Text style={styles.downloadText}>Download Full Report</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={infoVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setInfoVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setInfoVisible(false)}
        >
          <Pressable style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>Assessment information</Text>
              <Pressable
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => setInfoVisible(false)}
              >
                <CloseIcon />
              </Pressable>
            </View>
            <Text style={styles.infoBody}>{INFO_TEXT}</Text>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BACK_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 36,
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: NAVY,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  outerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F3F7',
    padding: 24,
    shadowColor: '#0C1A4B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F4',
    marginVertical: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleIcon: {
    width: 32,
    height: 30,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: DARK,
  },
  coachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  skillTile: {
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  coachBar: {
    width: 3,
    height: 40,
    borderRadius: 2,
    backgroundColor: RUST,
  },
  coachAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
  },
  coachName: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 22,
    color: NAVY,
  },
  coachRole: {
    fontFamily: fontFamily.latoMedium,
    fontSize: 14,
    lineHeight: 18,
    color: COACH_ROLE,
  },
  objective: {
    gap: 4,
  },
  objectiveTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: DARK,
  },
  objectiveDesc: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: DARK,
  },
  sectionLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: DARK,
    marginBottom: 12,
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingVertical: 24,
    paddingHorizontal: 16,
    shadowColor: '#323247',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 2,
  },
  iconImg: {
    width: 42,
    height: 42,
  },
  iconEmoji: {
    fontSize: 30,
  },
  skillBody: {
    flex: 1,
    gap: 4,
  },
  skillNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  skillName: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: NAVY,
  },
  skillDesc: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: DARK,
  },
  evalBlock: {
    marginTop: 24,
  },
  areasBlock: {
    marginBottom: 8,
  },
  evalTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: DARK,
    marginBottom: 12,
  },
  evalBody: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: DARK,
    marginBottom: 12,
  },
  bullets: {
    paddingLeft: 4,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  bulletDot: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: DARK,
  },
  bulletText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
    color: DARK,
  },
  downloadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 12,
  },
  downloadText: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
    color: DOWNLOAD,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoTitle: {
    flex: 1,
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: INFO_TITLE,
  },
  infoBody: {
    fontFamily: fontFamily.latoMedium,
    fontSize: 12,
    lineHeight: 16,
    color: INFO_BODY,
  },
  ringCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
  },
});
