import { User as PrismaUser } from "@prisma/client";
import { UserNotification } from "./UserNotification";

export class User implements PrismaUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;

  // Aggregate entities
  notifications?: UserNotification[] | null;

  constructor(user: PrismaUser, notifications?: UserNotification[]) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.image = user.image;

    // Aggregate entities
    this.notifications = notifications;
  }

  toPrimitives():
    | PrismaUser
    | {
        notifications?:
          | ReturnType<typeof UserNotification.prototype.toPrimitives>[]
          | null;
      } {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      emailVerified: this.emailVerified,
      image: this.image,
      notifications:
        this.notifications?.map((notification) =>
          notification.toPrimitives()
        ) || null,
    };
  }
}
