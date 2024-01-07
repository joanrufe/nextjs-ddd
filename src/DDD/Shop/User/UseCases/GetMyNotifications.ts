import { UserNotificationsService } from "../Services/UserNotificationsService";
import { GetUserNotificationsDTO } from "../interfaces/GetUserNotificationsDTO";

export class GetMyNotifications {
  constructor(
    private readonly userNotificationService: UserNotificationsService = new UserNotificationsService()
  ) {
    this.userNotificationService = userNotificationService;
  }

  async byEmail({ email }: GetUserNotificationsDTO) {
    const notifications = await this.userNotificationService.findAll(email);
    return notifications.map((n) => n.toPrimitives());
  }
}
