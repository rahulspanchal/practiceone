import React, { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutRectangle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { fontFamily } from '@/theme';

const NAVY = '#012233';
const RUST = '#BE522F';
const MUTED = '#808B9A';
const BORDER = '#ECDED8';
const ITEM_ACTIVE_BG = '#FFF8F6';

function CaretDown({
  color = MUTED,
  open = false,
}: {
  color?: string;
  open?: boolean;
}) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}
    >
      <Path
        d="M6 9l6 6 6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface SportDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

/** Anchored "All Sports" filter dropdown: tap to open a menu beneath the pill. */
export function SportDropdown({
  value,
  options,
  onChange,
}: SportDropdownProps) {
  const triggerRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const openMenu = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
  };

  return (
    <>
      <Pressable
        ref={triggerRef}
        style={styles.trigger}
        onPress={openMenu}
        hitSlop={6}
      >
        <Text style={styles.triggerText}>{value}</Text>
        <CaretDown open={open} />
      </Pressable>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View
            style={[
              styles.menu,
              {
                top: anchor.y + anchor.height + 6,
                right: undefined,
                left: anchor.x + anchor.width - 160,
                width: 160,
              },
            ]}
          >
            {options.map(option => {
              const active = option === value;
              return (
                <Pressable
                  key={option}
                  style={[styles.item, active && styles.itemActive]}
                  onPress={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[styles.itemText, active && styles.itemTextActive]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#FFFFFF',
  },
  triggerText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: NAVY,
  },
  backdrop: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F1F2',
    paddingVertical: 6,
    shadowColor: '#0C1A4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  itemActive: {
    backgroundColor: ITEM_ACTIVE_BG,
  },
  itemText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 18,
    color: NAVY,
  },
  itemTextActive: {
    fontFamily: fontFamily.semibold,
    color: RUST,
  },
});
