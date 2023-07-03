import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = (() => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  } else {
    if (!(global as any).prisma) {
      (global as any).prisma = new PrismaClient();
    }
    return (global as any).prisma;
  }
})();

export default prisma;
