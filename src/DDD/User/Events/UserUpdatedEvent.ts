import { DomainEvent } from "@/DDD/Shared/EventBus/EventBus";
import { UserModel } from "../interfaces/UserModel";

export class UserUpdatedEvent extends DomainEvent {
  // shape could be different from UserCreatedEvent
  // like: { user: UserModel, oldUser: UserModel }
  constructor(public readonly user: UserModel) {
    super();
  }
}
