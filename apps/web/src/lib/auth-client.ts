import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server */
  baseURL: import.meta.env["VITE_API_URL"] || "http://localhost:4200",
  /** The path prefix for auth endpoints */
  // basePath: "/api/auth",
  /** Configure CORS */
  // credentials: "include",
  /** Configure headers */
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
