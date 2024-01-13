import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { UserCreatedEvent } from "../Events/UserCreatedEvent";
import { OmitMethods } from "@/DDD/Shared/Types/utility-types";
import { User } from "../Entities/User";

export class UserRegister {
  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService = new UserService()
  ) {}

  async register(user: OmitMethods<Omit<User, "id">>): Promise<void> {
    const createdUser = await this.userService.create(user);
    this.publishUserCreatedEvent(createdUser);
  }

  // Needs to be apart from the register method because
  // NextAuth is the one creating the user, so it can be called
  // from the NextAuth callback
  publishUserCreatedEvent(user: OmitMethods<User>) {
    const event = new UserCreatedEvent(user);
    this.eventBus.publish(event);
  }
}
