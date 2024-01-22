import { mockDeep } from "jest-mock-extended";
import { PrismaService } from "../Shared/PrismaService/PrismaService";
import "../Shared/PrismaService/prismaSingleton";

// mock prismaSingleton
jest.mock("../Shared/PrismaService/prismaSingleton", () => {
  return {
    prismaSingleton: mockDeep<PrismaService>(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

process.env.DEBUG_EVENTS = "false";
