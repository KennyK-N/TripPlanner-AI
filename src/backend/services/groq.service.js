import buildTripPlannerPrompt from "#backend/groq/prompt/input.prompt.js";
import buildChatPrompt from "#backend/groq/prompt/chat.prompt.js";
import inputSchema from "#backend/groq/schema/input.schema.js";
import chatSchema from "#backend/groq/schema/chat.schema.js";
import groqConfig from "#backend/groq/groq.config.js";
import groqClient from "#backend/groq/groqClient.js";

const MESSAGE_LIMIT = 10;
const DAY_LIMIT = 5;
/*

body Format:
{
    startDate: "2026-07-10",
    endDate: "2026-07-11",
    toCity: "Vancouver",
    toCountry: "Canada",
    interests: ["nature", "food"],
  }
*/

export async function generateTripPlan({
  startDate,
  endDate,
  toCity,
  toCountry,
  interests = [],
}) {
  try {
    const startTimestamp = Date.parse(startDate);
    const endTimestamp = Date.parse(endDate);
    //use zod later dk if need this
    if (Number.isNaN(startTimestamp) || Number.isNaN(endTimestamp)) {
      throw new Error("Invalid date format. Use YYYY-MM-DD.");
    }

    if (endTimestamp < startTimestamp) {
      throw new Error("endDate must be on or after startDate.");
    }

    const numberOfDays =
      Math.floor(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1;

    if (numberOfDays > DAY_LIMIT) {
      throw new Error(`Trip duration cannot exceed ${DAY_LIMIT} days.`);
    }

    const prompt = buildTripPlannerPrompt({
      startDate,
      endDate,
      toCity,
      toCountry,
      interests,
    });

    const config = groqConfig(inputSchema, prompt, numberOfDays);

    const completion = await groqClient.chat.completions.create(config);

    const tripPlan = JSON.parse(
      completion.choices[0]?.message?.content ?? '{"items":[]}',
    );

    return {
      sucess: true,
      msg: "Task successfully generated",
      data: tripPlan,
    };
  } catch (err) {
    return {
      success: false,
      msg: err instanceof Error ? err.message : "Unknown error",
      data: null,
    };
  }
}
/*
  body format:
    {
    "previousMessages": [
        {
        "sender": "AI",
        "message": "Hello! I am AI "
        },
        {
        "sender": "User",
        "message": "Hi"
        },
        {
        "sender": "User",
        "message": "How is your day"
        },
        {
        "sender": "AI",
        "message": "Good what do you need help with today?"
        }
    ],
    "userMessage": "What are some good places to eat in Vancouver?"
    }
  */
export async function generateAiMessage({ previousMessages, userMessage }) {
  try {
    //use zod later dk if need this
    if (userMessage.trim() === "") {
      throw new Error("String cannot be empty.");
    }

    const trimmedHistory = previousMessages.slice(-1 * MESSAGE_LIMIT);
    console.log(trimmedHistory);
    const prompt = buildChatPrompt({
      trimmedHistory,
      userMessage,
    });

    const config = groqConfig(chatSchema, prompt);
    const completion = await groqClient.chat.completions.create(config);
    const chatMessage = JSON.parse(
      completion.choices[0]?.message?.content ?? '{"items":[]}',
    );

    return {
      sucess: true,
      data: chatMessage,
      msg: "Chat message successfully generated",
    };
  } catch (err) {
    return {
      success: false,
      msg: err instanceof Error ? err.message : "Unknown error",
      data: null,
    };
  }
}
