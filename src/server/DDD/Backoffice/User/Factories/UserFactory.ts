import { faker } from "@faker-js/faker";
import { User } from "../Entities/User";
import { Roles } from "../../../Shared/User/Attributes/roles";
import { OmitMethods } from "@/server/DDD/Shared/Types/utility-types";

export function createUser(user?: Partial<OmitMethods<User>>): User {
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
