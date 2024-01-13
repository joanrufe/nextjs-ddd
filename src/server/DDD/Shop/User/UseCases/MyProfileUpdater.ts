import { EventBus } from "@/server/DDD/Shared/EventBus/EventBus";
import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { UserService } from "../Services/UserService";
import { OmitMethods } from "@/server/DDD/Shared/Types/utility-types";
import { User } from "../Entities/User";

export class MyProfileUpdater {
  constructor(
    private readonly evenBus: EventBus,
    private readonly userService: UserService = new UserService()
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
