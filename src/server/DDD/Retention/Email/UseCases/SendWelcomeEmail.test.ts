import { SendWelcomeEmail } from "./SendWelcomeEmail";
import { EventBus } from "../../../Shared/EventBus/EventBus";
import { EmailService } from "../Services/EmailService";
import sendgridModule from "@sendgrid/mail";
import { Roles } from "@/server/DDD/Shared/User/Attributes/roles";

describe("SendWelcomeEmail", () => {
  let sendWelcomeEmail: SendWelcomeEmail;
  let eventBus: EventBus;
  let emailService: EmailService;

  beforeEach(() => {
    process.env.SENDGRID_API_KEY = "SG.test";
    process.env.EMAIL_FROM = "no-reply@test.com";
    jest.spyOn(sendgridModule, "setApiKey").mockImplementation(() => {});
    jest
      .spyOn(sendgridModule, "send")
      .mockImplementation(async (..._args: any) => ({} as any));
    eventBus = new EventBus();
    emailService = new EmailService();
    sendWelcomeEmail = new SendWelcomeEmail(eventBus, emailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("onUserCreated", () => {
    it("should send a welcome email when a user is created", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
        role: Roles.USER,
      };
      const sendEmailSpy = jest.spyOn(emailService, "sendEmail");

      await sendWelcomeEmail.onUserCreated({ user });

      expect(sendEmailSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          html: `<p>Welcome to the app, ${user.name}!</p><p>Thanks for joining us!</p>`,
          to: user.email,
          from: process.env.EMAIL_FROM,
          subject: "Welcome to the app!",
        })
      );
    });

    it("should throw an error if no email is provided", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: null,
        image: null,
        emailVerified: null,
        role: Roles.USER,
      };
      const sendEmailSpy = jest.spyOn(emailService, "sendEmail");
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      await sendWelcomeEmail.onUserCreated({ user } as any);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        new Error("No email provided")
      );

      expect(sendEmailSpy).not.toHaveBeenCalled();
    });

    it("should throw an error if EMAIL_FROM environment variable is not defined", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
        role: Roles.USER,
      };

      const sendEmailSpy = jest.spyOn(emailService, "sendEmail");
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
      delete process.env.EMAIL_FROM;

      sendWelcomeEmail = new SendWelcomeEmail(eventBus, emailService);

      await expect(sendWelcomeEmail.onUserCreated({ user }));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        new Error("EMAIL_FROM environment variable is not defined")
      );

      expect(sendEmailSpy).not.toHaveBeenCalled();
    });

    it("should catch and log any errors thrown during email sending", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        image: null,
        emailVerified: null,
        role: Roles.USER,
      };
      const sendEmailSpy = jest.spyOn(emailService, "sendEmail");
      const consoleErrorSpy = jest.spyOn(console, "error");

      sendEmailSpy.mockRejectedValueOnce(new Error("Failed to send email"));

      await sendWelcomeEmail.onUserCreated({ user });

      expect(sendEmailSpy).toHaveBeenCalledWith({
        html: `<p>Welcome to the app, ${user.name}!</p><p>Thanks for joining us!</p>`,
        to: user.email,
        from: process.env.EMAIL_FROM,
        subject: "Welcome to the app!",
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        new Error("Failed to send email")
      );
    });
  });
});
