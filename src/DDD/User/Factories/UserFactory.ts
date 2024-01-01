import { faker } from "@faker-js/faker";
import { User } from "../Entities/User";
import { CreateUserDTO } from "../interfaces/CreateUserDTO";
import { UserNotificationModel } from "../interfaces/UserNotificationModel";

export function createUser(
  user?: Partial<CreateUserDTO> | { id?: string },
  notifications?: UserNotificationModel[]
): User {
  return new User(
    {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.date.past(),
      image: faker.image.avatar(),
      ...user,
    },
    notifications
  );
}
