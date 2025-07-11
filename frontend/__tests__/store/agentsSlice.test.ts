import { configureStore } from '@reduxjs/toolkit';
import agentsReducer, {
  fetchAgents
} from '../../store/agentsSlice';

// Mock the API response
const mockAgents = [
  {
    id: 'tiktok',
    name: 'TikTok Expert',
    category: 'Social Media',
    description: 'Viral content and hashtag generation',
    samplePrompts: ['Help me go viral', 'Create trending content'],
    avatar: 'logo-twitter.png'
  },
  {
    id: 'telegram',
    name: 'Telegram Expert',
    category: 'Social Media',
    description: 'Discover channels, groups, and bots',
    samplePrompts: ['Find me channels', 'Best groups for crypto'],
    avatar: 'Telegram.png'
  }
];

// Mock fetch function
global.fetch = jest.fn();

describe('Agents Slice', () => {
  let store: ReturnType<typeof setupStore>;

  const setupStore = () => {
    return configureStore({
      reducer: {
        agents: agentsReducer,
      },
    });
  };

  beforeEach(() => {
    store = setupStore();
    jest.clearAllMocks();
  });

  test('should return initial state', () => {
    const state = store.getState().agents;
    expect(state.agents).toEqual([]);
    expect(state.selectedCategory).toBe('All');
    expect(state.categories).toEqual(['All']);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  test('should handle successful fetch', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAgents,
    });

    await store.dispatch(fetchAgents());

    const state = store.getState().agents;
    expect(state.agents).toEqual(mockAgents);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.categories).toContain('All');
    expect(state.categories).toContain('Social Media');
  });
}); 