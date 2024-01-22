import { UserNotification } from "../Entities/UserNotification";
import { prismaSingleton } from "@/server/modules";

export class UserNotificationsService {
  constructor(protected readonly prisma = prismaSingleton) {}

  async findAll(email: string): Promise<UserNotification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        user: {
          email,
        },
      },
    });
    const userNotifications = notifications.map(
      (notification) => new UserNotification(notification)
    );

    return userNotifications;
  }
}
