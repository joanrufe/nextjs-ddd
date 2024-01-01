import { PrismaService } from "@/DDD/Shared/PrismaService/PrismaService";
import { prismaMock } from "../../__mocks__/jest.setup";
import { UserService } from "./UserService";
import { createUser } from "../Factories/UserFactory";
import { createUserNotification } from "../Factories/UserNotificationsFactory";

describe("UserService", () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = prismaMock;
    userService = new UserService(prisma);
  });

  describe("getUser", () => {
    it("should return the user with the given id", async () => {
      const user = createUser({
        id: "1",
      });

      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user);

      const result = await userService.getUser("1");

      expect(result).toEqual(user);
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const user = createUser({
        id: "1",
      });

      jest.spyOn(prisma.user, "create").mockResolvedValueOnce(user);

      const result = await userService.create(user as any);

      expect(result).toEqual(user);
    });
  });

  describe("getUserWithNotifications", () => {
    it("should return the user with notifications for the given id", async () => {
      const userId = "1";
      const notifications = Array.from({ length: 5 }, () =>
        createUserNotification({ userId })
      );
      const user = createUser({
        id: userId,
      });

      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user);

      const result = await userService.getUserWithNotifications("1");

      expect(result).toEqual(user);
    });

    it("should throw an error if user is not found", async () => {
      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(null);

      await expect(userService.getUserWithNotifications("1")).rejects.toThrow(
        "User not found"
      );
    });
  });
});
