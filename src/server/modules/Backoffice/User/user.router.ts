import { AdminUserRegister, ListUsers } from "./user.module";
import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "@/server/trpc";

const adminUserRegister = new AdminUserRegister();
const listUsers = new ListUsers();

export const RegisterDTO = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  image: z
    .string()
    .url({ message: "Image must be a valid URL" })
    .nullable()
    .optional(),
  role: z.enum(["ADMIN", "USER"], {
    errorMap: () => ({ message: "Role must be ADMIN or USER" }),
  }),
});

export const userRouter = createTRPCRouter({
  register: adminProcedure.input(RegisterDTO).mutation(async ({ input }) => {
    await adminUserRegister.register({
      ...input,
      emailVerified: null,
      image: null,
    });

    return {
      success: true,
    };
  }),
  listUsers: adminProcedure.query(async () => {
    const users = await listUsers.list();
    return users;
  }),
});
