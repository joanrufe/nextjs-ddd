import { createEmail } from "../Factories/EmailFactory";
import { EmailService } from "./EmailService";
import sendgridModule from "@sendgrid/mail";

describe("EmailService", () => {
  describe("sendEmail", () => {
    it("should send an email using the sendgrid service", async () => {
      process.env.SENDGRID_API_KEY = "test";
      jest.spyOn(sendgridModule, "setApiKey").mockReturnValueOnce();
      jest.spyOn(sendgridModule, "send").mockResolvedValueOnce({} as any);

      const emailData = createEmail();

      const emailService = new EmailService(sendgridModule);
      await emailService.sendEmail(emailData);

      expect(sendgridModule.send).toHaveBeenCalledWith(emailData);
    });

    it("should throw an error if SENDGRID_API_KEY is not defined", async () => {
      delete process.env.SENDGRID_API_KEY;

      expect(() => new EmailService(sendgridModule)).toThrow(
        "SENDGRID_API_KEY is not defined"
      );
    });
  });
});
