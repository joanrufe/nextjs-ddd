import { RequiredEmailData } from "../interfaces/RequiredEmailData";

export class Email implements RequiredEmailData {
  public readonly to: string;
  public readonly from: string;
  public readonly subject: string;
  public readonly html: string;

  constructor(email: RequiredEmailData) {
    this.to = email.to;
    this.from = email.from;
    this.subject = email.subject;
    this.html = email.html;
  }
}
