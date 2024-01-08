import { MyProfileUpdater } from "./MyProfileUpdater";
import { UserService } from "../Services/UserService";
import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { UpdateUserDTO } from "../interfaces/UpdateUserDTO";
import { createUser } from "../Factories/UserFactory";

describe("MyProfileUpdater", () => {
  let userProfilerUpdater: MyProfileUpdater;
  let userService: UserService;
  let eventBus: EventBus;

  beforeEach(() => {
    userService = new UserService();
    eventBus = new EventBus();
    userProfilerUpdater = new MyProfileUpdater(eventBus, userService);
  });

  describe("updateFields", () => {
    it("should update the user fields and publish a UserUpdatedEvent", async () => {
      const user = createUser();
      const email = user.email;
      // Arrange
      const updateUserDTO: UpdateUserDTO = {
        email,
        fields: {
          name: "Jane Doe",
          image: "https://example.com/image.png",
        },
        updatedByEmail: email,
      };

      const updatedUser = createUser({ ...user, ...updateUserDTO });
      const userUpdatedEvent = new UserUpdatedEvent(user, updatedUser);

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
      jest.spyOn(userService, "update").mockResolvedValueOnce(updatedUser);
      jest.spyOn(eventBus, "publish");

      // Act
      const result = await userProfilerUpdater.updateFields(updateUserDTO);

      // Assert
      expect(userService.findOne).toHaveBeenCalledWith(email);
      expect(userService.update).toHaveBeenCalledWith(
        updatedUser.id,
        updateUserDTO.fields
      );
      expect(eventBus.publish).toHaveBeenCalledWith(userUpdatedEvent);
      expect(result).toEqual(updatedUser.toPrimitives());
    });

    it("should throw an error if the user is not found", async () => {
      // Arrange
      const email = "jane.doe@example.com";
      const updateUserDTO: UpdateUserDTO = {
        email,
        fields: {
          name: "Jane Doe",
          image: "https://example.com/image.png",
        },
        updatedByEmail: email,
      };

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

      // Act & Assert
      await expect(
        userProfilerUpdater.updateFields(updateUserDTO)
      ).rejects.toThrow("User not found");
    });
    it("should throw an error if the user is not authorized to update the user", async () => {
      // Arrange
      const user = createUser();
      const anotherUser = createUser();
      const email = user.email;
      const updateUserDTO: UpdateUserDTO = {
        email,
        fields: {
          name: "Jane Doe",
          image: "https://example.com/image.png",
        },
        updatedByEmail: anotherUser.email,
      };

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
      jest.spyOn(userService, "findOne").mockResolvedValueOnce(anotherUser);

      // Act & Assert
      await expect(
        userProfilerUpdater.updateFields(updateUserDTO)
      ).rejects.toThrow("Unauthorized");
    });
  });
});
