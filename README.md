# Sentient Chat

A pixel-perfect, real-time AI agent chat app built with Expo, React Native, TypeScript, and Redux Toolkit. The app features **streaming chat with intermediate agent events** that simulate Sentient Agent behavior, including thought processes, tool calls, and observations before generating responses.

---

## Project Architecture

- **Monorepo**: Contains both frontend (mobile app) and backend (API) in a single repository.
- **Frontend**: Expo/React Native app with file-based routing (Expo Router), Redux Toolkit for state, and dynamic API integration.
- **Backend**: Vercel serverless API endpoints (Node.js/Express style) for agent data and **streaming chat** (OpenAI proxy with SSE).

---

## Streaming Chat Features

### Backend Streaming API (`/api/chat-stream`)
- **Server-Sent Events (SSE)** for real-time communication
- **Intermediate Events**: `thought`, `tool_call`, `observation` events before token streaming
- **Token Streaming**: Real-time OpenAI response streaming
- **Agent-Specific Behaviors**: Each agent has unique intermediate events and system prompts
- **Error Handling**: Graceful error handling with SSE error events

### Frontend Streaming Implementation
- **StreamingChatBubble**: Enhanced chat bubble showing intermediate events with icons
- **Real-time Updates**: Live token streaming with typing cursor
- **Event Visualization**: Color-coded intermediate events (thought, tool_call, observation)
- **State Management**: Redux integration for streaming message updates

### Example Agent Events
```typescript
// TikTok Agent
thought: "Analyzing current TikTok trends..."
tool_call: "Checking viral hashtag patterns..."
observation: "Found trending hashtags in your niche"

// Medicine Agent  
thought: "Analyzing your medication query..."
tool_call: "Checking medical databases for accurate information..."
observation: "Found relevant medical information"
```

---

## Folder Structure

```
sentient-chat/
├── frontend/
│   ├── app/                # Expo Router pages (screens, tabs, layouts)
│   │   ├── agent-chat-streaming.tsx  # Streaming chat screen
│   │   └── ...
│   ├── components/         # Reusable UI components
│   │   ├── StreamingChatBubble.tsx   # Streaming chat bubble
│   │   └── ...
│   ├── services/           # API service for backend communication
│   │   ├── streamingApi.ts # Streaming API service
│   │   └── api.ts
│   ├── store/              # Redux slices, hooks, and store config
│   └── ...
├── backend/
│   └── api/                # Vercel API endpoints
│       ├── chat-stream.ts  # Streaming chat endpoint
│       ├── agents.ts
│       └── chat.ts
├── README.md
└── ...
```

---

## Tech Stack

- **Frontend**:
  - [Expo](https://expo.dev/) (React Native)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Expo Router](https://expo.github.io/router/) (file-based navigation)
  - [Redux Toolkit](https://redux-toolkit.js.org/) (state management)
  - [React Redux](https://react-redux.js.org/)
  - [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
  - [@expo-google-fonts/poppins](https://github.com/expo/google-fonts)
  - [Jest](https://jestjs.io/) & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) for testing

- **Backend**:
  - [Vercel Serverless Functions](https://vercel.com/docs/functions)
  - [Node.js](https://nodejs.org/)
  - [OpenAI API](https://platform.openai.com/docs/api-reference) with streaming
  - **Server-Sent Events (SSE)** for real-time communication
  - [Jest](https://jestjs.io/) for API testing

---

## State Management

- **Redux Toolkit** is used for all app state:
  - `agentsSlice`: Handles fetching and storing the agent list from the backend, category selection, and error/loading state.
  - `chatSlice`: Manages chat messages, current agent, loading state, regeneration logic, and **streaming message updates**.
  - **New Actions**: `updateStreamingMessage`, `addIntermediateEvent` for streaming support
  - Typed hooks (`useAppSelector`, `useAppDispatch`) for type-safe Redux usage.

---

## API Integration

- **Base URL**: `https://sentient-chat-ten.vercel.app/`
- **Endpoints**:
  - `GET /api/agents` — Returns all agents with id, name, description, category, icon, and systemPrompt
  - `POST /api/chat` — `{ agentId, message }` → `{ reply }` (regular chat)
  - **`POST /api/chat-stream`** — `{ agentId, message }` → **SSE stream** with intermediate events and tokens

### Streaming API Response Format
```typescript
// Intermediate Events (SSE)
event: thought
data: {"type":"thought","message":"Analyzing trends...","timestamp":"2024-01-01T00:00:00Z"}

event: tool_call  
data: {"type":"tool_call","message":"Checking databases...","timestamp":"2024-01-01T00:00:00Z"}

event: observation
data: {"type":"observation","message":"Found relevant data","timestamp":"2024-01-01T00:00:00Z"}

// Token Streaming
data: {"type":"token","content":"Hello"}

// Completion
data: [DONE]
```

---

## How to Add or Update Agents

1. **Edit** `backend/api/agents`:
   - Add or update agent objects in the `agents` array.
   - Each agent should have: `id`, `name`, `description`, `category`, `icon` (Ionicons name), and `systemPrompt` (array of sample prompts).
2. **Edit** `backend/api/chat-stream`:
   - Add agent-specific configuration in `agentConfigs` object
   - Define custom `systemPrompt` and `intermediateEvents` for each agent
3. **Deploy** the backend (Vercel redeploys automatically on push).
4. **Frontend** will reflect changes on next fetch (no code changes needed).

---

## Getting Started

### Running the Project

1. **Install dependencies**:
   ```sh
   cd frontend
   npm install
   ```
2. **Start the Expo app**:
   ```sh
   npm start
   ```
3. **Open in simulator or device** (iOS/Android/Web via Expo Go or emulator)

### Testing the App

We've set up a comprehensive testing infrastructure to ensure everything works smoothly:

1. **Run all tests**:
   ```sh
   cd frontend
   npm test
   ```
2. **Check test coverage**:
   ```sh
   npm run test:coverage
   ```
3. **Run tests in watch mode** (for development):
   ```sh
   npm run test:watch
   ```

The testing setup includes:
- **Backend Tests**: API endpoint testing in `backend/__tests__/`
- **Frontend Tests**: Redux store and component testing in `frontend/__tests__/`
- **Minimal Test Cases**: Focused on essential functionality to keep tests fast and maintainable

---

## Key Features

- **Streaming Chat**: Real-time token streaming with intermediate agent events
- **Agent Thought Process**: Visual representation of agent thinking, tool calls, and observations
- Dynamic agent list with icons and categories (from backend)
- Category filter chips and horizontal scroll
- Agent Home with sample prompts (from backend)
- Real-time chat with OpenAI-powered agents
- Regenerate response functionality
- Pixel-perfect dark theme and modern UI
- All agent content managed from backend only
- **Comprehensive Testing**: Jest setup with minimal test cases for API and Redux store functionality

---

## Project Status

- **Visual Fidelity**: Matches Figma design  
- **API-driven**: All agent data from backend  
- **State Management**: Redux Toolkit  
- **Navigation**: Expo Router  
- **Streaming Chat**: Real-time token streaming with intermediate events  
- **Sentient Agent Simulation**: Thought processes, tool calls, observations  
- **Testing Infrastructure**: Jest configuration with minimal test cases for API and Redux functionality 