import { PrismaClient } from "@prisma/client";
import { User } from "../Entities/User";
import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { inject, injectable } from "inversify";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.PrismaService)
    protected readonly prisma: PrismaClient
  ) {}

  async findOne(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user);
  }
  async create(userData: OmitMethods<Omit<User, "id">>): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...userData,
      },
    });

    return new User(createdUser);
  }

  async update(
    id: string,
    user: Partial<OmitMethods<Omit<User, "id">>>
  ): Promise<User> {
    const currentUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!currentUser) {
      throw new Error("User not found");
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });
    return new User(updatedUser);
  }
}
