import { getUserNotifications } from "@/DDD";

// Provide type information for the getUserWithNotifications function
export type NotificationsResponse =
  | Awaited<ReturnType<typeof getUserNotifications.getUserNotifications>>
  | { error: string };

export type NotificationsData = Awaited<
  ReturnType<typeof getUserNotifications.getUserNotifications>
>;
