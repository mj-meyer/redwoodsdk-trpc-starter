import { getQueryClient, trpc } from "@/utils/trpc-server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { TRPCTest } from "../components/trpc-test";

export async function Home() {
  const queryClient = getQueryClient();

  // Server-side prefetching - data available immediately on first render
  await queryClient.prefetchQuery(trpc.healthCheck.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
        <h1>tRPC + RWSDK Demo</h1>

        <TRPCTest />
      </div>
    </HydrationBoundary>
  );
}
