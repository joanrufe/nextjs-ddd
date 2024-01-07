import { PrismaService } from "@/DDD/Shared/PrismaService/PrismaService";
import { prismaMock } from "../../../__mocks__/jest.setup";
import { UserService } from "./UserService";
import { createUser } from "../Factories/UserFactory";

describe("UserService", () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = prismaMock;
    userService = new UserService(prisma);
  });

  describe("getUser", () => {
    it("should return the user with the given id", async () => {
      const email = "me@example.com";
      const user = createUser({
        email,
      });

      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user);

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
      const user = createUser({
        id: "1",
      });

      const { id, ...userWithoutId } = user;

      jest.spyOn(prisma.user, "create").mockResolvedValueOnce(user);

      const result = await userService.create(userWithoutId);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userWithoutId,
      });
      expect(result).toEqual(user);
    });
  });

  describe("update", () => {
    it("should update the user name with the given id", async () => {
      const userId = "1";
      const user = createUser({
        id: userId,
      });

      const updatedUser = {
        ...user,
        name: "Jane Doe",
      };

      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user);
      jest.spyOn(prisma.user, "update").mockResolvedValueOnce(updatedUser);

      const result = await userService.update(userId, { name: "Jane Doe" });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: {
          name: "Jane Doe",
        },
      });
      expect(result).toEqual(updatedUser);
    });
    it("should update several fields of the user with the given id", async () => {
      const userId = "1";
      const user = createUser({
        id: userId,
      });
      const fieldsToUpdate = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        image: "https://example.com/image.png",
      };
      const updatedUser = {
        ...user,
        ...fieldsToUpdate,
      };
      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user);
      jest.spyOn(prisma.user, "update").mockResolvedValueOnce(updatedUser);
      const result = await userService.update(userId, {
        ...fieldsToUpdate,
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
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
    it("should throw EntityValidationError if the user data is invalid", async () => {
      const userId = "1";
      const user = createUser({
        id: userId,
      });
      const fieldsToUpdate = {
        name: "Jane Doe",
        email: "not-an-email",
      };
      jest.spyOn(prisma.user, "findUnique").mockResolvedValueOnce(user);
      await expect(
        userService.update(userId, {
          ...fieldsToUpdate,
        })
      ).rejects.toThrow("Validation errors in User");
    });
    it.todo("Should test EntityValidationError per field, ");
  });
});
