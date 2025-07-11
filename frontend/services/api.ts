const BASE_URL = 'https://sentient-chat-ten.vercel.app';

export interface Agent {
  id: string;
  name: string;
  icon: string;
  category: string;
  description?: string;
  systemPrompt?: string[];
  group?: string;
}

export interface ChatRequest {
  agentId: string;
  message: string;
}

export interface ChatResponse {
  reply: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAgents(): Promise<Agent[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.agents || [];
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  }

  async sendMessage(agentId: string, message: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService(BASE_URL); 