import { PrismaClient } from "@prisma/client";
import prismaSingleton from "../../../../lib/prisma";
import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { User } from "../interfaces/UserModel";

export class UserService {
  constructor(private readonly prisma: PrismaClient = prismaSingleton) {}

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async create(user: Omit<User, "id">): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return createdUser;
  }
}
