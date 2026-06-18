import express from "express";
import { generateAiMessage } from "#backend/services/groq.service.js";
import authMiddleware from "#backend/middleware/auth.middleware.js";
const groqRouter = express.Router();

// Todo add auth middleware later
// Also maybe rename this better
groqRouter.post("/chat", authMiddleware, async (req, res, next) => {
  /*
  body format:
    {
    "previousMessages": [
        {
        "sender": "AI",
        "message": "Hello! I am AI"
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
  const obj = req.body;
  try {
    const response = await generateAiMessage(obj);
    if (!response.success) throw new Error(response.msg);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default groqRouter;
