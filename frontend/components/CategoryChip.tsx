import { Colors } from '@/constants/Colors';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AgentIconMap } from './AgentIcons';

interface CategoryChipProps {
  label: string;
  icon?: ImageSourcePropType;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  icon,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        styles.chipDefault,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.chipContent}>
        <Text
          style={[
            styles.chipText,
            isSelected ? styles.chipTextSelected : styles.chipTextDefault,
          ]}
        >
          {label}
        </Text>
        {icon && icon !== 'globe' && <Image source={AgentIconMap[icon as keyof typeof AgentIconMap]} style={styles.icon} resizeMode="contain" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 20,
    height: 48,
    alignSelf: 'flex-start',
  },
  chipDefault: {
    backgroundColor: Colors.dark.chipBackground,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  chipSelected: {
    backgroundColor: Colors.dark.textPrimary,
    borderWidth: 1,
    borderColor: Colors.dark.textPrimary,
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  chipText: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
  },
  chipTextDefault: {
    color: Colors.dark.textTertiary,
  },
  chipTextSelected: {
    color: Colors.dark.textPrimary,
  },
}); 