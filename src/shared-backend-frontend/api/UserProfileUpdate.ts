import { userProfilerUpdater } from "@/DDD";

export type UserDataRequestParams = Parameters<
  typeof userProfilerUpdater.updateFields
>[0];

// Provide type information for the getUserWithNotifications function
export type NotificationsResponse =
  | Awaited<ReturnType<typeof userProfilerUpdater.updateFields>>
  | { error: string };

export type NotificationsData = Awaited<
  ReturnType<typeof userProfilerUpdater.updateFields>
>;
