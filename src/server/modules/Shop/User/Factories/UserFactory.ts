import { faker } from "@faker-js/faker";
import { User } from "../Entities/User";
import { Roles } from "@/server/modules/Shared/shared.module";
import { OmitMethods } from "@/server/modules/Shared/Types/utility-types";

export function createUser(
  user?: Partial<OmitMethods<Omit<User, "id">>>
): User {
  return new User({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
    role: Roles.USER,
    ...user,
  });
}
