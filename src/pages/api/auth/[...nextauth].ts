import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import Email from "next-auth/providers/email";
import { getUserRole, prismaSingleton } from "@/DDD";
import { UserModel, userRegister } from "@/DDD";

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
      userRegister.publishUserCreatedEvent({
        ...user,
        emailVerified: null,
      } as UserModel);
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      const role = await getUserRole.byEmail({ email: user.email });
      if (session.user && role) {
        session.user.role = role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
