import { faker } from "@faker-js/faker";
import { UserNotificationModel } from "../interfaces/UserNotificationModel";
import { UserNotification } from "../Entities/UserNotification";

export function createUserNotification(
  notification?: Partial<UserNotificationModel>
): UserNotification {
  return new UserNotification({
    id: faker.string.uuid(),
    message: faker.lorem.sentence(),
    read: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    userId: faker.string.uuid(),
    ...notification,
  });
}
