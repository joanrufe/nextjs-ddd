import { PrismaService } from "@/DDD/Shared/PrismaService/PrismaService";
import { prismaMock } from "../../__mocks__/jest.setup";
import { UserService } from "./UserService";

describe("UserService", () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = prismaMock;
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

  describe("getUserWithNotifications", () => {
    it("should return the user with notifications for the given id", async () => {
      // Mock the PrismaClient's `user.findUnique` method
      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
        notifications: [
          {
            id: "1",
            userId: "1",
            message: "Notification 1",
            read: false,
            createdAt: new Date(),
          },
          {
            id: "2",
            userId: "1",
            message: "Notification 2",
            read: false,
            createdAt: new Date(),
          },
        ] as any,
      });

      const user = await userService.getUserWithNotifications("1");

      expect(user).toEqual({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
        notifications: [
          {
            id: "1",
            message: "Notification 1",
          },
          {
            id: "2",
            message: "Notification 2",
          },
        ],
      });
    });

    it("should throw an error if user is not found", async () => {
      // Mock the PrismaClient's `user.findUnique` method to return null
      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(null);

      await expect(userService.getUserWithNotifications("1")).rejects.toThrow(
        "User not found"
      );
    });
  });
});
