import { AgentCard } from '@/components/AgentCard';
import { CategoryChip } from '@/components/CategoryChip';
import { HeaderBar } from '@/components/HeaderBar';
import { Colors } from '@/constants/Colors';
import { categoryIcons, setSelectedCategory } from '@/store/agentsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconSymbol } from './IconSymbol';

export default function AgentsListScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { agents, selectedCategory, categories } = useAppSelector(state => state.agents);

  // Group agents by category
  const agentsByCategory = useMemo(() => {
    const grouped: Record<string, typeof agents> = {};
    agents.forEach(agent => {
      if (selectedCategory !== 'All' && agent.category !== selectedCategory) return;
      if (!grouped[agent.category]) grouped[agent.category] = [];
      grouped[agent.category].push(agent);
    });
    return grouped;
  }, [agents, selectedCategory]);

  // Section order
  const sectionOrder = useMemo(() => {
    if (selectedCategory !== 'All') return [selectedCategory];
    return Object.keys(agentsByCategory);
  }, [agentsByCategory, selectedCategory]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <HeaderBar title="Agents" />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Category Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          {categories.map(category => (
            <CategoryChip
              key={category}
              label={category}
              icon={categoryIcons[category]}
              isSelected={selectedCategory === category}
              onPress={() => dispatch(setSelectedCategory(category))}
            />
          ))}
        </ScrollView>
        {/* Agent Sections */}
        {sectionOrder.map((category, idx) => (
          <View key={category} style={{ marginBottom: 36, marginTop: idx === 0 ? 46 : 0 }}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{category}</Text>
              <IconSymbol name="arrow.right" size={22} color={Colors.dark.textPrimary} />
            </View>
            <FlatList
              data={agentsByCategory[category]}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
              renderItem={({ item }) => (
                <AgentCard
                  agent={item}
                  onPress={() => router.push({ pathname: '/agent-home', params: { id: item.id } })}
                />
              )}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.dark.textPrimary,
  },
  chevron: {
    fontSize: 18,
    color: Colors.dark.icon,
    marginLeft: 8,
  },
}); 