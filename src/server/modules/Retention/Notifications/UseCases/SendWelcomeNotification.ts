import { AdminUserCreatedEvent } from "@/server/modules/Backoffice/User/Events/AdminUserCreatedEvent";
import { NotificationService } from "../Services/NotificationService";
import { EventBus } from "@/server/modules/Shared/EventBus/EventBus";
import { UserCreatedEvent } from "@/server/modules/Shop/User/Events/UserCreatedEvent";
import { TYPES } from "@/server/modules/dep-definitions";
import { inject, injectable } from "inversify";

@injectable()
export class SendWelcomeNotification {
  constructor(
    @inject(TYPES.EventBus) protected readonly eventBus: EventBus,
    @inject(TYPES.NotificationService)
    protected readonly notificationService: NotificationService
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
