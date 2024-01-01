import { faker } from "@faker-js/faker";
import { Email } from "../Entities/Email";

export function createEmail(email?: Partial<Email>): Email {
  return new Email({
    html: faker.lorem.sentence(),
    subject: faker.lorem.sentence(),
    from: faker.internet.email(),
    to: faker.internet.email(),
    ...email,
  });
}
