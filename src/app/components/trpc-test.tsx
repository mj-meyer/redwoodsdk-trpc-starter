"use client";

import { useTRPC } from "@/utils/trpc-provider";
import { useQuery } from "@tanstack/react-query";

export function TRPCTest() {
  const trpc = useTRPC();
  const healthQuery = useQuery(trpc.healthCheck.queryOptions());
  const greetingQuery = useQuery(trpc.greeting.queryOptions({ name: "RWSDK" }));

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <div style={{ marginTop: "2rem" }}>
        <h2>Health Check</h2>
        {healthQuery.isLoading && <p>Loading...</p>}
        {healthQuery.error && <p>Error: {healthQuery.error.message}</p>}
        {healthQuery.data && <p>Status: {healthQuery.data}</p>}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Greeting</h2>
        {greetingQuery.isLoading && <p>Loading...</p>}
        {greetingQuery.error && <p>Error: {greetingQuery.error.message}</p>}
        {greetingQuery.data && <p>{greetingQuery.data}</p>}
      </div>
    </div>
  );
}
