import type { Nullable } from "@tanstack/react-form";
import { getWebRequest } from "@tanstack/react-start/server";
import { createAuthClient } from "better-auth/react";
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

export type User = z.infer<typeof userSchema>;

// Create the auth client
export const { signIn, signUp, useSession, resetPassword } = createAuthClient({
  baseURL: import.meta.env["VITE_API_URL"] || "http://localhost:4200",
  user: {
    additionalFields: {
      name: false,
    },
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

export function sessionToken(): string | null | undefined {
  // Check if we're in a server context
  if (typeof window === "undefined") {
    try {
      const request = getWebRequest();

      if (request) {
        const cookies = request.headers.get("cookie") || "";
        const cookieMatch = cookies.match(/auth_session=([^;]+)/);
        return cookieMatch ? cookieMatch[1] : null;
      }
    } catch (error) {
      console.error("Error getting session token from server request:", error);
    }

    return null;
  }

  // Client-side implementation
  const cookies = document.cookie.split(";");
  const sessionCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("auth_session="),
  );
  return sessionCookie?.split("=")[1].trim() ?? null;
}

export function getSessionToken(request?: Request): string | null {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const sessionCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth_session="),
    );
    return sessionCookie?.split("=")[1].trim() ?? null;
  }

  return null;
}
