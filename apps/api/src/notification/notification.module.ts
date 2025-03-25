import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { DatabaseModule } from '@repo/database';

import { NotificationService } from './notification.service';

@Module({
  imports: [ConfigModule, DatabaseModule, EventEmitterModule.forRoot()],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
