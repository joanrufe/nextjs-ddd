import { inject, injectable } from "inversify";
import { UserNotificationsService } from "../Services/UserNotificationsService";
import { TYPES } from "@/server/modules/dep-definitions";

@injectable()
export class GetMyNotifications {
  constructor(
    @inject(TYPES.UserNotificationsService)
    protected readonly userNotificationService: UserNotificationsService
  ) {
    this.userNotificationService = userNotificationService;
  }

  async byEmail({ email }: { email: string }) {
    const notifications = await this.userNotificationService.findAll(email);
    return notifications.map((n) => n.toPrimitives());
  }
}
