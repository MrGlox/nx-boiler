import { Module, OnModuleInit } from "@nestjs/common";
import { AuthModule as BetterAuthModule } from "better-auth/nestjs";

import { MailerModule } from "../mailer/mailer.module";
import { MailerService } from "../mailer/mailer.service";

import { auth, setMailerService } from "./config/better-auth.config";

// import { AuthService } from "./auth.service";
// import { AuthController } from "./auth.controller";

// import { DatabaseService } from "../core/database/database.service";

@Module({
  imports: [BetterAuthModule.forRoot(auth), MailerModule],
  // controllers: [AuthController],
  // providers: [AuthService, DatabaseService],
  exports: [BetterAuthModule],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly mailerService: MailerService) {}

  onModuleInit() {
    setMailerService(this.mailerService);
  }
}
