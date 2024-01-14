import { PrismaClient } from "@prisma/client";
import { prismaSingleton } from "@/server/DDD/";
import { User } from "../Entities/User";
import { OmitMethods } from "@/server/DDD/Shared/Types/utility-types";

export class UserService {
  constructor(private readonly prisma: PrismaClient = prismaSingleton) {}

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
