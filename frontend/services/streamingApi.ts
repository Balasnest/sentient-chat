import Constants from 'expo-constants';

const BASE_URL = 'https://sentient-chat-ten.vercel.app';

export interface StreamingEvent {
  type: 'thought' | 'tool_call' | 'observation' | 'token' | 'error';
  message?: string;
  content?: string;
  timestamp?: string;
  detail?: string;
}

export interface StreamingCallbacks {
  onThought?: (message: string) => void;
  onToolCall?: (message: string) => void;
  onObservation?: (message: string) => void;
  onToken?: (content: string) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const isExpoGo = Constants.appOwnership === 'expo';

class StreamingApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  streamMessage(
    agentId: string,
    message: string,
    callbacks: StreamingCallbacks
  ): void {
    console.log(`[streamingApi] Connecting to /api/chat-stream with agentId=${agentId}, message="${message}"`);
    let streamMessage;

    if (isExpoGo) {
      // Fallback: fetch full response, no streaming
      streamMessage = async (agentId: any, message: any, callbacks: StreamingCallbacks) => {
        const response = await fetch(`${BASE_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agentId, message }),
        });
        const data = await response.json();
        callbacks.onToken?.(data.reply);
        callbacks.onComplete?.();
      };
      streamMessage(agentId, message, callbacks);
    } else {
      // Tested: Use react-native-sse for streaming, ignoring for Expo Go 
      // const { EventSource } = require('react-native-sse');
      // streamMessage = (agentId: any, message: any, callbacks: StreamingCallbacks) => {
      //   const eventSource = new EventSource(`${BASE_URL}/api/chat-streamdddd`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ agentId, message }),
      //   });
      //   eventSource.addEventListener('open', () => {
      //     console.log('[streamingApi] SSE connection opened');
      //   });
      //   eventSource.addEventListener('message', (event: { data: any; }) => {
      //     const data = event.data;
      //     if (data === '[DONE]') {
      //       console.log('[streamingApi] Received [DONE] - closing stream');
      //       callbacks.onComplete?.();
      //       eventSource.close();
      //       return;
      //     }
      //     try {
      //       const parsed: StreamingEvent = JSON.parse(data);
      //       if (parsed.type === 'token') {
      //         callbacks.onToken?.(parsed.content || '');
      //       } else if (parsed.type === 'error') {
      //         callbacks.onError?.(parsed.message || 'Unknown error');
      //       } else {
      //         this.handleEvent(parsed.type, data, callbacks);
      //       }
      //     } catch (err) {
      //       console.error('[streamingApi] Failed to parse message:', data, err);
      //     }
      //   });
      //   eventSource.addEventListener('error', (event: { message: any; }) => {
      //     console.error('[streamingApi] SSE error event:', event);
      //     callbacks.onError?.(event.message || 'Stream connection error');
      //     eventSource.close();
      //   });
      // };
      // streamMessage(agentId, message, callbacks);
    }
  }

  private handleEvent(eventType: string, data: string, callbacks: StreamingCallbacks) {
    try {
      const parsedData: StreamingEvent = JSON.parse(data);
      
      switch (eventType) {
        case 'thought':
          callbacks.onThought?.(parsedData.message || '');
          break;
        case 'tool_call':
          callbacks.onToolCall?.(parsedData.message || '');
          break;
        case 'observation':
          callbacks.onObservation?.(parsedData.message || '');
          break;
        case 'error':
          callbacks.onError?.(parsedData.message || 'Unknown error');
          break;
      }
    } catch (error) {
      console.error('Error parsing event data:', error);
    }
  }
}

export const streamingApiService = new StreamingApiService(BASE_URL); 