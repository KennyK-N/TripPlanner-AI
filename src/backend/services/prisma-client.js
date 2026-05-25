import { PrismaClient } from "@prisma/client";

// Creates Singleton Prisma Client for Development mode

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
