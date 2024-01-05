import { UserNotificationsService } from "../Services/UserNotificationsService";
import { GetUserNotificationsDTO } from "../interfaces/GetUserNotificationsDTO";

export class GetUserNotifications {
  constructor(
    private readonly userNotificationService: UserNotificationsService = new UserNotificationsService()
  ) {
    this.userNotificationService = userNotificationService;
  }

  async getUserNotifications({ email }: GetUserNotificationsDTO) {
    const notifications = await this.userNotificationService.findAll(email);
    return notifications.map((n) => n.toPrimitives());
  }
}
