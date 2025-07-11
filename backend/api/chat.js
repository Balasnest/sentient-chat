import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { agentId, message } = req.body;

  const agentPrompts = {
    tiktok: "You are a TikTok expert generating viral hashtags.",
    doctor: "You are a friendly medical assistant answering user queries simply.",
  };

  const systemPrompt = agentPrompts[agentId] || "You are a helpful assistant.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // cheap + fast model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal Server Error", detail: err.message });
  }
}
