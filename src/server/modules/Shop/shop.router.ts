import { createTRPCRouter } from "@/server/trpc";

import { userRouter } from "./User/user.router";

export const shopRouter = createTRPCRouter({
  user: userRouter,
});
