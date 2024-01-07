import { Prisma, PrismaClient } from "@prisma/client";
import { UserModel, prismaSingleton } from "../../..";
import { User } from "../Entities/User";
import { NonOptionalNonNull } from "@/utils/types";

export class UserService {
  constructor(private readonly prisma: PrismaClient = prismaSingleton) {}

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
    const userDataToValidate = {
      // id: "not-used",
      ...userData,
    } as NonOptionalNonNull<UserModel>;
    const userVal = new User(userDataToValidate);
    await userVal.validate();
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
    const userDataToValidate = {
      ...currentUser,
      ...user,
      id,
    } as NonOptionalNonNull<UserModel>;
    const userVal = new User(userDataToValidate);
    await userVal.validate();
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
