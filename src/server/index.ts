import { authOptions, getServerAuthSession } from "./auth";
import { appRouter, AppRouter } from "./modules/app.router";
import { createTRPCContext } from "./trpc";

/**
 * Altough the idea is that nothing from the server folder is exported,
 * we need to export the appRouter so that it can be used to configure
 * the tRPC clients and for nextjs pages/api/trpc/[...trpc].ts setup
 */
export { appRouter, authOptions, createTRPCContext, getServerAuthSession };

export type { AppRouter };
