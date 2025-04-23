import { Injectable } from "@nestjs/common";
import { MailerService } from "../mailer/mailer.service";

@Injectable()
export class AuthService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      template: "forgot-password",
      data: {
        url,
        formattedDate: new Date().toLocaleString(),
      },
    });
  }
}
