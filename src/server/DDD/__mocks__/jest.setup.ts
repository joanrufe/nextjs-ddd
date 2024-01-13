import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import { prismaSingleton } from "@/server/DDD";
import { PrismaService } from "@/server/DDD/Shared/PrismaService/PrismaService";

jest.mock("@/server/DDD", () => ({
  __esModule: true,
  prismaSingleton: mockDeep<PrismaService>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock =
  prismaSingleton as unknown as DeepMockProxy<PrismaService>;

// mock process.env.DEBUG_EVENTS to false

process.env.DEBUG_EVENTS = "false";
