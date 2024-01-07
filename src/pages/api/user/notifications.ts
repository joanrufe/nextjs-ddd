import type { NextApiRequest, NextApiResponse } from "next";
import { getUserNotifications } from "@/DDD/";
import { NotificationsResponse } from "@/shared-backend-frontend/api/GetUserNotifications";
import { safelyGetServerSession } from "@/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotificationsResponse>
) {
  try {
    const session = await safelyGetServerSession(req);
    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email } = session.user;

    if (typeof email !== "string") {
      return res.status(400).json({ error: "No email provided" });
    }
    const params = { email };
    const userData = await getUserNotifications.getUserNotifications(params);
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
