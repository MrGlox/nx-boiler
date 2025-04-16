import { Injectable } from "@nestjs/common";

import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, openAPI } from "better-auth/plugins";

import { PrismaClient } from "@repo/database";

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  public readonly config: BetterAuthOptions;
  public readonly auth: ReturnType<typeof betterAuth>;

  constructor() {
    this.config = {
      basePath: "/auth",
      plugins: [openAPI({ path: "/docs" }), bearer()],
      database: prismaAdapter(prisma, {
        provider: "postgresql",
      }),
      advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
        cookiePrefix: "session",
      },
      trustedOrigins: process.env.ORIGIN?.split(",") || [],
      emailAndPassword: { enabled: true, autoSignIn: true },
    };

    this.auth = betterAuth(this.config);
  }
}
