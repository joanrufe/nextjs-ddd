import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { container } from "./modules";
import { GetServerSidePropsContext } from "next";
import { getServerSideAPI } from "@/api-client/server";
import { PrismaService } from "./modules/Shared/shared.module";
import { UserRegister } from "./modules/Shop/shop.module";

const prismaSingleton = container.get(PrismaService);
const userRegister = container.get(UserRegister);

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prismaSingleton) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prismaSingleton.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password!))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
        };
      },
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

    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
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
