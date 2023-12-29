import { UserRegister } from "./UserRegister";
import { EventBus } from "../../Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { EventTypes } from "../../Shared/EventBus/interfaces/EventTypes";
import { UserModel } from "../interfaces/UserModel";

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
      const user: UserModel = {
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
      expect(eventBus.publish).toHaveBeenCalledWith("UserCreated", user);
    });
  });

  describe("publish", () => {
    it("should publish an event using the event bus", () => {
      const event: EventTypes = "UserCreated";
      const data = {
        id: "1",
        name: "John Doe",
        email: "whatever@email.com",
        emailVerified: null,
        image: null,
      };

      jest.spyOn(eventBus, "publish").mockImplementation(() => {});

      userRegister.publish(event, data);

      expect(eventBus.publish).toHaveBeenCalledWith(event, data);
    });
  });
});
