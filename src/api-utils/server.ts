import { appRouter } from "@/server/trpc-router/root";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { Session } from "next-auth";
import superjson from "superjson";

/**
 * Use this function to get the server-side API helpers.
 * Intended to be used in `getServerSideProps`.
 * 
 * It will create a new instance of react query for the server.
 * Example:
 * ```ts
 *  const serverSideAPI = getServerSideAPI(session);
    const data = await serverSideAPI.shop.getProfile.fetch(session.user.email);
  * ```
 * @param session NextAuth session
 * @returns
 */
export const getServerSideAPI = (session: Session) =>
  createServerSideHelpers({
    router: appRouter,
    transformer: superjson,
    ctx: {
      session,
    },
  });
