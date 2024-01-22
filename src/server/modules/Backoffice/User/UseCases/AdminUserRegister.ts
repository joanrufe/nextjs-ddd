import { AdminUserService } from "../Services/AdminUserService";
import { AdminUserCreatedEvent } from "../Events/AdminUserCreatedEvent";
import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { User } from "../Entities/User";
import { eventBusSingleton } from "@/server/modules";

export class AdminUserRegister {
  constructor(
    protected readonly eventBus = eventBusSingleton,
    protected readonly adminUserService = new AdminUserService()
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
