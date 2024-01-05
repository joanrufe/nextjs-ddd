import { userProfilerUpdater } from "@/DDD";

export type UserProfileUpdateRequestParams = Parameters<
  typeof userProfilerUpdater.updateFields
>[0];

export type UserProfileUpdateResponse =
  | Awaited<ReturnType<typeof userProfilerUpdater.updateFields>>
  | { error: string };

export type UserProfileUpdateData = Awaited<
  ReturnType<typeof userProfilerUpdater.updateFields>
>;
