import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';

// import { render } from '@react-email/render';
import { createTransport, type Transporter } from 'nodemailer';

// import { kebabize } from '@repo/shared/utils';

import type { I18nService } from 'nestjs-i18n';
// import { type TemplateType, Templates } from './templates';

interface SendMailConfiguration {
  from?: string;
  template: string;
  to: string;
  lang?: string;
  text?: string;
  data?: Record<string, unknown>;
}

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;

  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {
    this.transporter = createTransport({
      host: configService.get<string>('mailer.host'),
      port: configService.get<number>('mailer.port'),
      ignoreTLS: configService.get<boolean>('mailer.ignoreTLS'),
      secure: configService.get<boolean>('mailer.secure'),
      requireTLS: configService.get<boolean>('mailer.requireTLS'),
      auth: {
        user: configService.get<string>('mailer.user'),
        pass: configService.get<string>('mailer.password'),
      },
    });
  }

  // async generateEmail(template: TemplateType, data: Record<string, unknown>) {
  //   return await render(
  //     Templates[kebabize(`${template}`) as keyof typeof Templates](data),
  //   );
  // }

  async sendMail({ from, to,
    // template,
    data, lang }: SendMailConfiguration) {
    // const translations: { subject: string; [key: string]: unknown } =
    //   await this.i18n.translate(template, {
    //     lang: lang || 'en',
    //     args: data,
    //   });

    // const html = await this.generateEmail(template, {
    //   ...(typeof translations === 'object' ? translations : {}),
    //   ...data,
    // });

    await this.transporter.sendMail({
      to: to,
      from: from
        ? from
        : `"${this.configService.get('mailer.defaultName', {
            infer: true,
          })}" <${this.configService.get('mailer.defaultEmail', {
            infer: true,
          })}>`,
      // subject: translations?.subject,
      // html,
    });
  }
}
