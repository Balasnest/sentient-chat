import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const TABS = [
  { name: 'Home', route: '/(tabs)/index', icon: <Ionicons name="home" size={28} /> },
  { name: 'Grid', route: '/(tabs)/explore', icon: <MaterialCommunityIcons name="view-grid" size={28} /> },
  { name: 'Clock', route: '/(tabs)/clock', icon: <Ionicons name="time-outline" size={28} /> },
  { name: 'User', route: '/(tabs)/profile', icon: <Ionicons name="person-outline" size={28} /> },
];

export const CustomTabBar = ({ state, navigation }: any) => {
  const router = useRouter();
  const segments = useSegments();
  const activeIndex = state?.index ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map((tab, idx) => {
          const isActive = activeIndex === idx;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => navigation.navigate(tab.route)}
              activeOpacity={0.7}
            >
              {React.cloneElement(tab.icon, {
                color: isActive ? Colors.dark.textPrimary : Colors.dark.icon,
              })}
              {isActive && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    backgroundColor: Colors.dark.surface,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.surface,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dark.textPrimary,
    marginTop: 4,
  },
}); 