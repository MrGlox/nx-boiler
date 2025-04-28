import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";

import { createAuthClient } from "better-auth/react";
import type { Session, User } from "better-auth/types";
import { z } from "zod";

// import { MeDto } from "@repo/dto";

// Define the user schema based on your database model
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  role: z.enum(["USER", "ADMIN"]),
  lang: z.string(),
  active: z.boolean(),
  emailVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// export type User = z.infer<typeof userSchema>;

// Create the auth client
export const {
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
  useSession,
  verifyEmail,
  signOut,
  getSession: getBetterAuthSession,
} = createAuthClient({
  baseURL: import.meta.env["VITE_API_URL"] || "http://localhost:4200",
  user: {
    additionalFields: {
      name: false,
    },
  },
  emailVerification: {
    enabled: true,
    redirect: "/signin",
  },
});

// Function to get the current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch(
      `${import.meta.env["VITE_API_URL"]}/api/auth/me`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return userSchema.parse(data);
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

// Function to check if user is authenticated
export function isAuthenticated(): boolean {
  const session = useSession();
  return session?.data !== null;
}

export const getSession = createServerFn().handler(
  async (): Promise<{
    session: Session | null;
    user: User | null;
    error: any;
  } | null> => {
    const headers = getHeaders();

    if (!headers) {
      return null;
    }

    const { data, error } = await getBetterAuthSession({
      fetchOptions: { headers: headers as HeadersInit },
    });

    return {
      session: data?.session as Session | null,
      user: data?.user as User | null,
      error,
    };
  },
);
