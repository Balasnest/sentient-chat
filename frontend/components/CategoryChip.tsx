import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryChipProps {
  label: string;
  icon?: string;
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
        isSelected ? styles.chipSelected : styles.chipDefault,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.chipContent}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text
          style={[
            styles.chipText,
            isSelected ? styles.chipTextSelected : styles.chipTextDefault,
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 0,
    height: 48,
    alignSelf: 'flex-start',
  },
  chipDefault: {
    backgroundColor: Colors.dark.chipBackground,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  chipSelected: {
    backgroundColor: Colors.dark.chipSelected,
    borderWidth: 1,
    borderColor: Colors.dark.chipSelected,
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 16,
    marginRight: 4,
  },
  chipText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
  },
  chipTextDefault: {
    color: Colors.dark.textTertiary,
  },
  chipTextSelected: {
    color: Colors.dark.surfaceSecondary,
  },
}); 