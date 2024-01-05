import type { NextApiRequest, NextApiResponse } from "next";
import { getUserProfile } from "@/DDD/";
import {
  UserProfileRequestParams,
  UserProfileResponse,
} from "@/shared-backend-frontend/api/GetUserProfile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserProfileResponse>
) {
  try {
    const id = req.query.id;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "No email provided" });
    }
    const params: UserProfileRequestParams = { id };
    const userData = await getUserProfile.getUserProfile(params);
    if (userData === null) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}
