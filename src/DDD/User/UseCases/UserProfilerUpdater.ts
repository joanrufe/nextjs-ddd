import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { UserService } from "../Services/UserService";
import { UpdateUserDTO } from "../interfaces/UpdateUserDTO";

export class UserProfilerUpdater {
  constructor(
    private readonly evenBus: EventBus,
    private readonly userService: UserService = new UserService()
  ) {}

  async updateFields({ id, fields }: { id: string; fields: UpdateUserDTO }) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await this.userService.update(id, fields);

    const userUpdatedEvent = new UserUpdatedEvent(user, updatedUser);

    this.evenBus.publish(userUpdatedEvent);
    return updatedUser.toPrimitives();
  }
}
