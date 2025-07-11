import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
}) => {
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.assistantBubble,
      ]}>
        <Text style={[
          styles.messageText,
          isUser ? styles.userText : styles.assistantText,
        ]}>
          {message}
        </Text>
        {timestamp && (
          <Text style={[
            styles.timestamp,
            isUser ? styles.userTimestamp : styles.assistantTimestamp,
          ]}>
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  assistantContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: Colors.dark.userBubble,
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: Colors.dark.assistantBubble,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: Colors.dark.textPrimary,
  },
  assistantText: {
    color: Colors.dark.textSecondary,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.6,
  },
  userTimestamp: {
    color: Colors.dark.textPrimary,
    textAlign: 'right',
  },
  assistantTimestamp: {
    color: Colors.dark.textTertiary,
    textAlign: 'left',
  },
}); 