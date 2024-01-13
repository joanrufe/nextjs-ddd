import { EventBus } from "@/server/DDD/Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { UserCreatedEvent } from "../Events/UserCreatedEvent";
import { UserModel } from "../interfaces/UserModel";
import { OmitMethods } from "@/server/DDD/Shared/Types/utility-types";
import { User } from "../Entities/User";

export class UserRegister {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService = new UserService()
  ) {
    this.eventBus = eventBus;
    this.userService = userService;
  }

  async register(user: OmitMethods<Omit<User, "id">>): Promise<void> {
    const createdUser = await this.userService.create(user);
    this.publishUserCreatedEvent(createdUser);
  }

  // Needs to be apart from the register method because
  // NextAuth is the one creating the user, so it can be called
  // from the NextAuth callback
  publishUserCreatedEvent(user: UserModel) {
    const event = new UserCreatedEvent(user);
    this.eventBus.publish(event);
  }
}
