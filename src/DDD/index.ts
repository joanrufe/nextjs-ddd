import { SendWelcomeNotification } from "./Notifications/UseCases/SendWelcomeNotification";
import { UserRegister } from "./User/UseCases/UserRegister";
import { EventBus } from "./Shared/EventBus/EventBus";
import { UserModel } from "./User/interfaces/UserModel";

const eventBusSingleton = new EventBus();
const sendWelcomeNotification = new SendWelcomeNotification(eventBusSingleton);
const userRegister = new UserRegister(eventBusSingleton);

// This should be the only file that exports anything from the DDD folder
// When possible, export only the use cases and interface that are intended
// to be public, not the services or any other internal implementation detail

export type { UserModel };

export { sendWelcomeNotification, userRegister };
