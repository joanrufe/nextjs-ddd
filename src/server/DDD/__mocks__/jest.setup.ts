import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { prismaSingleton } from "@/server/DDD/";
import { PrismaClient } from "@prisma/client";

jest.mock("@/server/DDD", () => ({
  __esModule: true,
  prismaSingleton: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock =
  prismaSingleton as unknown as DeepMockProxy<PrismaClient>;

// mock process.env.DEBUG_EVENTS to false

process.env.DEBUG_EVENTS = "false";
