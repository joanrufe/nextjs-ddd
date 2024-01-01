import { Notification as PrismaNotification } from "@prisma/client";

export class Notification implements PrismaNotification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  constructor(notification: Notification) {
    this.id = notification.id;
    this.userId = notification.userId;
    this.message = notification.message;
    this.read = notification.read;
    this.createdAt = notification.createdAt;
  }
}
