import { AdminUserCreatedEvent } from "@/server/modules/Backoffice/User/Events/AdminUserCreatedEvent";
import { NotificationService } from "../Services/NotificationService";
import { UserCreatedEvent } from "@/server/modules/Shop/User/Events/UserCreatedEvent";
import { eventBusSingleton } from "@/server/modules/Shared/shared.module";

export class SendWelcomeNotification {
  constructor(
    protected readonly eventBus = eventBusSingleton,
    protected readonly notificationService = new NotificationService()
  ) {
    this.eventBus.subscribe(
      UserCreatedEvent.name,
      this.onUserCreated.bind(this),
      this.constructor.name
    );
    this.eventBus.subscribe(
      AdminUserCreatedEvent.name,
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
