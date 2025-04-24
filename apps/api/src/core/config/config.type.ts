import type { AppConfig } from "../../app/config/app-config.type";
import type { MailerConfig } from "../../mailer/config/mailer-config.type";

// import type { StripeConfig } from '../../payment/config/stripe-config.type';

export type AllConfigType = {
  app: AppConfig;
  mailer: MailerConfig;
  // stripe: StripeConfig;
};
