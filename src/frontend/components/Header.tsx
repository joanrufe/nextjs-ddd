import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import NotificationBell from "./Notifications";
import { api } from "@/api-utils/client";

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
  const { data, error } = api.shop.user.getNotifications.useQuery(
    session.user.email
  );

  if (error) {
    return <div>Error loading notifications</div>;
  }
  return (
    <div className="flex items-center">
      <NotificationBell notifications={data?.notifications} />
      <div className="ml-4">
        <Link
          className="underline text-blue-300 text-sm font-medium"
          href="/profile/update"
        >
          Profile
        </Link>
        <p className="text-sm font-medium">{session.user?.name}</p>
      </div>
      {/* logout */}
      <button
        onClick={() => signOut()}
        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
