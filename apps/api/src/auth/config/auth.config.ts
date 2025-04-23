import { betterAuth } from "better-auth";
import { admin, bearer, openAPI } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { ConfigService } from "@nestjs/config";
import { I18nService } from "nestjs-i18n";

import { PrismaClient } from "@repo/database";
import { MailerService } from "../../mailer/mailer.service";
import { AllConfigType } from "../../core/config/config.type";
import { AuthService } from "../auth.service";

const db = new PrismaClient();
const configService = new ConfigService<AllConfigType>();
const i18nService = new I18nService();
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
    sendResetPassword: async ({ user, url, token }, request) => {
      if (!mailerService) {
        throw new Error("MailerService not initialized");
      }
      await mailerService.sendMail({
        to: user.email,
        template: "forgot-password",
        data: {
          url,
          formattedDate: new Date().toLocaleString(),
        },
      });
    },
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
    admin({
      // defaultRole: "regular",
      adminRoles: ["admin", "super-admin"],
    }),
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
