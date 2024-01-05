import { Prisma, PrismaClient } from "@prisma/client";
import { prismaSingleton } from "../../";
import { User } from "../Entities/User";

export class UserService {
  constructor(private readonly prisma: PrismaClient = prismaSingleton) {}

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user);
  }
  async create(user: Prisma.UserCreateArgs["data"]): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return new User(createdUser);
  }

  async update(
    id: string,
    user: Omit<Prisma.UserUpdateArgs["data"], "id">
  ): Promise<User> {
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
