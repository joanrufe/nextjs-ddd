import { getUserNotifications } from "@/DDD";

export type NotificationRequestParams = Parameters<
  typeof getUserNotifications.getUserNotifications
>[0];

// Provide type information for the getUserWithNotifications function
export type NotificationsResponse =
  | Awaited<ReturnType<typeof getUserNotifications.getUserNotifications>>
  | { error: string };

export type NotificationsData = Awaited<
  ReturnType<typeof getUserNotifications.getUserNotifications>
>;
