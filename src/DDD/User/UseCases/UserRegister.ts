import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { User } from "../interfaces/UserModel";
import { EventTypes } from "@/DDD/Shared/EventBus/interfaces/EventTypes";

export class UserRegister {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService = new UserService()
  ) {
    this.eventBus = eventBus;
    this.userService = userService;
  }

  async register(user: User): Promise<void> {
    await this.userService.create(user);
    this.publish("UserCreated", user);
  }
  // Needs to be apart from the register method because
  // NextAuth is the one creating the user, so it can be called
  // from the NextAuth callback
  publish(event: EventTypes, data: User) {
    this.eventBus.publish(event, data);
  }
}
