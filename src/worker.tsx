import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { setCommonHeaders } from "@/app/headers";
import { appRouter } from "@/server/routers";
import { createContext } from "@/server/trpc/context";
import { Document } from "@/app/Document";
import { Layout } from "@/app/Layout";
import { Home } from "@/app/pages/Home";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  // tRPC API handler - matches /api/trpc/*
  route("/api/trpc/*", ({ request }) => {
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req: request,
      router: appRouter,
      createContext: () => createContext(request),
    });
  }),
  render(Document, [layout(Layout, [route("/", Home)])], {
    ssr: true,
  }),
]);
