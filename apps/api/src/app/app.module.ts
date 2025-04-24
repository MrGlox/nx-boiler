import { join } from "node:path";

import { Logger, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "better-auth/nestjs";
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from "nestjs-i18n";

import { DatabaseModule } from "@repo/database";

import appConfig from "../app/config/app.config";
import mailerConfig from "../mailer/config/mailer.config";

import { EventModule } from "../core/event/event.module";
import { SchedulerModule } from "../core/scheduler/scheduler.module";

import { AuthModule } from "../auth/auth.module";
import { NotificationModule } from "../notification/notification.module";
import { MailerModule } from "../mailer/mailer.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mailerConfig],
    }),
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const fallbackLanguage = configService.get(
          "app.fallbackLanguage",
          "en",
        );
        return {
          fallbackLanguage,
          loaderOptions: {
            path: join(__dirname, "/core/locales/"),
            watch: true,
          },
        };
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
        new HeaderResolver(["x-lang"]),
      ],
    }),
    DatabaseModule,
    AuthModule,
    EventModule,
    MailerModule,
    NotificationModule,
    SchedulerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Logger,
  ],
})
export class AppModule {}
