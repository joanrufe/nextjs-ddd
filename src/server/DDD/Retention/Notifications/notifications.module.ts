import { eventBusSingleton } from "@/server/DDD/Shared/EventBus/EventBus";
import { SendWelcomeNotification } from "./UseCases/SendWelcomeNotification";

const sendWelcomeNotification = new SendWelcomeNotification(eventBusSingleton);

export { sendWelcomeNotification };
