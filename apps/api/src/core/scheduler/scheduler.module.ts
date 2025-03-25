import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from '@repo/database';

import { PaymentModule } from '../../payment/payment.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule, PaymentModule],
  providers: [Logger,  SchedulerService],
})
export class SchedulerModule {}
