import { DomainEvent } from "@/server/modules/Shared/EventBus/EventBus";
import { User } from "../Entities/User";

export class UserDeletedEvent implements DomainEvent {
  constructor(public readonly userId: User["id"]) {}
}
