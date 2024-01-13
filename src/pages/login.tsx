import { getServerAuthSession } from "@/server/auth";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <form
      method="post"
      action="/api/auth/signin/email"
      className="flex flex-col items-center"
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label className="mb-4 flex flex-col">
        Email address
        <input
          type="email"
          id="email"
          name="email"
          className="border border-gray-300 rounded-md p-2 text-black w-64"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Sign in with Email
      </button>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  const session = await getServerAuthSession(context);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }
  return {
    props: { csrfToken },
  };
}
