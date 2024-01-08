import { faker } from "@faker-js/faker";
import { User } from "../Entities/User";
import { CreateUserDTO } from "../interfaces/CreateUserDTO";
import { Roles } from "../../../Shared/User/Attributes/roles";
import { NonOptionalNonNull } from "@/utils/types";

export function createUser(user?: Partial<CreateUserDTO>): User {
  return new User({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: faker.date.past(),
    image: faker.image.avatar(),
    role: Roles.USER,
    ...user,
  });
}
