import { UserDataWithNotifications } from "./UserDataWithNotifications";
import { UserService } from "../Services/UserService";

describe("UserDataWithNotifications", () => {
  let userDataWithNotifications: UserDataWithNotifications;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    userDataWithNotifications = new UserDataWithNotifications(userService);
  });

  describe("getUserWithNotifications", () => {
    it("should return the user with notifications for the given id", async () => {
      // Mock the UserService's `getUserWithNotifications` method
      jest
        .spyOn(userService, "getUserWithNotifications")
        .mockResolvedValueOnce({
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          image: null,
          emailVerified: null,
          notifications: [
            {
              id: "1",
              message: "Notification 1",
              createdAt: new Date(),
              read: false,
              userId: "1",
            },
            {
              id: "2",
              message: "Notification 2",
              createdAt: new Date(),
              read: false,
              userId: "1",
            },
          ],
        });

      const user = await userDataWithNotifications.getUserWithNotifications(
        "1"
      );

      expect(user).toEqual({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
        notifications: [
          {
            id: "1",
            message: "Notification 1",
          },
          {
            id: "2",
            message: "Notification 2",
          },
        ],
      });
    });
  });
});
