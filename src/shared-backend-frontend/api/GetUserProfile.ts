import { getUserProfile } from "@/DDD";

export type UserProfileRequestParams = Parameters<
  typeof getUserProfile.byEmail
>[0];

export type UserProfileResponse =
  | Awaited<ReturnType<typeof getUserProfile.byEmail>>
  | { error: string };

export type UserProfileData = Awaited<
  ReturnType<typeof getUserProfile.byEmail>
>;
