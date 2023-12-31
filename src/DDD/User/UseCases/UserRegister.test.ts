import { UserRegister } from "./UserRegister";
import { EventBus } from "../../Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { User } from "../Entities/User";

describe("UserRegister", () => {
  let userRegister: UserRegister;
  let eventBus: EventBus;
  let userService: UserService;

  beforeEach(() => {
    eventBus = new EventBus();
    userService = new UserService();
    userRegister = new UserRegister(eventBus, userService);
  });

  describe("register", () => {
    it("should create a user and publish UserCreated event", async () => {
      const user: User = {
        id: "1",
        name: "John Doe",
        email: "whatever@email.com",
        emailVerified: null,
        image: null,
      };

      jest.spyOn(userService, "create").mockResolvedValueOnce(user);
      jest.spyOn(eventBus, "publish").mockImplementation(() => {});

      await userRegister.register(user);

      expect(userService.create).toHaveBeenCalledWith(user);
      expect(eventBus.publish).toHaveBeenCalledWith({ user });
    });
  });

  describe("publish", () => {
    it("should publish an event using the event bus", () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "whatever@email.com",
        emailVerified: null,
        image: null,
      };

      jest.spyOn(eventBus, "publish").mockImplementation(() => {});

      userRegister.publishUserCreatedEvent(user);

      expect(eventBus.publish).toHaveBeenCalledWith({ user });
    });
  });
});
