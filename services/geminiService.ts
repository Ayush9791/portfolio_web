import type { ChatMessage } from "../types";

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[] = [],
): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history.slice(-12).map(({ role, text }) => ({ role, text })),
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return typeof data.error === "string"
        ? data.error
        : "The assistant is unavailable right now. Please try again later.";
    }

    return typeof data.text === "string" && data.text.trim()
      ? data.text
      : "I couldn't come up with a response. Try asking another question.";
  } catch (error) {
    console.error("Chat request failed:", error);
    return "I couldn't connect to the assistant. Check your connection and try again.";
  }
};
