import path, { join } from 'node:path';

import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from '@repo/database';
// import { MailerModule } from '@repo/shared/mailer';

import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

// import googleConfig from '../auth/google/config/google.config';
import appConfig from '../core/config/app.config';
import stripeConfig from '../payment/config/stripe.config';

import { EventModule } from '../core/event/event.module';
import { SchedulerModule } from '../core/scheduler/scheduler.module';

import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';
import { WebhookController } from '../payment/events/webhook.controller';
import { WebhookService } from '../payment/events/webhook.service';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, stripeConfig],
      envFilePath: path.resolve(__dirname, '../../../.env'),
    }),
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage'),
        loaderOptions: {
          path: join(__dirname, '/core/locales/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    DatabaseModule,
    AuthModule,
    EventModule,
    NotificationModule,
    PaymentModule,
    // MailerModule,
    SchedulerModule,
  ],
  controllers: [WebhookController],
  providers: [Logger, WebhookService],
})
export class AppModule {}
