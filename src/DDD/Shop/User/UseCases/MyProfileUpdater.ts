import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserUpdatedEvent } from "../Events/UserUpdatedEvent";
import { UserService } from "../Services/UserService";
import { UpdateUserDTO } from "../interfaces/UpdateUserDTO";
import { UnauthorizedError } from "@/DDD/Shared/Exceptions/UnauthorizedError";

export class MyProfileUpdater {
  constructor(
    private readonly evenBus: EventBus,
    private readonly userService: UserService = new UserService()
  ) {}

  async updateFields({ email, fields, updatedByEmail }: UpdateUserDTO) {
    const user = await this.userService.findOne(email);
    const updatedByUser = await this.userService.findOne(updatedByEmail);
    if (updatedByUser && !user?.canBeUpdatedBy(updatedByUser)) {
      throw new UnauthorizedError();
    }
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await this.userService.update(user.id, fields);

    const userUpdatedEvent = new UserUpdatedEvent(user, updatedUser);

    this.evenBus.publish(userUpdatedEvent);
    return updatedUser.toPrimitives();
  }
}
