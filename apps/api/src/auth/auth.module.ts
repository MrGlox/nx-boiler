import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@repo/database';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  // imports: [DatabaseModule, ConfigModule],
  // providers: [AuthService],
  // controllers: [AuthController],
  // exports: [AuthService],
})
export class AuthModule {}
