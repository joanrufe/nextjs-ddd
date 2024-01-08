import { EntityValidationError } from "@/DDD/Shared/Exceptions/EntityValidationError";
import { $Enums, User as PrismaUser } from "@prisma/client";
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsUrl,
  Length,
  validate,
} from "class-validator";

export class User implements PrismaUser {
  id: string;
  @Length(3, 255, { message: "Name must be at least 3 characters long" })
  name: string | null;
  @IsEmail({}, { message: "Email is not valid" })
  email: string;
  emailVerified: Date | null;
  @IsOptional()
  @IsUrl({}, { message: "Image must be a valid URL" })
  image: string | null;
  @IsIn(Object.values($Enums.Role), { message: "Role must be USER or ADMIN" })
  role: $Enums.Role;

  constructor(user: PrismaUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.image = user.image;
    this.role = user.role;
  }

  toPrimitives(): PrismaUser {
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

  async validate() {
    await validate(this).then((errors) => {
      if (errors.length > 0) {
        throw new EntityValidationError("User", errors);
      }
    });
  }
}
