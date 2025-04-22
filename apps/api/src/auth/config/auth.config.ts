import { betterAuth } from "better-auth";
import { bearer, openAPI } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { PrismaClient } from "@repo/database";

const db = new PrismaClient();

export const auth = betterAuth({
  baseURL: `${process.env["APP_DOMAIN"]}/api/auth`,
  trustedOrigins: [
    process.env["APP_DOMAIN"] || "http://localhost:3000",
    process.env["API_DOMAIN"] || "http://localhost:4200",
  ],
  cors: {
    origin: true, // This will allow all origins in development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  },
  advanced: {
    cookies: {
      session_token: {
        name: "auth_session",
      },
    },
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    emailVerified: false,
    requireEmailVerification: true,
    // async onBeforeCreateUser(data) {
    //   // Ensure required fields are set
    //   return {
    //     ...data,
    //     password: data.password || "", // Ensure password is never undefined
    //     name: data.name || data.email.split("@")[0], // Use email username as name if not provided
    //   };
    // },
  },
  socialProviders: {
    google: {
      clientId: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },
  plugins: [
    bearer(),
    openAPI({
      enabled: true,
      path: "/api/auth/openapi.json",
    }),
  ],
  user: {
    modelName: "User",
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false, // don't allow user to set role
      },
      lang: {
        type: "string",
        required: false,
        defaultValue: "en",
      },
    },
  },
  account: {
    modelName: "Account",
  },
  session: {
    modelName: "Session",
  },
});
