import { Module, OnModuleInit } from "@nestjs/common";
import { AuthModule as BetterAuthModule } from "better-auth/nestjs";
import { MailerModule } from "../mailer/mailer.module";
import { MailerService } from "../mailer/mailer.service";

import { auth, setMailerService } from "./config/better-auth.config";

@Module({
  imports: [BetterAuthModule.forRoot(auth), MailerModule],
  exports: [BetterAuthModule],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly mailerService: MailerService) {}

  onModuleInit() {
    setMailerService(this.mailerService);
  }
}
