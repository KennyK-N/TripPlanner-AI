import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "#backend/prisma/prisma.client.js";
import config from "#backend/config/index.js";

export const betterAuthConfig = {
  database: prismaAdapter(prisma, {
    provider: "postgres",
  }),
  session: {
    disableSessionRefresh: true,
  },
  secret: config.AUTH_SECRET,
  baseURL: config.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    },
  },
};
