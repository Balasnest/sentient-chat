import { store } from '@/store';
import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="agent-home" options={{ headerShown: false }} />
        <Stack.Screen name="agent-chat" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
} 