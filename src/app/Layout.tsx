"use client";
import { TRPCReactProvider } from "@/utils/trpc-provider";
import type { LayoutProps } from "rwsdk/router";

export function Layout({ children }: LayoutProps) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
