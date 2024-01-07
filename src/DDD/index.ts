// use cases
import { SendWelcomeNotification } from "./Retention/Notifications/UseCases/SendWelcomeNotification";
import { UserRegister } from "./Shop/User/UseCases/UserRegister";
import { SendWelcomeEmail } from "./Retention/Email/UseCases/SendWelcomeEmail";
// public interfaces
import { UserModel } from "./Shop/User/interfaces/UserModel";
// shared
import { PrismaService } from "./Shared/PrismaService/PrismaService";
import { EventBus } from "./Shared/EventBus/EventBus";
import { GetUserNotifications } from "./Shop/User/UseCases/GetUserNotifications";
import { UserProfilerUpdater } from "./Shop/User/UseCases/UserProfilerUpdater";
import { GetUserProfile } from "./Shop/User/UseCases/GetUserProfile";
import { EntityValidationError } from "./Shared/Exceptions/EntityValidationError";
import { GetUserRole } from "./Shop/User/UseCases/GetUserRoles";
import { Roles } from "./Shop/User/Attributes/roles";

// Shared instances
const eventBusSingleton = new EventBus();
const prismaSingleton = new PrismaService();

// Dependency injection
const userRegister = new UserRegister(eventBusSingleton);
const sendWelcomeNotification = new SendWelcomeNotification(eventBusSingleton);
const sendWelcomeEmail = new SendWelcomeEmail(eventBusSingleton);
const userProfilerUpdater = new UserProfilerUpdater(eventBusSingleton);
const getUserNotifications = new GetUserNotifications();
const getUserProfile = new GetUserProfile();
const getUserRole = new GetUserRole();

// This should be the only file that exports anything from the DDD folder
// When possible, export only the use cases and interface that are intended
// to be public, not the services or any other internal implementation detail

export { Roles };
export type { UserModel };
export { EntityValidationError };

// @TODO Things that would need to be fixed/refactored:
// - Some of the use cases doesn't need to be exported, but they are because
//   they need to be instantiated with the event bus, which is a singleton

export {
  userRegister,
  sendWelcomeNotification,
  sendWelcomeEmail,
  getUserNotifications,
  userProfilerUpdater,
  getUserProfile,
  getUserRole,
};
export { prismaSingleton };
