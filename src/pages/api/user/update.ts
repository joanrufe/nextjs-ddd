import type { NextApiRequest, NextApiResponse } from "next";
import {
  myProfileUpdater,
  EntityValidationError,
  UnauthorizedError,
} from "@/DDD/";
import {
  MyProfileUpdaterRequestParams,
  MyProfileUpdaterResponse,
} from "@/shared-backend-frontend/api/Shop/User/MyProfileUpdater";

import { safelyGetServerSession } from "@/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MyProfileUpdaterResponse>
) {
  try {
    const session = await safelyGetServerSession(req, res);

    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("session", session);
    const { fields } = req.body;
    const params: MyProfileUpdaterRequestParams = {
      email: session.user.email,
      fields,
      updatedByEmail: session.user.email,
    };
    const userData = await myProfileUpdater.updateFields(params);

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
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.error(error);
    return res.status(500).json({ error: "Something  went wrong" });
  }
}
