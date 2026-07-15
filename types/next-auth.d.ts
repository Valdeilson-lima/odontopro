import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: string | null | boolean;
  image?: string;
  stripe_customer_id?: string;
  times: { id: string; time: string }[];
  address?: string;
  phone?: string;
  status: boolean;
  timeZone?: string | null;
  created_at: string;
  updated_at: string;
}
