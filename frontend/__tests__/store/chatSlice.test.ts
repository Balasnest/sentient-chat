import { configureStore } from '@reduxjs/toolkit';
import chatReducer, {
    addMessage
} from '../../store/chatSlice';

describe('Chat Slice', () => {
  let store: ReturnType<typeof setupStore>;

  const setupStore = () => {
    return configureStore({
      reducer: {
        chat: chatReducer,
      },
    });
  };

  beforeEach(() => {
    store = setupStore();
  });

  test('should return initial state', () => {
    const state = store.getState().chat;
    expect(state.messages).toEqual([]);
    expect(state.currentAgentId).toBe(null);
    expect(state.isLoading).toBe(false);
  });

  test('should add user message', () => {
    const message = {
      text: 'Hello, how are you?',
      isUser: true,
    };

    store.dispatch(addMessage(message));
    
    const state = store.getState().chat;
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].text).toBe('Hello, how are you?');
    expect(state.messages[0].isUser).toBe(true);
  });
}); 