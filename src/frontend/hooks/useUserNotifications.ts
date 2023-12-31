import {
  GetMyNotificationsData,
  GetMyNotificationsResponse,
} from "@/shared-backend-frontend/api/Shop/User/GetMyNotifications";
import { useCallback, useEffect, useState } from "react";

const USER_DATA_URL = `/api/user/notifications`;

export function useUserNotifications(email?: string) {
  const [notifications, setNotifications] = useState<GetMyNotificationsData>();

  const fetchNotifications = useCallback(
    async function () {
      if (!email) {
        setNotifications(undefined);
        return;
      }
      const params = new URLSearchParams({ email });
      const response = await fetch(USER_DATA_URL + "?" + params.toString());
      const res: GetMyNotificationsResponse = await response.json();
      if ("error" in res) {
        console.error(res.error);
      } else {
        setNotifications(res);
      }
    },
    [email]
  );

  useEffect(() => {
    fetchNotifications();
  }, [email, fetchNotifications]);

  return { notifications, reloadNotifications: fetchNotifications };
}
