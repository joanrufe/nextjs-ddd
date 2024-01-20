import { createTRPCRouter } from "@/server/trpc";

import { userRouter } from "./User/user.router";

export const backofficeRouter = createTRPCRouter({
  user: userRouter,
});
