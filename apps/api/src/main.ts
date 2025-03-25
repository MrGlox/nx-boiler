import { join } from 'node:path';

import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { WinstonModule } from 'nest-winston';
import passport from 'passport';
import * as winston from 'winston';

import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './core/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return process.env.NODE_ENV === 'production'
                ? `${timestamp} [${level}]: ${message}`
                : `[${level}]: ${message}`;
            }),
          ),
        }),
      ],
    }),
    rawBody: true,
    bodyParser: true,
  });

  const configService = app.get(ConfigService);

  // Use configService with fallback values
  const globalPrefix = configService.get('API_GLOBAL_PREFIX', 'api');
  const port = configService.get('API_PORT', 4200);

  app.setGlobalPrefix(globalPrefix);

  // Initialize client
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  const redisClient = new Redis(redisUrl, {});

  // Initialize store
  const redisStore = new RedisStore({
    client: redisClient,
    ttl: 86400 * 30,
  });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.set('trust proxy', 1);

  app.use(
    session({
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: process.env.SESSION_SECRET || '123',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  // app.useStaticAssets(getPublicDir(), {
  //   immutable: true,
  //   maxAge: '1y',
  //   index: false,
  // });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());

  app.use('/admin', urlencoded({ extended: true }));

  app.use('/auth', urlencoded({ extended: true }));
  app.use('/auth/logout', urlencoded({ extended: true }));

  app.use('/auth/google', urlencoded({ extended: true }));
  app.use('/auth/google/callback', urlencoded({ extended: true }));

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
