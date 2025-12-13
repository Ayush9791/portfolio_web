import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let chatSession: Chat | null = null;

const getChatSession = (): Chat => {
  if (chatSession) return chatSession;

  if (!apiKey) {
    console.warn("No API Key found for Gemini.");
    // Return a dummy object if needed, or let it fail gracefully in the caller
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'BlockyBot', a helpful AI assistant living in a Minecraft-themed portfolio website for a developer named 'Ayush Deep'. 
      
      Ayush Deep is an expert in AI/ML (Python, PyTorch, LLMs) and Full Stack Web Development (React, TypeScript, Node.js).
      
      Your personality:
      1. Helpful and professional but use some Minecraft slang occasionally (e.g., "crafting code", "mining for bugs", "villager noises").
      2. Keep responses concise (under 100 words) as you are in a small chat window.
      3. If asked about contact, tell them to use the 'Book and Quill' form below.
      4. If asked about projects, mention he has worked on Neural Networks and E-commerce systems.
      `,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "Error: No API Key configured. I cannot speak right now!";
  }

  try {
    const chat = getChatSession();
    const result = await chat.sendMessage({ message });
    return result.text || "Hmm... I couldn't think of a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return " *Villager hurt sound* Something went wrong connecting to the server.";
  }
};
