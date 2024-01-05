import { getUserProfile } from "@/DDD";

export type UserProfileRequestParams = Parameters<
  typeof getUserProfile.getUserProfile
>[0];

export type UserProfileResponse =
  | Awaited<ReturnType<typeof getUserProfile.getUserProfile>>
  | { error: string };

export type UserProfileData = Awaited<
  ReturnType<typeof getUserProfile.getUserProfile>
>;
