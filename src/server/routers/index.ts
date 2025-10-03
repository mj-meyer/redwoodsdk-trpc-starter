import { z } from "zod";
import { publicProcedure, router } from "../trpc/trpc";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),

  greeting: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),
});

export type AppRouter = typeof appRouter;
