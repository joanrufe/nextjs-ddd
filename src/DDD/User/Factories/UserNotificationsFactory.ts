import { faker } from "@faker-js/faker";
import { UserNotificationModel } from "../interfaces/UserNotificationModel";
import { UserNotification } from "../Entities/UserNotification";

/**
 * This function does not create a UserNotification entity,
 * it just creates a primitive UserNotification object
 */
export function createUserNotification(
  notification?: Partial<UserNotificationModel>
): UserNotificationModel {
  return {
    id: faker.string.uuid(),
    message: faker.lorem.sentence(),
    read: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    userId: faker.string.uuid(),
    ...notification,
  };
}
