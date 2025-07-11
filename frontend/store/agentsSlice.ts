import { Agent as ApiAgent, apiService } from '@/services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  avatar: string; // icon name from BE
  samplePrompts: string[];
}

interface AgentsState {
  agents: Agent[];
  selectedCategory: string;
  categories: string[];
  loading: boolean;
  error: string | null;
}

const categoryIcons: Record<string, string> = {
  All: 'globe',
  Health: 'heart',
  Sports: 'football',
  Music: 'music',
  Social: 'paper-plane',
  Writing: 'pencil',
  Programming: 'code',
  Analytics: 'chart-bar',
  Education: 'school',
  Business: 'briefcase',
  'Social Media': 'paper-plane',
};

// Async thunk to fetch agents from API
export const fetchAgents = createAsyncThunk(
  'agents/fetchAgents',
  async () => {
    const apiAgents = await apiService.getAgents();
    return apiAgents.map((apiAgent: ApiAgent) => ({
      id: apiAgent.id,
      name: apiAgent.name,
      description: apiAgent.description || '',
      category: apiAgent.category,
      avatar: apiAgent.icon || 'person-circle', // Use icon from BE, fallback to Ionicons default
      samplePrompts: Array.isArray(apiAgent.systemPrompt) ? apiAgent.systemPrompt : [],
    }));
  }
);

const initialState: AgentsState = {
  agents: [],
  selectedCategory: 'All',
  categories: ['All'],
  loading: false,
  error: null,
};

export { categoryIcons };

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
        // Update categories based on fetched agents
        const categories = ['All', ...new Set(action.payload.map(agent => agent.category))];
        state.categories = categories;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch agents';
      });
  },
});

export const { setSelectedCategory } = agentsSlice.actions;
export default agentsSlice.reducer; 