import { PrismaService } from "@/DDD/Shared/PrismaService/PrismaService";
import { prismaMock } from "../../__mocks__/jest.setup";
import { NotificationService } from "./NotificationService";
import { createNotification } from "../Factories/NotificationFactory";

describe("NotificationService", () => {
  let notificationService: NotificationService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = prismaMock;
    notificationService = new NotificationService(prisma);
  });

  describe("createNotification", () => {
    it("should create a notification with the provided user ID and message", async () => {
      const notification = createNotification();
      jest
        .spyOn(prisma.notification, "create")
        .mockResolvedValueOnce(notification);

      await notificationService.createNotification(
        notification.userId,
        notification.message
      );

      expect(prisma.notification.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: notification.userId,
          message: notification.message,
        }),
      });
    });
  });

  describe("markAsRead", () => {
    it("should mark the notification as read with the provided notification ID", async () => {
      const notification = createNotification();

      jest
        .spyOn(prisma.notification, "update")
        .mockResolvedValueOnce(notification);

      await notificationService.markAsRead(notification.id);

      expect(prisma.notification.update).toHaveBeenCalledWith({
        where: {
          id: notification.id,
        },
        data: {
          read: true,
        },
      });
    });
  });
});
