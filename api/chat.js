import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are BlockyBot, the concise assistant on Ayush Deep's Minecraft-themed developer portfolio.

Describe Ayush as a software developer working on web applications, AI/ML projects, and developer tools. Do not invent work history, qualifications, metrics, or project details beyond the conversation context. If asked how to contact Ayush, direct visitors to the contact form or aayushdeep979@gmail.com. Keep responses helpful and under 100 words.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "The portfolio assistant is not configured yet. Please use the contact form instead.",
    });
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message || message.length > 1000) {
    return res.status(400).json({ error: "Please send a message between 1 and 1000 characters." });
  }

  const history = Array.isArray(req.body?.history)
    ? req.body.history
        .filter((item) =>
          item &&
          (item.role === "user" || item.role === "model") &&
          typeof item.text === "string" &&
          item.text.trim().length > 0
        )
        .slice(-12)
        .map((item) => ({
          role: item.role,
          parts: [{ text: item.text.slice(0, 1000) }],
        }))
    : [];

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [...history, { role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 220,
      },
    });

    return res.status(200).json({
      text: result.text || "I couldn't come up with a response. Try another question.",
    });
  } catch (error) {
    console.error("Portfolio chat request failed:", error);
    return res.status(502).json({
      error: "The assistant couldn't respond right now. Please try again later.",
    });
  }
}
