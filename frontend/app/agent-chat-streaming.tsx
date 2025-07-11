import { HeaderBar } from '@/components/HeaderBar';
import { MessageInput } from '@/components/MessageInput';
import { StreamingChatBubble } from '@/components/StreamingChatBubble';
import { Colors } from '@/constants/Colors';
import { streamingApiService } from '@/services/streamingApi';
import { addIntermediateEvent, addMessage, regenerateResponse, setCurrentAgent, updateStreamingMessage } from '@/store/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StreamingAgentChatScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id, initialMessage } = useLocalSearchParams<{ id: string; initialMessage?: string }>();
  
  const agentsState = useAppSelector(state => state.agents);
  const chatState = useAppSelector(state => state.chat);
  const messages = chatState?.messages || [];
  const isLoading = chatState?.isLoading || false;
  const agent = agentsState?.agents?.find((a: any) => a.id === id);

  const [isStreaming, setIsStreaming] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    console.log("[StreamingAgentChatScreen] useEffect");
    if (agent) {
      dispatch(setCurrentAgent(agent.id));
    }
  }, [agent, dispatch]);

  useEffect(() => {
    console.log("[StreamingAgentChatScreen] useEffect");
    if (initialMessage && agent) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, agent]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  const handleSendMessage = async (message: string) => {
    if (!agent) return;

    // Add user message
    dispatch(addMessage({
      text: message,
      isUser: true,
    }));

    // Add initial assistant message for streaming
    const assistantMessageId = Date.now().toString() + Math.random().toString(36).slice(2); //uuidv4();
    console.log("[handleSendMessage] addMessage", assistantMessageId);
    dispatch(addMessage({
      id: assistantMessageId,
      text: '',
      isUser: false,
      isStreaming: true,
      intermediateEvents: [],
    }));

    setIsStreaming(true);
    setApiError(null);
    console.log("[handleSendMessage] setIsStreaming(true)");
    
    try {
      console.log("[handleSendMessage] streamingApiService.streamMessage");
      await streamingApiService.streamMessage(agent.id, message, {
        onThought: (message) => {
          console.log("[streamingApi] onThought");
          dispatch(addIntermediateEvent({
            messageId: assistantMessageId,
            event: {
              type: 'thought',
              message,
              timestamp: new Date().toISOString(),
            },
          }));
        },
        onToolCall: (message) => {
          console.log("[streamingApi] onToolCall");
          dispatch(addIntermediateEvent({
            messageId: assistantMessageId,
            event: {
              type: 'tool_call',
              message,
              timestamp: new Date().toISOString(),
            },
          }));
        },
        onObservation: (message) => {
          console.log("[streamingApi] onObservation");
          dispatch(addIntermediateEvent({
            messageId: assistantMessageId,
            event: {
              type: 'observation',
              message,
              timestamp: new Date().toISOString(),
            },
          }));
        },
        onToken: (content) => {
          dispatch(updateStreamingMessage({
            id: assistantMessageId,
            text: content,
            isStreaming: true,
            append: true,
          }));
        },
        onError: (error) => {
          console.log("[streamingApi] onError");
          console.error('Streaming error:', error);
          setApiError(error);
          dispatch(updateStreamingMessage({
            id: assistantMessageId,
            text: 'Sorry, I encountered an error. Please try again.',
            isStreaming: false,
          }));
        },
        onComplete: () => {
          console.log("[streamingApi] onComplete");
          dispatch(updateStreamingMessage({
            id: assistantMessageId,
            isStreaming: false,
          }));
          setIsStreaming(false);
        },
      });
    } catch (error) {
      console.error('API Error:', error);
      setApiError('Failed to get response. Please try again.');
      
      dispatch(updateStreamingMessage({
        id: assistantMessageId,
        text: 'Sorry, I encountered an error. Please try again.',
        isStreaming: false,
      }));
      setIsStreaming(false);
    }
  };

  const handleRegenerate = async () => {
    console.log("[handleRegenerate]");
    if (!agent || messages.length === 0) return;

    // Find the last user message
    const lastUserMessage = messages.findLast(msg => msg.isUser);
    if (!lastUserMessage) return;

    dispatch(regenerateResponse());
    handleSendMessage(lastUserMessage.text);
  };

  if (!agent) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
        <HeaderBar title="Agent Not Found" onBack={() => router.back()} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Agent not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <HeaderBar title={agent.name} onBack={() => router.back()}  onRightPress={() => router.back()}/>
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.container} 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <StreamingChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={new Date(message.timestamp).toLocaleTimeString()}
              isStreaming={message.isStreaming}
              intermediateEvents={message.intermediateEvents}
            />
          ))}
          
          {isStreaming && (
            <View style={styles.typingContainer}>
              <Text style={styles.typingText}>Agent is thinking...</Text>
            </View>
          )}
          
          {apiError && (
            <View style={styles.errorContainer}>
              <Text style={styles.apiErrorText}>{apiError}</Text>
            </View>
          )}
          
          {messages.length > 0 && messages[messages.length - 1]?.isUser === false && !messages[messages.length - 1]?.isStreaming && (
            <TouchableOpacity style={styles.regenerateButton} onPress={handleRegenerate}>
            <Ionicons name="refresh-circle" size={18} color={Colors.dark.textSecondary} />
            <Text style={styles.regenerateText}>Regenerate Response</Text>
          </TouchableOpacity>
          )}
        </ScrollView>
        
        <MessageInput
          onSend={handleSendMessage}
          placeholder="Type a message..."
          disabled={isStreaming}
        />
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
  typingContainer: {
    paddingHorizontal: 35,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 12,
    color: Colors.dark.textTertiary,
    fontStyle: 'italic',
  },
  errorContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  apiErrorText: {
    fontSize: 14,
    color: Colors.dark.error,
    textAlign: 'center',
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.dark.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 8,
  },
  regenerateIcon: {
    width: 24,
    height: 24,
  },
  regenerateText: {
    fontSize: 12,
    fontFamily: 'Urbanist_500Medium',
    fontWeight: '500',
    color: Colors.dark.textSecondary,
  },
}); 