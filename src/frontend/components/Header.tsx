import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useUserNotifications } from "@/frontend/hooks/useUserNotifications";
import NotificationBell from "./Notifications";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl">
          <Link href="/">My Next.js Project</Link>
        </h1>
        {session?.user ? (
          <UserProfileHeader user={session.user} />
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

function UserProfileHeader(session: { user: Session["user"] }) {
  const { notifications } = useUserNotifications(
    session.user?.email || undefined
  );
  return (
    <div className="flex items-center">
      <NotificationBell notifications={notifications} />
      <div className="ml-4">
        <p className="text-sm font-medium">{session.user?.name}</p>
        <p className="text-xs">{session.user?.email}</p>
      </div>
    </div>
  );
}
