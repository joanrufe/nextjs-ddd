import { EventBus } from "@/server/modules/Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { UserCreatedEvent } from "../Events/UserCreatedEvent";
import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { User } from "../Entities/User";
import { inject } from "inversify";
import { TYPES } from "@/server/modules/dep-definitions";

export class UserRegister {
  constructor(
    @inject(TYPES.EventBus) protected readonly eventBus: EventBus,
    @inject(TYPES.UserService) protected readonly userService: UserService
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
