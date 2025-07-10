import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  agentId?: string;
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
    addMessage: (state, action: PayloadAction<Omit<Message, 'id' | 'timestamp'>>) => {
      const message: Message = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.messages.push(message);
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
  setLoading, 
  regenerateResponse, 
  clearChat 
} = chatSlice.actions;
export default chatSlice.reducer; 