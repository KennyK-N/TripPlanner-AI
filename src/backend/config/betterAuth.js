import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../services/prisma-client.js";

export const betterAuthConfig = {
  database: prismaAdapter(prisma, {
    provider: "postgres",
  }),
  session: {
    disableSessionRefresh: true,
  },
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
};
