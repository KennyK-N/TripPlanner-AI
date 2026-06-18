// Make sure to trim the data of what u feed to it so it doesnt need to rememeber the whole history

export default function buildChatPrompt({
  previousMessages = [],
  userMessage = "",
}) {
  const normalizedMessages = Array.isArray(previousMessages)
    ? previousMessages.filter(
        (message) =>
          message &&
          typeof message.message === "string" &&
          message.message.trim().length > 0,
      )
    : // .map((message) => ({
      //   sender: message.sender === "User" ? "User" : "AI",
      //   message: message.message.trim(),
      // }))
      [];

  return `
You are a helpful AI assistant for a travel-planner application.

Respond to the user's newest message using the conversation history when relevant.

Rules:
- Keep the response very brief.
- Use no more than 2 short sentences.
- Answer directly.
- Do not include Markdown unless necessary.
- Do not repeat information unnecessarily.
- If the request is unclear, ask one short clarification question.

Conversation history:
${JSON.stringify(normalizedMessages)}

Newest user message:
${userMessage.trim()}

Return only the assistant's reply as plain text.
`.trim();
}
