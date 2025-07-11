import { HeaderBar } from '@/components/HeaderBar';
import { MessageInput } from '@/components/MessageInput';
import { SamplePromptCard } from '@/components/SamplePromptCard';
import { Colors } from '@/constants/Colors';
import { setCurrentAgent } from '@/store/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default function AgentHomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const { agents } = useAppSelector(state => state.agents);
  const agent = agents.find(a => a.id === id);

  useEffect(() => {
    console.log("[AgentHomeScreen] useEffect");
    if (agent) {
      dispatch(setCurrentAgent(agent.id));
    }
  }, [agent, dispatch]);

  if (!agent) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
        <HeaderBar title="Agent Not Found" onBack={() => router.back()} onRightPress={() => router.back()} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Agent not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handlePromptPress = (prompt: string) => {
    Keyboard.dismiss();
    router.push({
      pathname: '/agent-chat-streaming',
      params: { id: agent.id, initialMessage: prompt }
    });
  };

  const handleSendMessage = (message: string) => {
    Keyboard.dismiss();
    router.push({
      pathname: '/agent-chat-streaming',
      params: { id: agent.id, initialMessage: message }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <HeaderBar title={agent.name} onBack={() => router.back()} onRightPress={() => router.back()} />
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.promptsSection}>
              {agent.samplePrompts.map((prompt, index) => (
                <SamplePromptCard
                  key={index}
                  prompt={prompt}
                  onPress={() => handlePromptPress(prompt)}
                />
              ))}
            </View>
            
            <MessageInput
              key={agent.id} // Force reset when agent changes
              onSend={handleSendMessage}
              placeholder="Type a message..."
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  agentInfo: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.dark.textAssistant,
    lineHeight: 24,
  },
  promptsSection: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.dark.textPrimary,
    marginBottom: 16,
  },
}); 