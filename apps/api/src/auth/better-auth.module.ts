import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, openAPI } from "better-auth/plugins";

import { PrismaClient } from "@repo/database";

import { createAuthConfig } from "./config/auth.config";

export interface BetterAuthModuleOptions {
  prisma: PrismaClient;
}

@Global()
@Module({})
export class BetterAuthModule {
  static forRoot(options: BetterAuthModuleOptions): DynamicModule {
    const authConfigProvider: Provider = {
      provide: "AUTH_CONFIG",
      useFactory: () => {
        return createAuthConfig(options.prisma, process.env);
      },
    };

    const authProvider: Provider = {
      provide: "BETTER_AUTH",
      useFactory: (config: ReturnType<typeof createAuthConfig>) => {
        return betterAuth({
          ...config,
          database: prismaAdapter(options.prisma, {
            provider: "postgresql",
          }),
          plugins: [
            openAPI({
              path: "/docs",
              apiPrefix: process.env.API_PREFIX || "api",
              generateRoutes: true, // Enable route generation for OpenAPI
            }),
            bearer(),
          ],
        });
      },
      inject: ["AUTH_CONFIG"],
    };

    return {
      module: BetterAuthModule,
      providers: [authConfigProvider, authProvider],
      exports: ["AUTH_CONFIG", "BETTER_AUTH"],
    };
  }
}
