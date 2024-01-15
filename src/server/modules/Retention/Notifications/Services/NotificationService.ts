import { PrismaService } from "@/server/modules";
import { TYPES } from "@/server/modules/dep-definitions";
import { inject, injectable } from "inversify";

@injectable()
export class NotificationService {
  constructor(
    @inject(TYPES.PrismaService) protected readonly prisma: PrismaService
  ) {}
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
