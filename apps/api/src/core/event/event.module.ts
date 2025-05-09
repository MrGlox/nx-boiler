import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DatabaseService } from "../database/database.service";

import { EventController } from "./event.controller";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [DatabaseService],
  controllers: [EventController],
  exports: [],
})
export class EventModule {}
