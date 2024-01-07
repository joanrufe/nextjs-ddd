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
      // Arrange
      const email = "jane.doe@example.com";
      const fields: UpdateUserDTO = {
        name: "Jane Doe",
      };

      const updatedUser = createUser({ ...user, ...fields });
      const userUpdatedEvent = new UserUpdatedEvent(user, updatedUser);

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
      jest.spyOn(userService, "update").mockResolvedValueOnce(updatedUser);
      jest.spyOn(eventBus, "publish");

      // Act
      const result = await userProfilerUpdater.updateFields({
        email,
        fields,
      });

      // Assert
      expect(userService.findOne).toHaveBeenCalledWith(email);
      expect(userService.update).toHaveBeenCalledWith(updatedUser.id, fields);
      expect(eventBus.publish).toHaveBeenCalledWith(userUpdatedEvent);
      expect(result).toEqual(updatedUser.toPrimitives());
    });

    it("should throw an error if the user is not found", async () => {
      // Arrange
      const email = "jane.doe@example.com";
      const fields: UpdateUserDTO = {
        name: "Jane Doe",
        image: "https://example.com/image.png",
      };

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

      // Act & Assert
      await expect(
        userProfilerUpdater.updateFields({ email, fields })
      ).rejects.toThrow("User not found");
    });
  });
});
