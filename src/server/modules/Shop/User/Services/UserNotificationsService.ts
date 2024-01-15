import { PrismaClient } from "@prisma/client";
import { UserNotification } from "../Entities/UserNotification";
import { inject, injectable } from "inversify";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class UserNotificationsService {
  constructor(
    @inject(TYPES.PrismaService) protected readonly prisma: PrismaClient
  ) {}

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
