import { SendWelcomeNotification } from "./notifications.module";

// Instantiate Use Case to make it reactive to Event Bus
let sendWelcomeNotificationInstance;

if (process.env.NODE_ENV === "production") {
  sendWelcomeNotificationInstance = new SendWelcomeNotification();
} else {
  //@ts-ignore
  if (!global.sendWelcomeNotificationInstance) {
    //@ts-ignore
    global.sendWelcomeNotificationInstance = new SendWelcomeNotification();
  }
  //@ts-ignore
  sendWelcomeNotificationInstance = global.sendWelcomeNotificationInstance;
}
