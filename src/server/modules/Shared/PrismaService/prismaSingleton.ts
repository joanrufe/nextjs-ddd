import { PrismaService } from "./PrismaService";

const prismaClientSingleton = () => {
  return new PrismaService();
};

export const prismaSingleton: ReturnType<typeof prismaClientSingleton> =
  //@ts-ignore
  globalThis.prismaSingleton ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production")
  //@ts-ignore
  globalThis.prismaSingleton = prismaSingleton;
