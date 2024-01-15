import { EmailService } from "./Services/EmailService";
import { SendWelcomeEmail } from "./UseCases/SendWelcomeEmail";
import { container } from "../..";
import { TYPES } from "../../dep-definitions";

container.bind<EmailService>(TYPES.EmailService).to(EmailService);

container.bind<SendWelcomeEmail>(TYPES.SendWelcomeEmail).to(SendWelcomeEmail);

export { SendWelcomeEmail };
