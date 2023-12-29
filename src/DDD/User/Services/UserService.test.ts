import { UserService } from "./UserService";
import { PrismaClient } from "@prisma/client";

describe("UserService", () => {
  let userService: UserService;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    userService = new UserService(prisma);
  });

  describe("getUser", () => {
    it("should return the user with the given id", async () => {
      // Mock the PrismaClient's `user.findUnique` method
      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
      });

      const user = await userService.getUser("1");

      expect(user).toEqual({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
      });
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      // Mock the PrismaClient's `user.create` method
      jest.spyOn(prisma.user, "create").mockResolvedValueOnce({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
      });

      const newUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
      };

      const createdUser = await userService.create(newUser);

      expect(createdUser).toEqual({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
      });
    });
  });
});
