import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../../auth/auth.module';
import { DatabaseService } from '@repo/database';

import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [TokenService, DatabaseService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
