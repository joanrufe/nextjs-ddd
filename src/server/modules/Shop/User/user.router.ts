import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import {
  GetMyNotifications,
  GetMyProfile,
  GetUserRole,
  MyProfileUpdater,
} from "./user.module";
import { TRPCError } from "@trpc/server";

const getMyNotifications = new GetMyNotifications();
const getMyProfile = new GetMyProfile();
const myProfileUpdater = new MyProfileUpdater();
const getUserRole = new GetUserRole();

export const UpdateProfileDTO = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .nullable(),
  email: z.string().email({ message: "Email is not valid" }),
  image: z
    .string()
    .url({ message: "Image must be a valid URL" })
    .nullable()
    .optional(),
});

export const GetProfileDTO = z.string().email();

export const userRouter = createTRPCRouter({
  updateProfile: protectedProcedure
    .input(UpdateProfileDTO)
    .mutation(async ({ input, ctx }) => {
      if (input.email !== ctx.session.user.email) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only update your own profile",
        });
      }
      await myProfileUpdater.updateFields({
        email: input.email,
        fields: input,
      });

      return {
        success: true,
      };
    }),
  getProfile: protectedProcedure
    .input(GetProfileDTO)
    .query(async ({ input }) => {
      const user = await getMyProfile.byEmail({ email: input });
      return {
        user,
      };
    }),
  getNotifications: protectedProcedure
    .input(GetProfileDTO)
    .query(async ({ input }) => {
      const notifications = await getMyNotifications.byEmail({ email: input });
      return {
        notifications,
      };
    }),
  getUserRole: protectedProcedure
    .input(GetProfileDTO)
    .query(async ({ input }) => {
      const role = await getUserRole.byEmail({ email: input });
      return {
        role,
      };
    }),
});
