import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { UserModel } from "../interfaces/UserModel";
import { UserCreatedEvent } from "../Events/UserCreatedEvent";

export class UserRegister {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService = new UserService()
  ) {
    this.eventBus = eventBus;
    this.userService = userService;
  }

  async register(user: UserModel): Promise<void> {
    await this.userService.create(user);
    this.publish(user);
  }

  // Needs to be apart from the register method because
  // NextAuth is the one creating the user, so it can be called
  // from the NextAuth callback
  publish(user: UserModel) {
    const event = new UserCreatedEvent(user);
    this.eventBus.publish(event);
  }
}
