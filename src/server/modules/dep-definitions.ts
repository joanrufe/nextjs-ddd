// All Services and usecases should be defined here
// Necessary for inversify dependency injection to work
export const TYPES = {
  AdminUserService: Symbol.for("AdminUserService"),
  AdminUserRegister: Symbol.for("AdminUserRegister"),
  EmailService: Symbol.for("EmailService"),
  EventBus: Symbol.for("EventBus"),
  GetMyNotifications: Symbol.for("GetMyNotifications"),
  GetMyProfile: Symbol.for("GetMyProfile"),
  GetUserRole: Symbol.for("GetUserRole"),
  ListUsers: Symbol.for("ListUsers"),
  MyProfileUpdater: Symbol.for("MyProfileUpdater"),
  NotificationService: Symbol.for("NotificationService"),
  PrismaService: Symbol.for("PrismaService"),
  SendWelcomeEmail: Symbol.for("SendWelcomeEmail"),
  SendWelcomeNotification: Symbol.for("SendWelcomeNotification"),
  UserNotificationsService: Symbol.for("UserNotificationsService"),
  UserService: Symbol.for("UserService"),
  UserRegister: Symbol.for("UserRegister"),
};
