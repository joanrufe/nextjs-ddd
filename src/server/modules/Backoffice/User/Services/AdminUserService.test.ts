import { PrismaService } from "@/server/modules";
import { prismaMock } from "@/server/modules/__mocks__/jest.setup";
import { AdminUserService } from "./AdminUserService";
import { createUser } from "../Factories/UserFactory";

describe("AdminUserService", () => {
  let userService: AdminUserService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = prismaMock;
    userService = new AdminUserService(prisma);
  });

  describe("getUser", () => {
    it("should return the user with the given id", async () => {
      const email = "me@example.com";
      const user = createUser({
        email,
      });

      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user as any);

      const result = await userService.findOne(email);

      expect(result).toEqual(user);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          email,
        },
      });
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const user = createUser();

      const { id, ...userWithoutId } = user;

      jest.spyOn(prisma.user, "create").mockResolvedValueOnce(user as any);

      const result = await userService.create(userWithoutId);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userWithoutId,
      });
      expect(result).toEqual(user);
    });
  });

  describe("update", () => {
    it("should update the user name with the given id", async () => {
      const user = createUser();

      const updatedUser = {
        ...user,
        name: "Jane Doe",
      };

      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user as any);
      jest
        .spyOn(prisma.user, "update")
        .mockResolvedValueOnce(updatedUser as any);

      const result = await userService.update(user.id, { name: "Jane Doe" });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: user.id,
        },
        data: {
          name: "Jane Doe",
        },
      });
      expect(result).toEqual(updatedUser);
    });
    it("should update several fields of the user with the given id", async () => {
      const user = createUser();
      const fieldsToUpdate = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        image: "https://example.com/image.png",
      };
      const updatedUser = {
        ...user,
        ...fieldsToUpdate,
      };
      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user as any);
      jest
        .spyOn(prisma.user, "update")
        .mockResolvedValueOnce(updatedUser as any);
      const result = await userService.update(user.id, {
        ...fieldsToUpdate,
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: user.id,
        },
        data: {
          ...fieldsToUpdate,
        },
      });
      expect(result).toEqual(updatedUser);
    });
    it("should throw an error if the user does not exist", async () => {
      const userId = "1";
      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(null);
      await expect(
        userService.update(userId, { name: "Jane Doe" })
      ).rejects.toThrow("User not found");
    });
  });

  describe("findMany", () => {
    it("should return all users", async () => {
      const users = [createUser(), createUser()];
      jest.spyOn(prisma.user, "findMany").mockResolvedValueOnce(users as any);
      const result = await userService.findMany();
      expect(result).toEqual(users);
    });
  });
});
