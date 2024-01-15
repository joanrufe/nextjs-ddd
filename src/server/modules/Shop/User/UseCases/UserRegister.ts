import { EventBus } from "@/server/modules/Shared/EventBus/EventBus";
import { UserService } from "../Services/UserService";
import { UserCreatedEvent } from "../Events/UserCreatedEvent";
import { UserModel } from "../interfaces/UserModel";
import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { User } from "../Entities/User";
import { inject, injectable } from "inversify";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class UserRegister {
  constructor(
    @inject(TYPES.EventBus) protected readonly eventBus: EventBus,
    @inject(TYPES.UserService) protected readonly userService: UserService
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
