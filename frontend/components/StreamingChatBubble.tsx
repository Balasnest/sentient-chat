import { Colors } from '@/constants/Colors';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StreamingChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isStreaming?: boolean;
  intermediateEvents?: Array<{
    type: 'thought' | 'tool_call' | 'observation';
    message: string;
    timestamp: string;
  }>;
}

const userAvatar = require('../assets/agent-icons/user.png');
const agentIcon = require('../assets/agent-icons/assistant.png');
const copyIcon = require('../assets/agent-icons/copy.png');
const shareIcon = require('../assets/agent-icons/share.png');
const editIcon = require('../assets/agent-icons/edit.png');

export const StreamingChatBubble: React.FC<StreamingChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
  isStreaming = false,
  intermediateEvents = [],
}) => {
  if (isUser) {
    // User message layout
    return (
      <View style={styles.userBubbleRow}>
        <Image source={userAvatar} style={styles.userAvatar} />
        <View style={styles.userMessageContainer}>
          <Text style={styles.userMessageText}>{message}</Text>
        </View>
        <View style={styles.userActions}>
          <TouchableOpacity>
          <Image source={editIcon} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Agent/assistant message layout (as before)
  // TODO: Handle all kind of messages, formatting, etc.
  return (
    <View style={styles.bubbleContainer}>
      <View style={{ paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image source={agentIcon} style={styles.agentIcon} />
        <View style={styles.bubbleActions}>
          <TouchableOpacity style={{marginRight: 10}}>
            <Image source={copyIcon} style={styles.rightIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image source={shareIcon} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bubble}>
          <Text style={styles.bubbleText}>
            {message} 
            {isStreaming && !isUser && (
              <Text style={styles.thinkingText}> ▋</Text>
            )}
          </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userBubbleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 21,
    paddingHorizontal: 35,
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#23272F',
  },
  editIcon: {
    width: 16,
    height: 16,
  },
  rightIcon: {
    width: 18,
    height: 18,
  },
  userMessageContainer: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginLeft: 12,
    flexShrink: 1,
    flexGrow: 1,
  },
  userMessageText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  userActions: {
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  // Agent/assistant styles (as before)
  bubbleContainer: {
    backgroundColor: Colors.dark.assistantBubble,
    paddingHorizontal: 35,
    paddingTop: 12,
  },
  agentIcon: {
    width: 32,
    height: 32,
  },
  bubble: {
    width: '100%',
  },
  bubbleActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bubbleText: {
    color: Colors.dark.textAssistant,
    fontFamily: 'Urbanist_500Medium',
    fontSize: 12,
    lineHeight: 18,
    paddingBottom: 32,
  },
  thinkingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 