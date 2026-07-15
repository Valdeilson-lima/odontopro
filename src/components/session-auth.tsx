"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionAuthprovider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
