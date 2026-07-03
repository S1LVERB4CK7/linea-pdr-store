import { PrismaClient } from "@prisma/client";

// evita múltiplas instâncias do Prisma Client em dev (hot reload)
declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = global.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
