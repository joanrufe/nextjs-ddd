import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { UserService } from "../Services/UserService";
import { UpdateUserDTO } from "../interfaces/UpdateUserDTO";

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
    fields: UpdateUserDTO;
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
