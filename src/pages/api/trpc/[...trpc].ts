import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter } from "@/server/DDD/app.router";
import { createTRPCContext } from "@/server/DDD/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
