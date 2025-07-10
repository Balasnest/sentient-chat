export default function handler(req, res) {
  const agents = [
    {
      id: "tiktok",
      name: "TikTok Expert",
      description: "Generate My Video hashtags",
      category: "Social Media",
      group: "Trending",
      icon: "logo-tiktok",
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
      group: "Trending",
      icon: "paper-plane",
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
      group: "Trending",
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
      icon: "medkit",
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
      icon: "medkit",
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
      icon: "leaf",
      systemPrompt: [
        "Benefits of turmeric in natural medicine",
        "How to use ginger for colds?",
        "Natural remedies for headaches",
        "Are herbal supplements safe?"
      ]
    }
  ];

  res.status(200).json({ agents });
}