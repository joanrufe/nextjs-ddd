import { MyProfileUpdater } from "./MyProfileUpdater";
import { UserService } from "../Services/UserService";
import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { createUser } from "../Factories/UserFactory";

describe("MyProfileUpdater", () => {
  let myProfileUpdater: MyProfileUpdater;
  let userService: UserService;
  let eventBus: EventBus;

  beforeEach(() => {
    userService = new UserService();
    eventBus = new EventBus();
    myProfileUpdater = new MyProfileUpdater(eventBus, userService);
  });

  describe("updateFields", () => {
    it("should update the user fields and publish a UserUpdatedEvent", async () => {
      const user = createUser();
      const email = user.email;
      // Arrange
      const updateUserDTO: Parameters<typeof myProfileUpdater.updateFields>[0] =
        {
          email,
          fields: {
            name: "Jane Doe",
            image: "https://example.com/image.png",
          },
        };

      const updatedUser = createUser({ ...user, ...updateUserDTO });
      const userUpdatedEvent = new UserUpdatedEvent(user, updatedUser);

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
      jest.spyOn(userService, "update").mockResolvedValueOnce(updatedUser);
      jest.spyOn(eventBus, "publish");

      // Act
      const result = await myProfileUpdater.updateFields(updateUserDTO);

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
      const updateUserDTO: Parameters<typeof myProfileUpdater.updateFields>[0] =
        {
          email,
          fields: {
            name: "Jane Doe",
            image: "https://example.com/image.png",
          },
        };

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

      // Act & Assert
      await expect(
        myProfileUpdater.updateFields(updateUserDTO)
      ).rejects.toThrow("User not found");
    });
  });
});
