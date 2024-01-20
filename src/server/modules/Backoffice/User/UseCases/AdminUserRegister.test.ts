import { AdminUserRegister } from "./AdminUserRegister";
import { EventBus } from "../../../Shared/EventBus/EventBus";
import { AdminUserService } from "../Services/AdminUserService";
import { createUser } from "../Factories/UserFactory";
import { prismaMock } from "@/server/modules/__mocks__/jest.setup";

describe("UserRegister", () => {
  let userRegister: AdminUserRegister;
  let eventBus: EventBus;
  let userService: AdminUserService;

  beforeEach(() => {
    eventBus = new EventBus();
    userService = new AdminUserService(prismaMock);
    userRegister = new AdminUserRegister(eventBus, userService);
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
