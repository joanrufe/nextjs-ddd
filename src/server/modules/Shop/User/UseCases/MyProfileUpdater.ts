import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { UserService } from "../Services/UserService";
import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";
import { eventBusSingleton } from "@/server/modules";
import { User } from "../Entities/User";

export class MyProfileUpdater {
  constructor(
    protected readonly evenBus = eventBusSingleton,
    protected readonly userService = new UserService()
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
