import { getMyProfile } from "@/DDD";

export type GetMyProfileRequestParams = Parameters<
  typeof getMyProfile.byEmail
>[0];

export type GetMyProfileResponse =
  | Awaited<ReturnType<typeof getMyProfile.byEmail>>
  | { error: string };

export type GetMyProfileData = Awaited<ReturnType<typeof getMyProfile.byEmail>>;
