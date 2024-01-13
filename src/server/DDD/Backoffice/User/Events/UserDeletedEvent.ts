import { DomainEvent } from "@/server/DDD/Shared/EventBus/EventBus";
import { User } from "../Entities/User";

export class UserDeletedEvent extends DomainEvent {
  constructor(public readonly userId: User["id"]) {
    super();
  }
}
