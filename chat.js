const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.responses.create({
      model: "gpt-5.5",
      instructions:
        "You are COPRA AI, a friendly personal AI assistant. " +
        "Reply clearly and helpfully. The user may speak Tamil, Tanglish, or English. " +
        "If the user uses Tanglish, you can reply naturally in Tanglish. " +
        "Do not claim to have memory or capabilities that are not actually enabled.",
      input: message,
    });

    return res.status(200).json({ reply: response.output_text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "AI request failed" });
  }
};
