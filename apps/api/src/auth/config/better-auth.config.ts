import { betterAuth } from "better-auth";
import { admin, bearer, openAPI } from "better-auth/plugins";
// import redisStorage from "better-auth/storage";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { PrismaClient } from "@repo/database";
import { MailerService } from "../../mailer/mailer.service";

const db = new PrismaClient();
// const configService = new ConfigService<AllConfigType>();
// const i18nService = new I18nService();
let mailerService: MailerService;

export const setMailerService = (service: MailerService) => {
  mailerService = service;
};

export const auth = betterAuth({
  baseURL: `${process.env["APP_DOMAIN"]}/api/auth`,
  trustedOrigins: [
    process.env["APP_DOMAIN"] || "http://localhost:3000",
    process.env["API_DOMAIN"] || "http://localhost:4200",
  ],
  cors: {
    credentials: true,
    origin: process.env["NODE_ENV"] !== "production", // This will allow all origins in development
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  },
  // secondaryStorage: redisStorage({
  //   url: process.env["REDIS_URL"] || "redis://localhost:6379",
  // }),
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
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, token }) => {
      if (!mailerService) {
        throw new Error("MailerService not initialized");
      }

      await mailerService.sendMail({
        to: user.email,
        template: "forgot-password",
        data: {
          url: `${process.env["APP_DOMAIN"]}/change-password?token=${token}`,
          formattedDate: new Date().toLocaleString(),
        },
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, token }) => {
      if (!mailerService) {
        throw new Error("MailerService not initialized");
      }

      console.log("sendVerificationEmail");

      await mailerService.sendMail({
        to: user.email,
        template: "confirm-email",
        data: {
          url: `${process.env["APP_DOMAIN"]}/confirm-email?token=${token}`,
          formattedDate: new Date().toLocaleString(),
        },
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
  },
  socialProviders: {
    google: {
      clientId: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      // mapProfileToAccount: (profile) => {
      //   return {
      //     provider: "google",
      //     providerAccountId: profile.sub,
      //     accessToken: profile.access_token,
      //     refreshToken: profile.refresh_token,
      //   };
      // },
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },
  plugins: [
    admin({
      // defaultRole: "regular",
      adminRoles: ["ADMIN", "SUPER_ADMIN"],
    }),
    bearer(),
    openAPI(),
  ],
  user: {
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
});
