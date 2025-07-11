// Global error handler to prevent polyfills errors
global.Error = class extends Error {
  constructor(message) {
    super(message);
    this.name = 'Error';
  }
};

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useFocusEffect: jest.fn(),
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {});

// Mock react-native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Keyboard: {
      dismiss: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    Platform: {
      ...RN.Platform,
      OS: 'ios',
    },
  };
});