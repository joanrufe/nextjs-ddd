import { EventBus } from "@/server/modules/Shared/EventBus/EventBus";
import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { UserService } from "../Services/UserService";
import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { User } from "../Entities/User";
import { inject, injectable } from "inversify";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class MyProfileUpdater {
  constructor(
    @inject(TYPES.EventBus) protected readonly evenBus: EventBus,
    @inject(TYPES.UserService) protected readonly userService: UserService
  ) {}

  async updateFields({
    email,
    fields,
  }: {
    email: string;
    fields: Partial<OmitMethods<Omit<User, "id">>>;
  }) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await this.userService.update(user.id, fields);

    const userUpdatedEvent = new UserUpdatedEvent(user, updatedUser);

    this.evenBus.publish(userUpdatedEvent);
    return updatedUser.toPrimitives();
  }
}
