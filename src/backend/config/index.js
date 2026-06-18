import dotenv from "dotenv";

const config = {
  BACK_END_PORT: Number(process.env.BACK_END_PORT),
  FRONT_END_URL: process.env.FRONT_END_URL,
  NODE_ENV: process.env.NODE_ENV,
  AUTH_SECRET: process.env.AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
};

export default config;
