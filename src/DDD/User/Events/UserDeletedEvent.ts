import { DomainEvent } from "@/DDD/Shared/EventBus/EventBus";
import { UserModel } from "../interfaces/UserModel";

export class UserDeletedEvent extends DomainEvent {
  constructor(public readonly userId: UserModel["id"]) {
    super();
  }
}
