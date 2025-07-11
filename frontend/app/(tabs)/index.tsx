import { AgentCard } from "@/components/AgentCard";
import { CategoryChip } from "@/components/CategoryChip";
import { HeaderBar } from "@/components/HeaderBar";
import { Colors } from "@/constants/Colors";
import {
  categoryIcons,
  fetchAgents,
  setSelectedCategory,
} from "@/store/agentsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { IconSymbol } from "./IconSymbol";

export default function AgentsListScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { agents, selectedCategory, categories, loading, error } =
    useAppSelector((state) => state.agents);
  
  const sectionListRef = useRef<SectionList>(null);
  const categoryChipsRef = useRef<FlatList>(null);
  const horizontalListsRefs = useRef<{ [key: string]: FlatList | null }>({});

  // Fetch agents on component mount
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  // Group agents by category
  const agentsByCategory = useMemo(() => {
    const grouped: Record<string, typeof agents> = {};
    agents.forEach((agent) => {
      if (!grouped[agent.category]) grouped[agent.category] = [];
      grouped[agent.category].push(agent);
    });
    return grouped;
  }, [agents]);

  // Section order
  const sectionOrder = useMemo(() => {
    return Object.keys(agentsByCategory);
  }, [agentsByCategory]);

  // Prepare sections for SectionList
  const sections = sectionOrder.map((category) => ({
    title: category,
    data: [agentsByCategory[category]], // Each section has one row: the agent array
  }));

  // Reset scroll positions when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        // Reset category chips scroll
        if (categoryChipsRef.current) {
          categoryChipsRef.current.scrollToOffset({ offset: 0, animated: false });
        }
        
        // Reset all horizontal lists
        Object.values(horizontalListsRefs.current).forEach(ref => {
          if (ref) {
            ref.scrollToOffset({ offset: 0, animated: false });
          }
        });
        
        // Reset section list scroll - only if sections exist
        if (sectionListRef.current && sections.length > 0) {
          sectionListRef.current.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            animated: false,
            viewPosition: 0,
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }, [sections.length])
  );

  // Scroll to selected category section
  useEffect(() => {
    if (selectedCategory !== "All" && sectionListRef.current && sections.length > 0) {
      const sectionIndex = sections.findIndex(section => section.title === selectedCategory);
      if (sectionIndex !== -1) {
        sectionListRef.current.scrollToLocation({
          sectionIndex,
          itemIndex: 0,
          animated: true,
          viewPosition: 0, // Scroll to top of section
        });
      }
    }
  }, [selectedCategory, sections]);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.dark.background }}
      >
        <HeaderBar title="Agents" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.dark.primary} />
          <Text style={styles.loadingText}>Loading agents...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.dark.background }}
      >
        <HeaderBar title="Agents" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
        <HeaderBar title="Agents" />
        {/* Category Chips */}
        <FlatList
          ref={categoryChipsRef}
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            marginBottom: 0,
            marginTop: 0,
          }}
          keyExtractor={(item) => item}
          renderItem={({ item: category }) => (
            <CategoryChip
              key={category}
              label={category}
              icon={categoryIcons[category] as any}
              isSelected={selectedCategory === category}
              onPress={() => dispatch(setSelectedCategory(category))}
            />
          )}
        />
        {/* SectionList for agent categories */}
        <SectionList
          ref={sectionListRef}
          sections={sections}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderSectionHeader={({ section: { title } }) => (
            <View
              style={[
                styles.sectionHeader,
                { 
                  marginTop: 38, 
                  marginBottom: 33,
                  backgroundColor: selectedCategory === title ? Colors.dark.surfaceSecondary : 'transparent',
                  borderRadius: selectedCategory === title ? 4 : 0,
                  paddingHorizontal: 16,
                  paddingVertical: selectedCategory === title ? 4 : 0,
                  marginHorizontal: selectedCategory === title ? 4 : 0,
                },
              ]}
            >
              <Text style={[
                styles.sectionTitle,
              ]}>
                {title}
              </Text>
              <IconSymbol
                name="arrow.right"
                size={22}
                color={Colors.dark.textPrimary}
              />
            </View>
          )}
          renderItem={({ item }) => (
            <FlatList
              ref={(ref) => {
                horizontalListsRefs.current[item.title] = ref;
              }}
              data={item}
              keyExtractor={(agent) => agent.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
              renderItem={({ item: agent }) => (
                <AgentCard
                  agent={agent}
                  onPress={() =>
                    router.push({
                      pathname: "/agent-home",
                      params: { id: agent.id },
                    })
                  }
                />
              )}
            />
          )}
          stickySectionHeadersEnabled={false}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.dark.textPrimary,
  },
  chevron: {
    fontSize: 18,
    color: Colors.dark.icon,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    color: Colors.dark.error,
    textAlign: "center",
  },
});
