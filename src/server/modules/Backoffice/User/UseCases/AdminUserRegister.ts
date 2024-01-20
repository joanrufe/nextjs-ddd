import { EventBus } from "@/server/modules/Shared/EventBus/EventBus";
import { AdminUserService } from "../Services/AdminUserService";
import { AdminUserCreatedEvent } from "../Events/AdminUserCreatedEvent";
import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { User } from "../Entities/User";
import { inject, injectable } from "inversify";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class AdminUserRegister {
  constructor(
    @inject(TYPES.EventBus) protected readonly eventBus: EventBus,
    @inject(TYPES.AdminUserService)
    protected readonly adminUserService: AdminUserService
  ) {}

  async register(user: OmitMethods<Omit<User, "id">>): Promise<void> {
    const createdUser = await this.adminUserService.create(user);
    this.publishUserCreatedEvent(createdUser);
  }

  // Needs to be apart from the register method because
  // NextAuth is the one creating the user, so it can be called
  // from the NextAuth callback
  publishUserCreatedEvent(user: OmitMethods<User>) {
    const event = new AdminUserCreatedEvent(user);
    this.eventBus.publish(event);
  }
}
