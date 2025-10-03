export async function createContext(request: Request) {
  // You can add authentication, session handling, etc. here
  return {
    request,
    // Add any other context you need (e.g., session, user, db)
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
