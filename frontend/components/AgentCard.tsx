import { Colors } from '@/constants/Colors';
import { Agent } from '@/store/agentsSlice';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '../app/(tabs)/IconSymbol';
import { AgentIconMap } from './AgentIcons';


interface AgentCardProps {
  agent: Agent;
  onPress: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onPress }) => {
  const isImage = typeof agent.avatar == 'string';
  const Icon = AgentIconMap[agent.avatar as keyof typeof AgentIconMap] as ImageSourcePropType;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.avatarContainer}>
        {isImage ? (
          <Image source={Icon} style={styles.avatarImage} resizeMode="contain" />
        ) : (
          <Text style={styles.avatar}>{agent.avatar}</Text>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {agent.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {agent.description}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <IconSymbol name="arrow.right" size={10} color={Colors.dark.textPrimary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 129,
    height: 163,
    alignItems: 'center',
    backgroundColor: Colors.dark.surfaceSecondary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.dark.surfaceSecondary,
  },
  avatarContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatar: {
    fontSize: 24,
  },
  avatarImage: {
    width: 28,
    height: 28,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: Colors.dark.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    color: Colors.dark.textTertiary,
    textAlign: 'center',
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: Colors.dark.surfaceTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 11,
  },
}); 