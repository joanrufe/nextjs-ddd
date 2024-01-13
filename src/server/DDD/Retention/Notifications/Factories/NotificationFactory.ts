import { faker } from "@faker-js/faker";
import { NotificationModel } from "../interfaces/NotificationModel";
import { Notification } from "../Entities/Notification";

export function createNotification(
  notification?: Partial<NotificationModel>
): Notification {
  return new Notification({
    id: faker.string.uuid(),
    message: faker.lorem.sentence(),
    read: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    userId: faker.string.uuid(),
    ...notification,
  });
}
