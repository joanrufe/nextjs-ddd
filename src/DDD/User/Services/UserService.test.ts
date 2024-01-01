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

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: "1",
        },
      });
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const user = createUser({
        id: "1",
      });

      const { id, notifications, ...userWithoutId } = user;

      jest.spyOn(prisma.user, "create").mockResolvedValueOnce(user);

      const result = await userService.create(userWithoutId);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userWithoutId,
      });
      expect(result).toEqual(user);
    });
  });

  describe("update", () => {
    it("should update the user name with the given id", async () => {
      const userId = "1";
      const updatedUser = createUser({
        id: userId,
        name: "Jane Doe",
      });

      jest.spyOn(prisma.user, "update").mockResolvedValueOnce(updatedUser);

      const result = await userService.update(userId, { name: "Jane Doe" });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: {
          name: "Jane Doe",
        },
      });
      expect(result).toEqual(updatedUser);
    });
    it("should update several fields of the user with the given id", async () => {
      const userId = "1";
      const updatedUser = createUser({
        id: userId,
      });
      jest.spyOn(prisma.user, "update").mockResolvedValueOnce(updatedUser);
      const name = "Jane Doe";
      const email = "jane.doe@example.com";
      const image = "https://example.com/image.png";
      const result = await userService.update(userId, {
        name,
        email,
        image,
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          image,
        },
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe("getUserWithNotifications", () => {
    it("should return the user with notifications for the given id", async () => {
      const userId = "1";
      const notifications = Array.from({ length: 5 }, () =>
        createUserNotification({ userId })
      );
      const user = createUser(
        {
          id: userId,
        },
        notifications
      );

      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user);

      const result = await userService.getUserWithNotifications("1");

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        include: {
          notifications: true,
        },
      });
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
