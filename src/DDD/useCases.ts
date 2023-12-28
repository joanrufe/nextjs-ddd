import { SendWelcomeNotification } from "./Notifications/UseCases/SendWelcomeNotification";
import { UserRegister } from "./User/UseCases/UserRegister";
import { EventBus } from "./Shared/EventBus/EventBus";

const eventBusSingleton = new EventBus();

const sendWelcomeNotification = new SendWelcomeNotification(eventBusSingleton);
const userRegister = new UserRegister(eventBusSingleton);

export { sendWelcomeNotification, userRegister };
