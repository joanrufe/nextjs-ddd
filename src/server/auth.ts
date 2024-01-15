import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import Email from "next-auth/providers/email";
import { container } from "./modules";
import { GetServerSidePropsContext } from "next";
import { getServerSideAPI } from "@/api-client/server";
import { PrismaService } from "./modules/Shared/shared.module";
import { UserRegister } from "./modules/Shop/shop.module";

const prismaSingleton = container.resolve(PrismaService);
const userRegister = container.resolve(UserRegister);

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prismaSingleton) as Adapter,
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // ...add more providers here
    // Eg: CredentialsProvider can be used with legacy APIs with a username/password
    // see: https://authjs.dev/getting-started/providers/credentials-tutorial
  ],
  events: {
    createUser: async ({ user }) => {
      // Here should publish domain event
      userRegister.publishUserCreatedEvent(
        user as Parameters<typeof userRegister.publishUserCreatedEvent>[0]
      );
    },
  },
  callbacks: {
    session: async ({ session }) => {
      // const role = await getUserRole.byEmail({ email: user.email });
      const serverSideAPI = getServerSideAPI(session);
      const data = await serverSideAPI.shop.user.getUserRole.fetch(
        session.user.email
      );
      if (session.user && data.role) {
        session.user.role = data.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
