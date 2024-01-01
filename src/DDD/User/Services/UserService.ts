import { Prisma, PrismaClient } from "@prisma/client";
import { prismaSingleton } from "../../";
import { User } from "../Entities/User";
import { UserNotification } from "../Entities/UserNotification";

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
    const userNotifications = notifications?.map(
      (notification) => new UserNotification(notification)
    );

    return new User(user, userNotifications);
  }
}
