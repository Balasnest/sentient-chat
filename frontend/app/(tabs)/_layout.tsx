import { Tabs } from 'expo-router';
import React from 'react';
import { CustomTabBar } from './CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
    </Tabs>
  );
} 