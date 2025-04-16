import { HttpAdapterHost } from "@nestjs/core";

import {
  Global,
  Logger,
  Module,
  RequestMethod,
  type MiddlewareConsumer,
  type NestModule,
} from "@nestjs/common";

import { toNodeHandler } from "better-auth/node";
import { DatabaseService } from "@repo/database";

import { BetterAuthService } from "./better-auth.service";
import { BetterAuthModule } from "./better-auth.module";
import { createBodyParsingAuthMiddleware } from "./middleware/body-parse.middleware";
import { AuthController } from "./auth.controller";
import { AuthApiController } from "./controllers/auth-api.controller";

@Global()
@Module({
  imports: [
    BetterAuthModule.forRoot({
      prisma: new DatabaseService(),
    }),
  ],
  controllers: [AuthController, AuthApiController],
  providers: [BetterAuthService],
  exports: [BetterAuthService],
})
export class AuthModule implements NestModule {
  private logger = new Logger(AuthModule.name);

  constructor(
    private readonly adapterHost: HttpAdapterHost,
    private readonly authService: BetterAuthService,
  ) {}

  /**
   * Custom middleware to ignore "body-parse" for auth endpoint only.
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    const config = this.authService.getConfig();
    const auth = this.authService.getAuth();

    /**
     * Add support for Better-Auth by ignoring "parse"
     */
    consumer
      .apply(createBodyParsingAuthMiddleware(config.basePath))
      .forRoutes("*");

    console.log("config.basePath", config.basePath);

    /**
     * Create routers
     */
    consumer.apply(toNodeHandler(auth)).forRoutes({
      path: `${config.basePath}/*`,
      method: RequestMethod.ALL,
    });
  }
}
