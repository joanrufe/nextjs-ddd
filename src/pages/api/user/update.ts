import type { NextApiRequest, NextApiResponse } from "next";
import { userProfilerUpdater } from "@/DDD/";
import { UserProfileUpdateRequestParams } from "@/shared-backend-frontend/api/UserProfileUpdate";
import { UserProfileResponse } from "@/shared-backend-frontend/api/GetUserProfile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserProfileResponse>
) {
  const { email, fields } = req.body;

  if (typeof email !== "string") {
    return res.status(400).json({ error: "No email provided" });
  }

  const params: UserProfileUpdateRequestParams = { email, fields };
  const userData = await userProfilerUpdater.updateFields(params);

  res.status(200).json(userData);
}
