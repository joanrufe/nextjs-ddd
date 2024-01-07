import { PrismaClient } from "@prisma/client";
import { prismaSingleton } from "../../..";
import { UserNotification } from "../Entities/UserNotification";

export class UserNotificationsService {
  constructor(private readonly prisma: PrismaClient = prismaSingleton) {}

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
