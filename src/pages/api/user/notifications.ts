import type { NextApiRequest, NextApiResponse } from "next";
import { getUserNotifications } from "@/DDD/";
import {
  NotificationsResponse,
  NotificationRequestParams,
} from "@/shared-backend-frontend/api/GetUserNotifications";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotificationsResponse>
) {
  try {
    const email = req.query.email;
    if (typeof email !== "string") {
      return res.status(400).json({ error: "No email provided" });
    }
    const params: NotificationRequestParams = { email };
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
