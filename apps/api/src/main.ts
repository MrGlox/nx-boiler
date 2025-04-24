import { join } from "node:path";

import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { urlencoded, json } from "body-parser";
import cookieParser from "cookie-parser";
// import session from "express-session";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

// import { RedisStore } from "connect-redis";
// import Redis from "ioredis";

import { AppModule } from "./app/app.module";
import { auth } from "./auth/config/better-auth.config";
import { setupApiDocumentation } from "./core/open-api";
// import { HttpExceptionFilter } from "./core/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return process.env.NODE_ENV === "production"
                ? `${timestamp} [${level}]: ${message}`
                : `[${level}]: ${message}`;
            }),
          ),
        }),
      ],
    }),
    bodyParser: false,
  });

  const configService = app.get(ConfigService);

  // Use configService with fallback values
  const globalPrefix = configService.get("API_GLOBAL_PREFIX", "api");
  const port = configService.get("API_PORT", 4200);

  app.setGlobalPrefix(globalPrefix);

  // Enable CORS with environment variables
  app.enableCors({
    origin: [
      process.env.APP_DOMAIN || "http://localhost:3000",
      process.env.API_DOMAIN || "http://localhost:4200",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "X-Requested-With",
      "Accept",
    ],
  });

  // Set up body parsing middleware for non-auth routes
  app.use((req, res, next) => {
    // Skip body parsing for auth routes
    if (req.path.startsWith(`/${globalPrefix}/auth/`)) {
      return next();
    }

    // For all other routes, apply body parsing
    json()(req, res, (err) => {
      if (err) return next(err);
      urlencoded({ extended: true })(req, res, next);
    });
  });

  app.use(cookieParser());

  // // Initialize client
  // const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  // const redisClient = new Redis(redisUrl, {});

  // // Initialize store
  // const redisStore = new RedisStore({
  //   client: redisClient,
  //   ttl: 86400 * 30,
  // });

  // Set up API documentation
  await setupApiDocumentation(app, auth, globalPrefix);

  app.set("trust proxy", 1);

  app.useStaticAssets(join(__dirname, "..", "public"), {
    prefix: "/public/",
  });

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(
    `📚 API Documentation available at: http://localhost:${port}/docs`,
  );
}
bootstrap();
