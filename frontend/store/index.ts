import { configureStore } from '@reduxjs/toolkit';
import agentsReducer from './agentsSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    agents: agentsReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 