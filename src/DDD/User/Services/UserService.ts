import { Prisma, PrismaClient } from "@prisma/client";
import { prismaSingleton } from "../../";
import { User } from "../Entities/User";

export class UserService {
  constructor(private readonly prisma: PrismaClient = prismaSingleton) {}

  async getUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return new User(user);
  }
  async create(user: Prisma.UserCreateArgs["data"]): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    const userObj = new User(createdUser);
    return userObj;
  }

  async getUserWithNotifications(id: string): Promise<User> {
    const userFromDB = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        notifications: true,
      },
    });
    if (!userFromDB) {
      throw new Error("User not found");
    }
    const { notifications, ...user } = userFromDB;
    return new User(user, notifications);
  }
}
