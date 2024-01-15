import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import "reflect-metadata";

// mock prismaSingleton
const prismaSingleton = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock =
  prismaSingleton as unknown as DeepMockProxy<PrismaClient>;

process.env.DEBUG_EVENTS = "false";
