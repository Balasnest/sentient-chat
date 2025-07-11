import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderBarProps {
  title: string;
  onBack?: () => void;
  onRightPress?: () => void;
  rightIconName?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  onBack,
  onRightPress,
  rightIconName = 'ellipsis-horizontal',
}) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={18} color={Colors.dark.leftNavColor} />
        </TouchableOpacity>
      )}
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      {onRightPress && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onRightPress}
          activeOpacity={0.7}
        >
          <Ionicons name={rightIconName as any} size={24} color={Colors.dark.leftNavColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: Colors.dark.background,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.navIconBackground,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    fontSize: 22,
    color: Colors.dark.textPrimary,
  },
}); 