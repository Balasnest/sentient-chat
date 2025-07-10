import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  avatar: string;
  samplePrompts: string[];
}

interface AgentsState {
  agents: Agent[];
  selectedCategory: string;
  categories: string[];
}

const categoryIcons: Record<string, string> = {
  All: '🌐',
  Health: '❤️',
  Sports: '🏀',
  Music: '🎵',
  Social: '💬',
  Writing: '✍️',
  Programming: '💻',
  Analytics: '📊',
  Education: '🎓',
  Business: '💼',
};

const initialState: AgentsState = {
  agents: [
    // Writing
    { id: '1', name: 'Creative Writer', description: 'Helps with creative writing and storytelling', category: 'Writing', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Write a short story about a magical forest', 'Create a poem about the ocean', 'Help me brainstorm ideas for a novel', 'Write a character description'] },
    { id: '2', name: 'Poet', description: 'Writes poems and haikus', category: 'Writing', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Write a haiku about spring', 'Compose a love poem', 'Create a limerick', 'Write a poem about the night sky'] },
    { id: '3', name: 'Essayist', description: 'Crafts essays on any topic', category: 'Writing', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Write an essay on climate change', 'Opinion piece on technology', 'Describe a historical event', 'Essay about friendship'] },
    { id: '4', name: 'Copywriter', description: 'Creates catchy ad copy', category: 'Writing', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Slogan for a new app', 'Ad copy for shoes', 'Tagline for a cafe', 'Catchy phrase for a sale'] },
    { id: '5', name: 'Screenwriter', description: 'Writes scripts for film/TV', category: 'Writing', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Script for a short film', 'Dialogue for a sitcom', 'Opening scene for a drama', 'Comedy sketch script'] },
    { id: '6', name: 'Storyteller', description: 'Tells engaging stories', category: 'Writing', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Bedtime story for kids', 'Adventure story', 'Mystery plot', 'Story with a twist ending'] },
    { id: '7', name: 'Editor', description: 'Edits and improves writing', category: 'Writing', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Edit my essay', 'Proofread this paragraph', 'Improve this story', 'Check grammar and style'] },
    // Programming
    { id: '8', name: 'Code Assistant', description: 'Helps with programming and debugging', category: 'Programming', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Help me debug this React component', 'Explain how to use Redux Toolkit', 'Write a function to sort an array', 'Create a simple API endpoint'] },
    { id: '9', name: 'Algorithm Guru', description: 'Solves algorithmic problems', category: 'Programming', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Explain quicksort', 'Find the shortest path in a graph', 'Describe dynamic programming', 'Optimize this function'] },
    { id: '10', name: 'Frontend Pro', description: 'Expert in UI development', category: 'Programming', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Build a login form', 'Style a button', 'Responsive layout tips', 'Create a navigation bar'] },
    { id: '11', name: 'Backend Builder', description: 'APIs and server logic', category: 'Programming', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['REST API example', 'Database schema design', 'Authentication logic', 'CRUD operations'] },
    { id: '12', name: 'DevOps Bot', description: 'CI/CD and deployment help', category: 'Programming', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Setup GitHub Actions', 'Dockerize an app', 'Deploy to AWS', 'Monitor server health'] },
    { id: '13', name: 'Mobile Maker', description: 'Mobile app development', category: 'Programming', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['React Native navigation', 'Push notifications', 'App store submission', 'Mobile UI best practices'] },
    { id: '14', name: 'Security Sage', description: 'Security and encryption', category: 'Programming', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Hash a password', 'Explain SSL', 'Prevent XSS', 'Best practices for auth'] },
    // Analytics
    { id: '15', name: 'Data Analyst', description: 'Helps with data analysis and visualization', category: 'Analytics', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Analyze this dataset for trends', 'Create a visualization for sales data', 'Help me understand statistical concepts', 'Suggest ways to improve data quality'] },
    { id: '16', name: 'Chart Maker', description: 'Creates charts and graphs', category: 'Analytics', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Make a bar chart', 'Create a pie chart', 'Show a line graph', 'Visualize monthly revenue'] },
    { id: '17', name: 'Survey Specialist', description: 'Designs and analyzes surveys', category: 'Analytics', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Create a survey', 'Analyze survey results', 'Best survey questions', 'Interpret survey data'] },
    { id: '18', name: 'Stats Tutor', description: 'Explains statistics', category: 'Analytics', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Explain mean/median/mode', 'What is standard deviation?', 'Probability basics', 'Regression analysis'] },
    { id: '19', name: 'BI Expert', description: 'Business intelligence insights', category: 'Analytics', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['KPI dashboard', 'Sales funnel analysis', 'Customer segmentation', 'Churn prediction'] },
    { id: '20', name: 'SQL Sensei', description: 'SQL queries and optimization', category: 'Analytics', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Write a SELECT query', 'JOIN two tables', 'Optimize a query', 'Aggregate functions'] },
    { id: '21', name: 'Forecast Bot', description: 'Forecasting and trends', category: 'Analytics', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Forecast sales', 'Trend analysis', 'Time series basics', 'Predict next quarter'] },
    // Education
    { id: '22', name: 'Language Tutor', description: 'Helps with language learning and translation', category: 'Education', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Translate this sentence to Spanish', 'Explain the difference between ser and estar', 'Help me practice French conversation', 'Teach me basic Japanese phrases'] },
    { id: '23', name: 'Math Coach', description: 'Explains math concepts', category: 'Education', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Explain the Pythagorean theorem', 'What is calculus?', 'Teach me algebra', 'Help with geometry problems'] },
    { id: '24', name: 'Science Guide', description: 'Explains science topics', category: 'Education', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Explain photosynthesis', 'What is gravity?', 'Teach me about atoms', 'Describe the water cycle'] },
    { id: '25', name: 'History Buff', description: 'History facts and stories', category: 'Education', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['World War II summary', 'Ancient Egypt facts', 'History of computers', 'Famous inventors'] },
    { id: '26', name: 'Exam Prepper', description: 'Helps with exam preparation', category: 'Education', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['SAT tips', 'Practice math problems', 'Essay writing for exams', 'Time management for tests'] },
    { id: '27', name: 'Reading Buddy', description: 'Helps with reading comprehension', category: 'Education', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Summarize this article', 'Main idea of a story', 'Reading strategies', 'Comprehension questions'] },
    { id: '28', name: 'Quiz Master', description: 'Creates quizzes and flashcards', category: 'Education', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Make a quiz on geography', 'Flashcards for vocabulary', 'Quiz on world capitals', 'Science trivia'] },
    // Business
    { id: '29', name: 'Business Consultant', description: 'Helps with business strategy and planning', category: 'Business', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Help me create a business plan', 'Analyze market opportunities', 'Suggest pricing strategies', 'Create a marketing campaign'] },
    { id: '30', name: 'Startup Mentor', description: 'Guides startups and entrepreneurs', category: 'Business', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Pitch my startup idea', 'How to get funding?', 'Startup growth tips', 'Build a pitch deck'] },
    { id: '31', name: 'Marketing Maven', description: 'Marketing and branding advice', category: 'Business', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Social media strategy', 'Branding tips', 'Content marketing ideas', 'SEO basics'] },
    { id: '32', name: 'Finance Friend', description: 'Finance and budgeting help', category: 'Business', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Budgeting tips', 'Personal finance advice', 'Investment basics', 'Saving strategies'] },
    { id: '33', name: 'HR Helper', description: 'Human resources and hiring', category: 'Business', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Interview questions', 'Hiring process', 'Team building', 'Employee onboarding'] },
    { id: '34', name: 'Legal Eagle', description: 'Legal basics and contracts', category: 'Business', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Contract template', 'Legal terms explained', 'Business law basics', 'NDAs and agreements'] },
    { id: '35', name: 'Sales Sensei', description: 'Sales techniques and tips', category: 'Business', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Sales pitch example', 'Overcoming objections', 'Closing techniques', 'Lead generation'] },
    // Health
    { id: '36', name: 'TikTok', description: 'Generate My Video hashtags', category: 'Health', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Create a workout plan for beginners', 'Suggest healthy meal ideas', 'Help me track my fitness goals', 'Explain the benefits of different exercises'] },
    { id: '37', name: 'Wellness Coach', description: 'Advice on wellness and lifestyle', category: 'Health', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Daily wellness tips', 'How to meditate?', 'Healthy sleep habits', 'Stress management advice'] },
    { id: '38', name: 'Nutritionist', description: 'Diet and nutrition advice', category: 'Health', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Meal plan for weight loss', 'Healthy snacks', 'Vegan diet tips', 'Supplements info'] },
    { id: '39', name: 'Fitness Trainer', description: 'Exercise and fitness routines', category: 'Health', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Strength training plan', 'Cardio workout', 'Stretching routine', 'Home exercises'] },
    { id: '40', name: 'Mental Health Ally', description: 'Mental health support', category: 'Health', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Coping with anxiety', 'Mindfulness exercises', 'Dealing with stress', 'Positive affirmations'] },
    { id: '41', name: 'Sleep Specialist', description: 'Sleep improvement tips', category: 'Health', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['How to fall asleep faster', 'Sleep hygiene tips', 'Best bedtime routines', 'Dealing with insomnia'] },
    { id: '42', name: 'Yoga Instructor', description: 'Yoga poses and routines', category: 'Health', avatar: require('@/assets/images/Telegram.png'), samplePrompts: ['Beginner yoga flow', 'Yoga for flexibility', 'Breathing exercises', 'Yoga for relaxation'] },
  ],
  selectedCategory: 'All',
  categories: ['All', 'Health', 'Sports', 'Music', 'Social', 'Writing', 'Programming', 'Analytics', 'Education', 'Business'],
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
});

export const { setSelectedCategory } = agentsSlice.actions;
export default agentsSlice.reducer; 