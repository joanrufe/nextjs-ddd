import { EmailService } from "../Services/EmailService";
import { EventBus } from "@/server/DDD/Shared/EventBus/EventBus";
import { UserCreatedEvent } from "@/server/DDD/Shop/User/Events/UserCreatedEvent";

export class SendWelcomeEmail {
  constructor(
    private readonly eventBus: EventBus,
    private readonly emailService = new EmailService()
  ) {
    this.eventBus.subscribe(
      UserCreatedEvent.name,
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
