import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import { createContext } from "@/server/trpc/context";
import { appRouter } from "@/server/routers";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
    },
  });
}

// Create a stable getter for the query client that
// will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

// Server-side TRPC proxy for direct access in server components
export const trpc = createTRPCOptionsProxy({
  ctx: () => createContext({} as any), // We'll need to pass proper NextRequest
  router: appRouter,
  queryClient: getQueryClient,
});

// Direct caller for server-side use
export const caller = appRouter.createCaller(() => createContext({} as any));
