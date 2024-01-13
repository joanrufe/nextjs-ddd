import { useState } from "react";

import { BellIcon } from "@heroicons/react/24/outline";
import { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@/server/trpc-router/root";

type GetNotificationsOutput = inferProcedureOutput<
  AppRouter["shop"]["user"]["getNotifications"]
>["notifications"];

interface NotificationBellProps {
  notifications?: GetNotificationsOutput;
}

const NotificationBell = ({ notifications }: NotificationBellProps) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative">
      <button
        className="relative text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <BellIcon className="h-6 w-6" />
        {notifications?.length && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications?.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          <div className="py-2">
            {notifications?.map((notification) => (
              <a
                key={notification.id}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {notification.message}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
