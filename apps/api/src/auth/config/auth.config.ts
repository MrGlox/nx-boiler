import { PrismaClient } from "@repo/database";
import { BetterAuthOptions } from "better-auth";
import { bearer, openAPI } from "better-auth/plugins";

export const createAuthConfig = (
  prisma: PrismaClient,
  env: NodeJS.ProcessEnv,
): BetterAuthOptions => {
  return {
    basePath: "/auth",
    plugins: [
      openAPI({
        path: "/docs",
        apiPrefix: env.API_PREFIX || "api",
      }),
      bearer(),
    ],
    database: {
      type: "prisma",
      prisma,
      provider: "postgresql",
    },
    advanced: {
      useSecureCookies: env.NODE_ENV === "production",
      cookiePrefix: "session",
    },
    trustedOrigins: env.ORIGIN?.split(",") || [],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
  };
};
