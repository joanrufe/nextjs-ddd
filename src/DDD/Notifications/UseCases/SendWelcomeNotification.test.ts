import { SendWelcomeNotification } from "./SendWelcomeNotification";
import { NotificationService } from "../Services/NotificationService";
import { UserModel } from "@/DDD/User/interfaces/UserModel";
import { EventBus } from "@/DDD/Shared/EventBus/EventBus";

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
      const user: UserModel = {
        id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
        image: "https://example.com/image.png",
        emailVerified: null,
      };

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
    const user: UserModel = {
      id: "123",
      name: null,
      email: "john.doe@example.com",
      image: "https://example.com/image.png",
      emailVerified: null,
    };
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
