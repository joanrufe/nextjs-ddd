import { UserRegister } from "./UserRegister";
import { EventBus } from "../../../Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { createUser } from "../Factories/UserFactory";
import { prismaMock } from "@/server/modules/__mocks__/jest.setup";

describe("UserRegister", () => {
  let userRegister: UserRegister;
  let eventBus: EventBus;
  let userService: UserService;

  beforeEach(() => {
    eventBus = new EventBus();
    userService = new UserService(prismaMock);
    userRegister = new UserRegister(eventBus, userService);
  });

  describe("register", () => {
    it("should create a user and publish UserCreated event", async () => {
      const user = createUser();

      jest.spyOn(userService, "create").mockResolvedValueOnce(user);
      jest.spyOn(eventBus, "publish").mockImplementation(() => {});

      await userRegister.register(user);

      expect(userService.create).toHaveBeenCalledWith(user);
      expect(eventBus.publish).toHaveBeenCalledWith({ user });
    });
  });

  describe("publish", () => {
    it("should publish an event using the event bus", () => {
      const user = createUser();

      jest.spyOn(eventBus, "publish").mockImplementation(() => {});

      userRegister.publishUserCreatedEvent(user);

      expect(eventBus.publish).toHaveBeenCalledWith({ user });
    });
  });
});
