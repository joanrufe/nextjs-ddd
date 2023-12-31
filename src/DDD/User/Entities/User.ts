import { User as PrismaUser } from "@prisma/client";
import { UserNotification } from "./UserNotification";

export class User implements PrismaUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;

  // Aggregate entities
  notifications?: UserNotification[];

  constructor(user: User, notifications?: UserNotification[]) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.image = user.image;

    // Aggregate entities
    this.notifications = notifications;
  }
}
