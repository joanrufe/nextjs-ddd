import { Prisma } from "@prisma/client";
import { User } from "../Entities/User";
import { PrismaService } from "@/server/modules";
import { inject, injectable } from "inversify";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.PrismaService) protected readonly prisma: PrismaService
  ) {}

  async findOne(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user);
  }
  async create(userData: Prisma.UserCreateArgs["data"]): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...userData,
      },
    });

    return new User(createdUser);
  }

  async update(
    id: string,
    user: Omit<Prisma.UserUpdateArgs["data"], "id">
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
  async findMany(): Promise<User[]> {
    const users = this.prisma.user.findMany();
    return users.then((users) => users.map((user) => new User(user)));
  }
}
