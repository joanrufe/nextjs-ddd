import { Notification as PrismaUserNotification } from "@prisma/client";

export class UserNotification implements PrismaUserNotification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  constructor(userNotification: PrismaUserNotification) {
    this.id = userNotification.id;
    this.userId = userNotification.userId;
    this.message = userNotification.message;
    this.read = userNotification.read;
    this.createdAt = userNotification.createdAt;
  }
  toPrimitives(): PrismaUserNotification {
    return {
      id: this.id,
      userId: this.userId,
      message: this.message,
      read: this.read,
      createdAt: this.createdAt,
    };
  }
}
