import { PrismaClient } from "@prisma/client";
import { NotificationService } from "./NotificationService";

describe("NotificationService", () => {
  let notificationService: NotificationService;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    notificationService = new NotificationService(prisma);
  });

  describe("createNotification", () => {
    it("should create a notification with the provided user ID and message", async () => {
      const userId = "123";
      const message = "New notification";

      jest.spyOn(prisma.notification, "create").mockResolvedValueOnce({
        id: "1",
        userId,
        message,
        read: false,
      });

      await notificationService.createNotification(userId, message);

      expect(prisma.notification.create).toHaveBeenCalledWith({
        data: {
          message,
          read: false,
          userId,
        },
      });
    });
  });

  describe("markAsRead", () => {
    it("should mark the notification as read with the provided notification ID", async () => {
      const notificationId = "456";

      jest.spyOn(prisma.notification, "update").mockResolvedValueOnce({
        id: notificationId,
        userId: "123",
        message: "New notification",
        read: true,
      });

      await notificationService.markAsRead(notificationId);

      expect(prisma.notification.update).toHaveBeenCalledWith({
        where: {
          id: notificationId,
        },
        data: {
          read: true,
        },
      });
    });
  });
});
