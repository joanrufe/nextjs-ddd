import { DomainEvent } from "@/server/modules/Shared/EventBus/EventBus";
import { UserModel } from "../interfaces/UserModel";

export class AdminUserCreatedEvent implements DomainEvent {
  constructor(public readonly user: UserModel) {}
}
