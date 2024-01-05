import { GetUserNotifications } from "./GetUserNotifications";
import { UserNotificationsService } from "../Services/UserNotificationsService";
import { createUser } from "../Factories/UserFactory";
import { createUserNotification } from "../Factories/UserNotificationsFactory";
import { UserNotification } from "../Entities/UserNotification";

describe("GetUserNotifications", () => {
  let getUserNotifications: GetUserNotifications;
  let userService: UserNotificationsService;

  beforeEach(() => {
    userService = new UserNotificationsService();
    getUserNotifications = new GetUserNotifications(userService);
  });

  describe("getUserWithNotifications", () => {
    it("should return the user with notifications for the given id", async () => {
      const userMock = createUser();
      const notificationsMock = Array.from(
        { length: 5 },
        () =>
          new UserNotification(createUserNotification({ userId: userMock.id }))
      );

      jest
        .spyOn(userService, "findAll")
        .mockResolvedValueOnce(notificationsMock);

      const notifications = await getUserNotifications.getUserNotifications({
        email: userMock.email,
      } as { email: string });

      expect(notifications).toEqual(notificationsMock);
    });
  });
});
