import { getMyNotifications } from "@/DDD";

// Provide type information for the getUserWithNotifications function
export type GetMyNotificationsResponse =
  | Awaited<ReturnType<typeof getMyNotifications.byEmail>>
  | { error: string };

export type GetMyNotificationsData = Awaited<
  ReturnType<typeof getMyNotifications.byEmail>
>;
