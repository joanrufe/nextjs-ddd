import prismaSingleton from "../../../../lib/prisma";

export class NotificationService {
  constructor(private readonly prisma = prismaSingleton) {}
  async createNotification(userId: string, message: string): Promise<void> {
    await this.prisma.notification.create({
      data: {
        message,
        read: false,
        userId,
      },
    });
  }
  async markAsRead(notificationId: string): Promise<void> {
    await this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });
  }
}
