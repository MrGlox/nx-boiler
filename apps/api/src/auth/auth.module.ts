import { Module } from "@nestjs/common";
import { AuthModule as BetterAuthModule } from "better-auth/nestjs";

import { auth } from "./config/auth.config";

@Module({
  imports: [BetterAuthModule.forRoot(auth)],
  providers: [],
  exports: [BetterAuthModule],
})
export class AuthModule {}
