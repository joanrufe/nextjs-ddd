import { DomainEvent } from "@/server/modules/Shared/EventBus/EventBus";
import { UserModel } from "../interfaces/UserModel";

export class UserUpdatedEvent implements DomainEvent {
  constructor(
    public readonly oldUser: UserModel,
    public readonly newUser: UserModel
  ) {}
}
