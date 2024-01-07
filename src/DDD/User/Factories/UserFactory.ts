import { faker } from "@faker-js/faker";
import { User } from "../Entities/User";
import { CreateUserDTO } from "../interfaces/CreateUserDTO";
import { Roles } from "../Attributes/roles";

export function createUser(
  user?: Partial<CreateUserDTO> | { id?: string }
): User {
  return new User({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: faker.date.past(),
    image: faker.image.avatar(),
    role: faker.helpers.enumValue(Roles),
    ...user,
  });
}
