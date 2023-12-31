import { DomainEvent } from "@/DDD/Shared/EventBus/EventBus";
import { User } from "../Entities/User";

export class UserUpdatedEvent extends DomainEvent {
  // shape could be different from UserCreatedEvent
  // like: { user: UserModel, oldUser: UserModel }
  constructor(public readonly user: User) {
    super();
  }
}
