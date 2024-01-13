import { createTRPCRouter } from "@/server/trpc-router/trpc";

import { userRouter } from "./shop/user";

export const shopRouter = createTRPCRouter({
  user: userRouter,
});
