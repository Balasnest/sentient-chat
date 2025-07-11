import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IntermediateEvent {
  type: 'thought' | 'tool_call' | 'observation';
  message: string;
  timestamp: string;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  agentId?: string;
  isStreaming?: boolean;
  intermediateEvents?: IntermediateEvent[];
}

interface ChatState {
  messages: Message[];
  currentAgentId: string | null;
  isLoading: boolean;
}

const initialState: ChatState = {
  messages: [],
  currentAgentId: null,
  isLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentAgent: (state, action: PayloadAction<string>) => {
      state.currentAgentId = action.payload;
      state.messages = [];
    },
    addMessage: (state, action: PayloadAction<Partial<Message>>) => {
      const message: Message = {
        id: action.payload.id || Date.now().toString() + Math.random().toString(36).slice(2),
        text: action.payload.text || '',
        isUser: !!action.payload.isUser,
        timestamp: Date.now(),
        agentId: action.payload.agentId,
        isStreaming: action.payload.isStreaming,
        intermediateEvents: action.payload.intermediateEvents || [],
      };
      state.messages.push(message);
    },
    updateStreamingMessage: (
      state,
      action: PayloadAction<{ id: string; text?: string; isStreaming?: boolean; append?: boolean }>
    ) => {
      const message = state.messages.find(msg => msg.id === action.payload.id);
      console.log("[updateStreamingMessage] message", message);
      if (message) {
        if (typeof action.payload.text === 'string') {
          if (action.payload.append) {
            message.text += action.payload.text;
          } else {
            message.text = action.payload.text;
          }
        }
        console.log("[updateStreamingMessage] message.text", message.text);
        message.isStreaming = action.payload.isStreaming ?? true;
      }
    },
    addIntermediateEvent: (state, action: PayloadAction<{ messageId: string; event: IntermediateEvent }>) => {
      const message = state.messages.find(msg => msg.id === action.payload.messageId);
      if (message) {
        if (!message.intermediateEvents) {
          message.intermediateEvents = [];
        }
        message.intermediateEvents.push(action.payload.event);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    regenerateResponse: (state) => {
      // Remove the last assistant message
      const lastAssistantIndex = state.messages.findLastIndex(msg => !msg.isUser);
      if (lastAssistantIndex !== -1) {
        state.messages.splice(lastAssistantIndex, 1);
      }
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { 
  setCurrentAgent, 
  addMessage, 
  updateStreamingMessage,
  addIntermediateEvent,
  setLoading, 
  regenerateResponse, 
  clearChat 
} = chatSlice.actions;
export default chatSlice.reducer; 