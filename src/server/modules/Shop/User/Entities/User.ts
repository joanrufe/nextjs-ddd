import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { $Enums, User as PrismaUser } from "@prisma/client";

export class User implements Partial<PrismaUser> {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role?: $Enums.Role | undefined;

  constructor(user: Pick<PrismaUser, keyof OmitMethods<User>>) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.image = user.image;
    this.role = user.role;
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      image: this.image,
      role: this.role,
    };
  }
}
