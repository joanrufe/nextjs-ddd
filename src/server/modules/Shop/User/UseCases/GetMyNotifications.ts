import { UserNotificationsService } from "../Services/UserNotificationsService";

export class GetMyNotifications {
  constructor(
    protected readonly userNotificationService = new UserNotificationsService()
  ) {
    this.userNotificationService = userNotificationService;
  }

  async byEmail({ email }: { email: string }) {
    const notifications = await this.userNotificationService.findAll(email);
    return notifications.map((n) => n.toPrimitives());
  }
}
