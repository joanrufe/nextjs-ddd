import { eventBusSingleton } from "../../Shared/shared.module";
import { SendWelcomeEmail } from "./UseCases/SendWelcomeEmail";
const sendWelcomeEmail = new SendWelcomeEmail(eventBusSingleton);

export { sendWelcomeEmail };
