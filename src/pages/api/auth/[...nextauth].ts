import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import Email from "next-auth/providers/email";
import prisma from "../../../../lib/prisma";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma) as Adapter,
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
      console.log("createUser", user);
      // Here should publish domain event
    },
  },
});
