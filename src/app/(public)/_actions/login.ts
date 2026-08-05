"use server";

import { signIn } from "@/lib/auth";

export async function loginWithGitHub(provider: string) {
  await signIn(provider, { redirectTo: "/dashboard" });
}
