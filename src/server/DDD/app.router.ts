import { createTRPCRouter } from "@/server/DDD/trpc";
import { shopRouter } from "./Shop/shop.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  shop: shopRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
