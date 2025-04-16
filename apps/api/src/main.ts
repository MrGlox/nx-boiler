import { join } from "node:path";

import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// import { urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
// import session from "express-session";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

// import { RedisStore } from "connect-redis";
// import Redis from "ioredis";

import { AppModule } from "./app/app.module";
import { HttpExceptionFilter } from "./core/exception.filter";

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

  app.setGlobalPrefix(
    globalPrefix,
    //   //   {
    //   //   exclude: ["health", "docs"],
    //   // }
  );

  // // Initialize client
  // const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  // const redisClient = new Redis(redisUrl, {});

  // // Initialize store
  // const redisStore = new RedisStore({
  //   client: redisClient,
  //   ttl: 86400 * 30,
  // });

  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("The API description")
    .setVersion("0.0.1")
    // .addBearerAuth(
    //   {
    //     type: "http",
    //     scheme: "bearer",
    //     bearerFormat: "JWT",
    //     name: "Authorization",
    //     description: "Enter JWT token",
    //     in: "header",
    //   },
    //   "access-token",
    // )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  // app.set("trust proxy", 1);

  // app.useStaticAssets(join(__dirname, "..", "public"), {
  //   prefix: "/public/",
  // });

  // app.useGlobalFilters(new HttpExceptionFilter());

  // app.use(cookieParser());

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  // Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
