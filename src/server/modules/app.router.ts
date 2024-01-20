import { createTRPCRouter } from "@/server/trpc";
import { shopRouter } from "./Shop/shop.router";
import { backofficeRouter } from "./Backoffice/backoffice.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  shop: shopRouter,
  backoffice: backofficeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
