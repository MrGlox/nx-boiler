import { reactStartCookies } from "better-auth/react-start";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";

import { PrismaClient } from "@repo/database";

const prisma = new PrismaClient();
export const auth = betterAuth({
  baseURL: process.env["APP_DOMAIN"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string,
    },
  },
  plugins: [reactStartCookies()],
});
