import { container } from "../..";
import { TYPES } from "../../dep-definitions";
import { NotificationService } from "./Services/NotificationService";
import { SendWelcomeNotification } from "./UseCases/SendWelcomeNotification";

container
  .bind<NotificationService>(TYPES.NotificationService)
  .to(NotificationService);

container
  .bind<SendWelcomeNotification>(TYPES.SendWelcomeNotification)
  .to(SendWelcomeNotification);

// Instantiate Use Case to make it reactive to Event Bus
container.get<SendWelcomeNotification>(TYPES.SendWelcomeNotification);

export { SendWelcomeNotification };
