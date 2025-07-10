export default function handler(req, res) {
  const agents = [
    {
      id: "tiktok",
      name: "TikTok Expert",
      description: "Generate viral hashtags",
      category: "Social Media",
      group: "Trending",
      systemPrompt: [
        "Generate hashtags for a fitness video",
        "Create viral hashtags for cooking content",
        "Suggest hashtags for travel vlog",
        "Generate hashtags for a fitness video"
      ]
    },
    {
      id: "doctor",
      name: "Health Assistant",
      description: "Medical Q&A assistant",
      category: "Health",
      group: "Popular",
      systemPrompt: [
        "Explain the benefits of different exercises",
        "Suggest healthy meal ideas",
        "Help me track my fitness goals",
        "Explain the benefits of different exercises"
      ]
    }
  ];

  res.status(200).json({ agents });
}