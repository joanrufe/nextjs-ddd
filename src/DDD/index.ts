// use cases
import { SendWelcomeNotification } from "./Notifications/UseCases/SendWelcomeNotification";
import { UserRegister } from "./User/UseCases/UserRegister";
import { SendWelcomeEmail } from "./Email/UseCases/SendWelcomeEmail";

// public interfaces
import { UserModel } from "./User/interfaces/UserModel";

// shared
import { PrismaService } from "./Shared/PrismaService/PrismaService";
import { EventBus } from "./Shared/EventBus/EventBus";

const eventBusSingleton = new EventBus();
const prismaSingleton = new PrismaService();

// Dependency injection
const userRegister = new UserRegister(eventBusSingleton);
const sendWelcomeNotification = new SendWelcomeNotification(eventBusSingleton);
const sendWelcomeEmail = new SendWelcomeEmail(eventBusSingleton);

// This should be the only file that exports anything from the DDD folder
// When possible, export only the use cases and interface that are intended
// to be public, not the services or any other internal implementation detail

export type { UserModel };

// @TODO Things that would need to be fixed/refactored:
// - Some of the use cases doesn't need to be exported, but they are because
//   they need to be instantiated with the event bus, which is a singleton

export { userRegister, sendWelcomeNotification, sendWelcomeEmail };
export { prismaSingleton };
