import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl">
          <Link href="/">My Next.js Project</Link>
        </h1>
        {session ? (
          <p>{session?.user?.name || session?.user?.email}</p>
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
