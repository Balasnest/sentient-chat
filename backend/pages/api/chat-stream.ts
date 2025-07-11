import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Agent-specific system prompts and behaviors
const agentConfigs = {
  tiktok: {
    systemPrompt: "You are a TikTok expert specializing in viral content and hashtag generation. You think step by step, analyze trends, and provide actionable advice.",
    intermediateEvents: [
      { type: "thought", message: "Analyzing current TikTok trends..." },
      { type: "tool_call", message: "Checking viral hashtag patterns..." },
      { type: "observation", message: "Found trending hashtags in your niche" }
    ]
  },
  telegram: {
    systemPrompt: "You are a Telegram expert helping users discover channels, groups, and bots. You provide detailed recommendations based on user interests.",
    intermediateEvents: [
      { type: "thought", message: "Understanding your Telegram needs..." },
      { type: "tool_call", message: "Searching for relevant channels and groups..." },
      { type: "observation", message: "Found high-quality Telegram resources" }
    ]
  },
  twitter: {
    systemPrompt: "You are a Twitter/X expert specializing in trending hashtags and viral content strategies. You help users maximize their reach and engagement.",
    intermediateEvents: [
      { type: "thought", message: "Analyzing Twitter trending topics..." },
      { type: "tool_call", message: "Checking hashtag performance metrics..." },
      { type: "observation", message: "Identified high-engagement hashtags" }
    ]
  },
  medicine: {
    systemPrompt: "You are a medical information assistant. You provide educational information about medications, their uses, and safety guidelines. Always recommend consulting healthcare professionals for medical advice.",
    intermediateEvents: [
      { type: "thought", message: "Analyzing your medication query..." },
      { type: "tool_call", message: "Checking medical databases for accurate information..." },
      { type: "observation", message: "Found relevant medical information" }
    ]
  },
  disease: {
    systemPrompt: "You are a health information assistant. You provide educational information about diseases, symptoms, and prevention. Always recommend consulting healthcare professionals for medical diagnosis.",
    intermediateEvents: [
      { type: "thought", message: "Understanding your health concern..." },
      { type: "tool_call", message: "Researching symptoms and conditions..." },
      { type: "observation", message: "Gathered relevant health information" }
    ]
  },
  natural: {
    systemPrompt: "You are a natural medicine consultant. You provide information about herbal remedies, natural supplements, and traditional healing methods. Always recommend consulting healthcare professionals.",
    intermediateEvents: [
      { type: "thought", message: "Researching natural remedies..." },
      { type: "tool_call", message: "Checking traditional medicine databases..." },
      { type: "observation", message: "Found relevant natural medicine information" }
    ]
  },
  football: {
    systemPrompt: "You are a football expert providing insights on skills, tactics, training, and the sport's greatest players. You offer practical advice for players at all levels.",
    intermediateEvents: [
      { type: "thought", message: "Analyzing your football question..." },
      { type: "tool_call", message: "Checking football statistics and strategies..." },
      { type: "observation", message: "Found relevant football insights" }
    ]
  },
  gym: {
    systemPrompt: "You are a fitness and gym expert. You provide advice on workouts, training programs, nutrition, and fitness goals. You help users achieve their fitness objectives safely and effectively.",
    intermediateEvents: [
      { type: "thought", message: "Understanding your fitness goals..." },
      { type: "tool_call", message: "Analyzing workout programs and nutrition..." },
      { type: "observation", message: "Created personalized fitness recommendations" }
    ]
  },
  baseball: {
    systemPrompt: "You are a baseball expert providing insights on skills, strategies, training, and the sport's greatest players. You offer practical advice for players and fans.",
    intermediateEvents: [
      { type: "thought", message: "Analyzing your baseball question..." },
      { type: "tool_call", message: "Checking baseball statistics and strategies..." },
      { type: "observation", message: "Found relevant baseball insights" }
    ]
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { agentId, message } = req.body;

  if (!agentId || !message) {
    return res.status(400).json({ error: "Missing agentId or message" });
  }

  const agentConfig = agentConfigs[agentId] || {
    systemPrompt: "You are a helpful assistant.",
    intermediateEvents: [
      { type: "thought", message: "Processing your request..." },
      { type: "tool_call", message: "Gathering information..." },
      { type: "observation", message: "Ready to respond" }
    ]
  };

  // Set up SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  try {
    // Send intermediate events first
    for (const event of agentConfig.intermediateEvents) {
      const eventData = JSON.stringify({
        type: event.type,
        message: event.message,
        timestamp: new Date().toISOString()
      });
      
      res.write(`event: ${event.type}\n`);
      res.write(`data: ${eventData}\n\n`);
      
      // Add a small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Start OpenAI streaming
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: agentConfig.systemPrompt },
        { role: "user", content: message }
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000
    });

    // Stream the response tokens
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ type: "token", content })}\n\n`);
      }
    }

    // Send completion signal
    res.write(`data: [DONE]\n\n`);
    res.end();

  } catch (error) {
    console.error('Streaming error:', error);
    
    // Send error event
    const errorData = JSON.stringify({
      type: "error",
      message: "Failed to generate response",
      detail: error.message
    });
    
    res.write(`event: error\n`);
    res.write(`data: ${errorData}\n\n`);
    res.end();
  }
} 