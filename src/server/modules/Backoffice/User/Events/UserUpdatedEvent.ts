import { DomainEvent } from "@/server/modules/Shared/EventBus/EventBus";
import { UserModel } from "../interfaces/UserModel";

export class UserUpdatedEvent extends DomainEvent {
  // shape could be different from UserCreatedEvent
  // like: { user: UserModel, oldUser: UserModel }
  constructor(
    public readonly oldUser: UserModel,
    public readonly newUser: UserModel
  ) {
    super();
  }
}
