import { AdminUserCreatedEvent } from "@/server/modules/Backoffice/User/Events/AdminUserCreatedEvent";
import { EmailService } from "../Services/EmailService";
import { eventBusSingleton } from "@/server/modules/Shared/shared.module";
import { UserCreatedEvent } from "@/server/modules/Shop/User/Events/UserCreatedEvent";

export class SendWelcomeEmail {
  constructor(
    protected readonly eventBus = eventBusSingleton,
    protected readonly emailService = new EmailService()
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
    this.emailService = emailService;
  }

  async onUserCreated(event: UserCreatedEvent) {
    const { user } = event;
    try {
      if (!user.email) throw new Error("No email provided");
      if (!process.env.EMAIL_FROM)
        throw new Error("EMAIL_FROM environment variable is not defined");

      await this.emailService.sendEmail({
        html: `<p>Welcome to the app, ${
          user.name || user.email
        }!</p><p>Thanks for joining us!</p>`,
        to: user.email,
        from: process.env.EMAIL_FROM,
        subject: "Welcome to the app!",
      });
    } catch (error) {
      console.error(error);
    }
  }
}
