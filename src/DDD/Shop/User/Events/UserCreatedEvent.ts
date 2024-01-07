import { DomainEvent } from "@/DDD/Shared/EventBus/EventBus";
import { UserModel } from "../interfaces/UserModel";

export class UserCreatedEvent extends DomainEvent {
  constructor(public readonly user: UserModel) {
    super();
  }
}
