import { PrismaService } from "@/server/DDD/Shared/PrismaService/PrismaService";
import { prismaMock } from "../../../__mocks__/jest.setup";
import { UserNotificationsService } from "./UserNotificationsService";
import { createUser } from "../Factories/UserFactory";
import { createUserNotification } from "../Factories/UserNotificationsFactory";

describe("UserNotificationsService", () => {
  let userService: UserNotificationsService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = prismaMock;
    userService = new UserNotificationsService(prisma);
  });

  describe("getUserWithNotifications", () => {
    it("should return the user with notifications for the given id", async () => {
      const userEmail = "whatever@email.com";
      const notifications = Array.from({ length: 5 }, () =>
        createUserNotification({ userId: userEmail })
      );
      jest
        .spyOn(prisma.notification, "findMany")
        .mockResolvedValueOnce(notifications);

      const result = await userService.findAll(userEmail);

      expect(prisma.notification.findMany).toHaveBeenCalledWith({
        where: {
          user: {
            email: userEmail,
          },
        },
      });
      expect(result).toEqual(notifications);
    });

    it("should return null if user is not found", async () => {
      const userEmail = "jane.doe@example.com";
      jest.spyOn(prisma.notification, "findMany").mockResolvedValueOnce([]);

      const result = await userService.findAll(userEmail);

      expect(prisma.notification.findMany).toHaveBeenCalledWith({
        where: {
          user: {
            email: userEmail,
          },
        },
      });
      expect(result).toStrictEqual([]);
    });
  });
});
