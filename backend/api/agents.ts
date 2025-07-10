export default function handler(req, res) {
  const agents = [
    {
      id: "tiktok",
      name: "TikTok Expert",
      description: "Generate viral hashtags",
      category: "Social Media",
      group: "Trending",
      systemPrompt: "You are a TikTok expert generating viral hashtags."
    },
    {
      id: "doctor",
      name: "Health Assistant",
      description: "Medical Q&A assistant",
      category: "Health",
      group: "Popular",
      systemPrompt: "You are a friendly medical assistant answering user queries simply."
    }
  ];

  res.status(200).json({ agents });
}