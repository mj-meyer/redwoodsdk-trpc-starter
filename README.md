# RWSDK + tRPC Starter

A minimal starter template for building type-safe, full-stack applications with [RedwoodSDK](https://docs.rwsdk.com) and [tRPC](https://trpc.io), deployed on Cloudflare Workers.

## Features

- ⚡️ **Full-stack TypeScript** - End-to-end type safety from server to client
- 🚀 **Server-Side Rendering** - Fast initial page loads with React Server Components
- 🔄 **Data Hydration** - Server-prefetched data seamlessly hydrated on the client
- 🎯 **tRPC Integration** - Type-safe API calls with zero code generation
- 🛠️ **TanStack Query** - Powerful data fetching with built-in caching and devtools
- ☁️ **Cloudflare Workers** - Edge deployment with global distribution

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to see your app.

**Try it out**: The demo page shows two queries:

- **Health Check** - Prefetched on the server (instant, no loading state)
- **Greeting** - Fetched on the client (shows loading state on refresh)

View the page source to see the health check data embedded in the HTML!

### Build

```bash
pnpm build
```

### Deploy to Cloudflare

```bash
pnpm release
```

## Project Structure

```
src/
├── server/
│   ├── trpc/
│   │   ├── context.ts      # Request context (auth, db, etc.)
│   │   └── trpc.ts         # tRPC initialization
│   └── routers/
│       └── index.ts        # API routes & procedures
├── utils/
│   ├── trpc-provider.tsx   # Client-side tRPC provider
│   └── trpc-server.ts      # Server-side utilities
├── app/
│   ├── Layout.tsx          # App layout with tRPC provider
│   ├── Document.tsx        # HTML document shell
│   ├── pages/              # Server components (pages)
│   └── components/         # Client components
├── worker.tsx              # App routes & API handlers
└── client.tsx              # Client initialization
```

## How It Works

### Server Components (SSR)

Pages are server components that can prefetch data:

```typescript
// src/app/pages/Home.tsx
export async function Home() {
  const queryClient = getQueryClient();

  // Prefetch on the server
  await queryClient.prefetchQuery(trpc.healthCheck.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <YourClientComponent />
    </HydrationBoundary>
  );
}
```

### Client Components (Interactive)

Client components use tRPC queries:

```typescript
// src/app/components/example.tsx
"use client";

export function Example() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.greeting.queryOptions({ name: "World" }));

  return <div>{data}</div>;
}
```

### Adding API Routes

Define type-safe procedures in your router:

```typescript
// src/server/routers/index.ts
export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => `Hello, ${input.name}!`),
});
```

That's it! The types flow automatically to the client.

## Documentation

- [Full Implementation Guide](./TRPC_IMPLEMENTATION.md) - Detailed documentation on the tRPC setup
- [RWSDK Docs](https://docs.rwsdk.com) - Learn more about RedwoodSDK
- [tRPC Docs](https://trpc.io) - tRPC documentation

## License

MIT
