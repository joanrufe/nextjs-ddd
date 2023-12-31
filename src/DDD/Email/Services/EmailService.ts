import sendgridModule, { MailService } from "@sendgrid/mail";

interface RequiredEmailData {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export class EmailService {
  constructor(private readonly sendgrid: MailService = sendgridModule) {
    this.sendgrid = sendgrid;
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not defined");
    }

    this.sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  }
  async sendEmail(email: RequiredEmailData) {
    await this.sendgrid.send(email);
  }
}