import { createTRPCRouter } from "@/server/DDD/trpc";

import { userRouter } from "./User/user.router";

export const shopRouter = createTRPCRouter({
  user: userRouter,
});
