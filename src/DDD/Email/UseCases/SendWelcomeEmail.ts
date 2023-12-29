import { EmailService } from "../Services/EmailService";
import { EventBus } from "@/DDD/Shared/EventBus/EventBus";
import { UserModel } from "@/DDD/User/interfaces/UserModel";

export class SendWelcomeEmail {
  constructor(
    private readonly eventBus: EventBus,
    private readonly emailService = new EmailService()
  ) {
    this.eventBus.subscribe(
      "UserCreated",
      this.onUserCreated.bind(this),
      this.constructor.name
    );
    this.emailService = emailService;
  }

  async onUserCreated(data: UserModel) {
    try {
      if (!data.email) throw new Error("No email provided");
      if (!process.env.EMAIL_FROM)
        throw new Error("EMAIL_FROM environment variable is not defined");

      await this.emailService.sendEmail({
        html: `<p>Welcome to the app, ${
          data.name || data.email
        }!</p><p>Thanks for joining us!</p>`,
        to: data.email,
        from: process.env.EMAIL_FROM,
        subject: "Welcome to the app!",
      });
    } catch (error) {
      console.error(error);
    }
  }
}
