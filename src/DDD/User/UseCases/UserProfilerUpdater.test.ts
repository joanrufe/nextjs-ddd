import { UserProfilerUpdater } from "./UserProfilerUpdater";
import { UserService } from "../Services/UserService";
import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { UpdateUserDTO } from "../interfaces/UpdateUserDTO";
import { createUser } from "../Factories/UserFactory";

describe("UserProfilerUpdater", () => {
  let userProfilerUpdater: UserProfilerUpdater;
  let userService: UserService;
  let eventBus: EventBus;

  beforeEach(() => {
    userService = new UserService();
    eventBus = new EventBus();
    userProfilerUpdater = new UserProfilerUpdater(eventBus, userService);
  });

  describe("updateFields", () => {
    it("should update the user fields and publish a UserUpdatedEvent", async () => {
      const user = createUser();
      // Arrange
      const id = "1";
      const fields: UpdateUserDTO = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
      };

      const updatedUser = createUser({ ...user, ...fields });
      const userUpdatedEvent = new UserUpdatedEvent(user, updatedUser);

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
      jest.spyOn(userService, "update").mockResolvedValueOnce(updatedUser);
      jest.spyOn(eventBus, "publish");

      // Act
      const result = await userProfilerUpdater.updateFields({
        id,
        fields,
      });

      // Assert
      expect(userService.findOne).toHaveBeenCalledWith(id);
      expect(userService.update).toHaveBeenCalledWith(id, fields);
      expect(eventBus.publish).toHaveBeenCalledWith(userUpdatedEvent);
      expect(result).toEqual(updatedUser.toPrimitives());
    });

    it("should throw an error if the user is not found", async () => {
      // Arrange
      const id = "1";
      const fields: UpdateUserDTO = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        image: "https://example.com/image.png",
      };

      jest.spyOn(userService, "findOne").mockResolvedValueOnce(null);

      // Act & Assert
      await expect(
        userProfilerUpdater.updateFields({ id, fields })
      ).rejects.toThrow("User not found");
    });
  });
});
