import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseService } from '@repo/database';
import { TokenModule } from '../token/token.module';

import { EventController } from './event.controller';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    // Custom modules
    TokenModule,
  ],
  providers: [DatabaseService],
  controllers: [EventController],
  exports: [],
})
export class EventModule {}
