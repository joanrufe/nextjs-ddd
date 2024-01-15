import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import {
  // getMyNotifications,
  // getMyProfile,
  // myProfileUpdater,
  GetMyNotifications,
  GetMyProfile,
  GetUserRole,
  MyProfileUpdater,
} from "./user.module";
import { container } from "../..";

const getMyNotifications =
  container.resolve<GetMyNotifications>(GetMyNotifications);
const getMyProfile = container.resolve<GetMyProfile>(GetMyProfile);
const myProfileUpdater = container.resolve<MyProfileUpdater>(MyProfileUpdater);
const getUserRole = container.resolve<GetUserRole>(GetUserRole);

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
        throw new Error("You cannot change other users' emails");
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
      console.log("notifications", notifications);
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