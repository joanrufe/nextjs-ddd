import sendgridModule, { MailService } from "@sendgrid/mail";
import { RequiredEmailData } from "../interfaces/RequiredEmailData";

export class EmailService {
  constructor(private readonly sendgrid: MailService = sendgridModule) {
    this.sendgrid = sendgrid;
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not defined");
    }

    this.sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  }
  async sendEmail(emailData: RequiredEmailData) {
    await this.sendgrid.send(emailData);
  }
}
