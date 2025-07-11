import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SamplePromptCardProps {
  prompt: string;
  onPress: () => void;
}

export const SamplePromptCard: React.FC<SamplePromptCardProps> = ({
  prompt,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.prompt} numberOfLines={3}>
        {prompt}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.surfaceSecondary,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  prompt: {
    textAlign: 'center',
    fontSize: 15,
    color: Colors.dark.textAssistant,
    lineHeight: 22,
  },
}); 