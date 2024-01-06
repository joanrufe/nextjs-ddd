import type { NextApiRequest, NextApiResponse } from "next";
import { userProfilerUpdater, EntityValidationError } from "@/DDD/";
import {
  UserProfileUpdateRequestParams,
  UserProfileUpdateResponse,
} from "@/shared-backend-frontend/api/UserProfileUpdate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserProfileUpdateResponse>
) {
  const { email, fields } = req.body;

  if (typeof email !== "string") {
    return res.status(400).json({ error: "No email provided" });
  }

  try {
    const params: UserProfileUpdateRequestParams = { email, fields };
    const userData = await userProfilerUpdater.updateFields(params);

    res.status(200).json(userData);
  } catch (error) {
    if (error instanceof EntityValidationError) {
      return res.status(400).json({
        error: error.message,
        validationErrors: error.errors.map((e) => ({
          field: e.property,
          message: e.constraints
            ? Object.keys(e.constraints)
                .map((key) => (e.constraints ? e.constraints[key] : ""))
                .join(", ")
            : "",
        })),
      });
    }
    console.error(error);
    return res.status(500).json({ error: "Something  went wrong" });
  }
}
