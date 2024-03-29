import { SendWelcomeNotification } from "./SendWelcomeNotification";
import { NotificationService } from "../Services/NotificationService";
import { EventBus } from "@/server/modules";
import { createUser } from "@/server/modules/Shop/User/Factories/UserFactory";

describe("SendWelcomeNotification", () => {
  let sendWelcomeNotification: SendWelcomeNotification;
  let eventBus: EventBus;
  let notificationService: NotificationService;

  beforeEach(() => {
    eventBus = new EventBus();
    notificationService = new NotificationService();
    sendWelcomeNotification = new SendWelcomeNotification(
      eventBus,
      notificationService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("onUserCreated", () => {
    it("should create a welcome notification with the user's ID and name", () => {
      const user = createUser();

      const createNotificationSpy = jest
        .spyOn(notificationService, "createNotification")
        .mockImplementation(async (..._args) => {});

      sendWelcomeNotification.onUserCreated({ user });

      expect(createNotificationSpy).toHaveBeenCalledWith(
        user.id,
        `Welcome to the app, ${user.name}!`
      );
    });
  });
  it("should create a welcome notification with the email if no name is provided", () => {
    const user = createUser({
      name: null,
    });
    const createNotificationSpy = jest
      .spyOn(notificationService, "createNotification")
      .mockImplementation(async (..._args) => {});

    sendWelcomeNotification.onUserCreated({ user });

    expect(createNotificationSpy).toHaveBeenCalledWith(
      user.id,
      `Welcome to the app, ${user.email}!`
    );
  });
});
