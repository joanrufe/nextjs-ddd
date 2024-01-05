import { User as PrismaUser } from "@prisma/client";
import { UserNotification } from "./UserNotification";

export class User implements PrismaUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;

  constructor(user: PrismaUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.image = user.image;
  }

  toPrimitives(): PrismaUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      emailVerified: this.emailVerified,
      image: this.image,
    };
  }
}
