export default function handler(req, res) {
  const agents = [
    {
      id: "tiktok",
      name: "TikTok",
      description: "Generate My Video hashtags",
      category: "Social Media",
      group: "Trending",
      icon: "Tiktok",
      systemPrompt: [
        "Generate hashtags for a fitness video",
        "Create viral hashtags for cooking content",
        "Suggest hashtags for travel vlog",
        "Generate hashtags for a fitness video"
      ]
    },
    {
      id: "telegram",
      name: "Telegram",
      description: "Generate popular Channels in telegram",
      category: "Social Media",
      group: "Telegram",
      icon: "Telegram",
      systemPrompt: [
        "Suggest popular Telegram channels for tech news",
        "Find Telegram groups for language learning",
        "How to grow a Telegram channel?",
        "Best Telegram bots for productivity"
      ]
    },
    {
      id: "twitter",
      name: "Twitter",
      description: "Generate My Trending Hashtags",
      category: "Social Media",
      group: "Twitter",
      icon: "logo-twitter",
      systemPrompt: [
        "Generate trending hashtags for a product launch",
        "Find hashtags for a sports event",
        "Suggest hashtags for a book release",
        "How to make a hashtag trend on Twitter?"
      ]
    },
    {
      id: "medicine",
      name: "Medicine",
      description: "Generate Text For My All Medicine",
      category: "Health",
      group: "Popular",
      icon: "Pill",
      systemPrompt: [
        "List uses for paracetamol",
        "What are the side effects of ibuprofen?",
        "How to take antibiotics safely?",
        "Explain the difference between generic and brand medicines"
      ]
    },
    {
      id: "disease",
      name: "Disease",
      description: "Generate Text For All Disease problems",
      category: "Health",
      group: "Popular",
      icon: "DNA",
      systemPrompt: [
        "Explain symptoms of diabetes",
        "How to prevent the flu?",
        "What are common allergies?",
        "Describe treatment for hypertension"
      ]
    },
    {
      id: "natural",
      name: "Natural",
      description: "Generate Text For Natural Medicine",
      category: "Health",
      group: "Popular",
      icon: "Cannabis",
      systemPrompt: [
        "Benefits of turmeric in natural medicine",
        "How to use ginger for colds?",
        "Natural remedies for headaches",
        "Are herbal supplements safe?"
      ]
    },
    {
      id: "football",
      name: "Football",
      description: "Generate Text For Football",
      category: "Sports",
      group: "Popular",
      icon: "football",
      systemPrompt: [
        "How to improve football skills?",
        "Best football players of all time",
        "How to train for a football match?",
        "Football tactics for beginners"
      ]
    },
    {
      id: "gym",
      name: "Gym",
      description: "Generate Text For Gym",
      category: "Sports",
      group: "Popular",
      icon: "dumbbell",
      systemPrompt: [
        "How to improve gym skills?",
        "Best gym players of all time",
        "How to train for a gym match?",
        "Gym tactics for beginners"
      ]
    },
    {
      id: "baseball",
      name: "Baseball",
      description: "Generate Text For Baseball",
      category: "Sports",
      group: "Popular",
      icon: "baseball",
      systemPrompt: [
        "How to improve baseball skills?",
        "Best baseball players of all time",
        "How to train for a baseball match?",
        "Baseball tactics for beginners"
      ]
    }
  ];

  res.status(200).json({ agents });
}