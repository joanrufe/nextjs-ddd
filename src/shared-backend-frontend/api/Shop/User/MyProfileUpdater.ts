import { myProfileUpdater } from "@/DDD";

export type MyProfileUpdaterRequestParams = Parameters<
  typeof myProfileUpdater.updateFields
>[0];

export type MyProfileUpdaterResponse =
  | Awaited<ReturnType<typeof myProfileUpdater.updateFields>>
  | { error?: string; validationErrors?: { field: string; message: string }[] };

export type MyProfileUpdaterData = Awaited<
  ReturnType<typeof myProfileUpdater.updateFields>
>;
