import { UserModel } from "@/DDD/User/interfaces/UserModel";
import { NotificationService } from "../Services/NotificationService";
import { EventBus } from "@/DDD/Shared/EventBus/EventBus";

export class SendWelcomeNotification {
  constructor(
    private readonly eventBus: EventBus,
    private readonly notificationService = new NotificationService()
  ) {
    this.eventBus.subscribe("UserCreated", this.onUserCreated.bind(this));
    this.notificationService = notificationService;
  }

  onUserCreated(data: UserModel) {
    this.notificationService.createNotification(
      data.id,
      `Welcome to the app, ${data.name || data.email}!`
    );
  }
}
