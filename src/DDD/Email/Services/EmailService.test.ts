import { EmailService } from "./EmailService";
import sendgridModule from "@sendgrid/mail";

describe("EmailService", () => {
  describe("sendEmail", () => {
    it("should send an email using the sendgrid service", async () => {
      process.env.SENDGRID_API_KEY = "test";
      jest.spyOn(sendgridModule, "setApiKey").mockImplementation(() => {});
      jest
        .spyOn(sendgridModule, "send")
        .mockImplementation(async (..._args: any) => ({} as any));

      const emailData = {
        to: "test@example.com",
        from: "no-reply@example.com",
        subject: "Test Email",
        html: "This is a test email",
      };

      const emailService = new EmailService();
      await emailService.sendEmail(emailData);

      expect(sendgridModule.send).toHaveBeenCalledWith(emailData);
    });

    it("should throw an error if SENDGRID_API_KEY is not defined", async () => {
      delete process.env.SENDGRID_API_KEY;
      const emailData = {
        to: "test@example.com",
        from: "no-reply@example.com",
        subject: "Test Email",
        html: "This is a test email",
      };

      delete process.env.SENDGRID_API_KEY;

      await expect(() => new EmailService()).toThrow(
        "SENDGRID_API_KEY is not defined"
      );
    });
  });
});
