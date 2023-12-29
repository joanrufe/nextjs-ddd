import { PrismaClient } from "@prisma/client";
import prismaSingleton from "../../../../lib/prisma";
import { UserModel } from "../interfaces/UserModel";

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
  async create(user: Omit<UserModel, "id">): Promise<UserModel> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return createdUser;
  }
}
