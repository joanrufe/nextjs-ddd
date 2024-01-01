import { UserDataWithNotifications } from "./UserDataWithNotifications";
import { UserService } from "../Services/UserService";
import { createUser } from "../Factories/UserFactory";
import { createUserNotification } from "../Factories/UserNotificationsFactory";

describe("UserDataWithNotifications", () => {
  let userDataWithNotifications: UserDataWithNotifications;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    userDataWithNotifications = new UserDataWithNotifications(userService);
  });

  describe("getUserWithNotifications", () => {
    it("should return the user with notifications for the given id", async () => {
      const userId = "1";
      const notifications = Array.from({ length: 5 }, () =>
        createUserNotification({ userId })
      );
      const userDataMock = createUser(
        {
          id: userId,
        },
        notifications
      );

      jest
        .spyOn(userService, "getUserWithNotifications")
        .mockResolvedValueOnce(userDataMock);

      const userData = await userDataWithNotifications.getUserWithNotifications(
        "1"
      );

      expect(userData).toEqual(userDataMock);
    });
  });
});
