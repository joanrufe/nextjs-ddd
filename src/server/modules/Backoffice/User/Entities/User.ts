import { $Enums, User as PrismaUser } from "@prisma/client";

export class User implements Omit<PrismaUser, "password"> {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: $Enums.Role;

  constructor(user: Omit<PrismaUser, "password">) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.image = user.image;
    this.role = user.role;
  }

  toPrimitives(): Omit<PrismaUser, "password"> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      emailVerified: this.emailVerified,
      image: this.image,
      role: this.role,
    };
  }

  canBeUpdatedBy(user: User): boolean {
    return user.role === "ADMIN" || user.id === this.id;
  }
}
