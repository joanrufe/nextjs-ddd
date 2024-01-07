import { NotificationService } from "../Services/NotificationService";
import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserCreatedEvent } from "@/DDD/Shop/User/Events/UserCreatedEvent";

export class SendWelcomeNotification {
  constructor(
    private readonly eventBus: EventBus,
    private readonly notificationService = new NotificationService()
  ) {
    this.eventBus.subscribe(
      UserCreatedEvent.name,
      this.onUserCreated.bind(this),
      this.constructor.name
    );
    this.notificationService = notificationService;
  }

  onUserCreated(event: UserCreatedEvent) {
    const { user } = event;
    this.notificationService.createNotification(
      user.id,
      `Welcome to the app, ${user.name || user.email}!`
    );
  }
}
