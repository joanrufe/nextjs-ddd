import { SendWelcomeEmail } from "./email.module";

// Instantiate Use Case to make it reactive to Event Bus
let sendWelcomeEmail;

if (process.env.NODE_ENV === "production") {
  sendWelcomeEmail = new SendWelcomeEmail();
} else {
  //@ts-ignore
  if (!global.sendWelcomeEmail) {
    //@ts-ignore
    global.sendWelcomeEmail = new SendWelcomeEmail();
  }
  //@ts-ignore
  sendWelcomeEmail = global.sendWelcomeEmail;
}
