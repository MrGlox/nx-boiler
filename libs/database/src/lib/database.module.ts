import { Module } from '@nestjs/common';

import { DatabaseService } from './prisma.service';

@Module({
  controllers: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
